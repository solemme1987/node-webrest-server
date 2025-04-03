import fs from 'fs';
import  http2 from 'http2';

const server = http2.createSecureServer({
  key:  fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

  console.log(req.url);

 
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write('<h1>Hola Mund</h1>');
  // res.end();

  // const data = {name: 'Ricardo', age: 38, country: 'Colombia', city: 'Cali'};
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(data));
     
  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlFile);
    return;
  }
  
  // Validamos y permitimso los archivos con extencion .css y .js
  if (req.url?.endsWith('.js')) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
  }else if (req.url?.endsWith('.css')) {
    res.writeHead(200, {'Content-Type': 'text/css'});
  }
  
  // SI uno de los archivos no existe, se lanza un error y se captura en el catch
  // y se envia un 404, en este caso el error es lanzado por el fs.readFileSync
  // y no por el servidor, por lo que no se lanza un error 500
  try {

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent)
  
  } catch (error) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404 Not Found</h1>');
  }


});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
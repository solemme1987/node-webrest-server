import  http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

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
  // Leemos los archivos de la carpeta public .css y .js los servimos
  const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
  res.end(responseContent)

});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
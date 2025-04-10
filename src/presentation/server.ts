import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes:Router;
  public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
       const { port, routes, public_path = 'public'  } = options;
       this.port = port;
       this.publicPath = public_path;
       this.routes = routes;
    }



  

    async start(){


      //* Middlewares
      // Definimos el middleware que nos va a permitir recibir datos en formato json
      // y lo guardamos en el body de la peticion.
      // Esto es necesario para poder recibir datos en formato json en el body de la peticion.
      // Por ejemplo, si hacemos una peticion POST con un body en formato json,
      // este middleware lo va a parsear y lo va a guardar en el body de la peticion.
      this.app.use( express.json() ); //raw

      // Definimos el middleware que nos va a permitir recibir datos en formato urlencoded
      // y lo guardamos en el body de la peticion.
      // Esto es necesario para poder recibir datos en formato urlencoded en el body de la peticion.
      this.app.use( express.urlencoded({ extended: true }) ); //x-www-form-urlencoded
      




      //* Public folder
      //Defubunis cual es el folder de la carpeta publica
      // donde está el index de nuestra app.
      this.app.use(express.static(this.publicPath));


      //* Routes
      this.app.use(this.routes);

      //* SPA
      //En  los archivos que compartio el profesor del compilado de react, tenemos
      // varias rutas que no  estan definidas en las carpeta pero si funcionan,
      // cuando corramos la aplicacion van a funcionar todoas las rutas bien pero
      // su recargamos el navegador nos va a dar un error y no nos mostraá nada en pantalla
      // solo un mensaje de error, para solucionar eso creamos este bloque de codigo 
      // que me va a tomar mi ruta raiz y la va a unir a las otras rutas qeu no estan definidas
      // en por carpetas pero si en codigo, asi cuando recarguemos el navegador no nos de el problema 
      // que mencione antes.
      this.app.get('/{*splat}',  ( req, res) => {
        const indexPath =  path.join( __dirname, `../../${ this.publicPath }/index.html` );
        res.sendFile( indexPath );
      });
   
      
      //Definimos el puerto y lo mostramos en consola
      this.app.listen(this.port, () => {
        console.log( `Server running on port ${ this.port }` );
      });

    }


}



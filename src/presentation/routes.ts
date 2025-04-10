import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Ruta de los todos que vamos a crear luego
    router.use('/api/todos',  TodoRoutes.routes ); 

    return router;
      
  }

}
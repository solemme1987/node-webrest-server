import { Request, Response, RequestHandler } from "express";

// * Cuando usemos la parte que esta comentada abajo 
// * vamos a tener que importar el RequestHandler de express
// ! import {RequestHandler } from "express";


// Por ahora no estamos grabando en bases de datos por eso simulamos la data que debe
// responder cada ruta con este arreglo de todos aqui
const todos = [
  {id: 1, text: 'Buy milk', completedAt: new Date()},
  {id: 2, text: 'Buy bread', completedAt:  null},
  {id: 3, text: 'Buy butter', completedAt: new Date()},
]

export class TodosController {

  //* Inyección de dependencias
  constructor (){}

  
  //OBTENER TODOS LOS "TODOS"
  public getTodos = (req:Request, res:Response) => {
     res.json(todos);
     return;
  }

  //* Esta forma que esta comentada tiene el mismo resultado que la de arriba
  //* solo que esta de abajo se hace para evitar el error que me marca 
  //* el linter en el archivo de rutas de este controlador. lo comenté para seguir
  //* como el profesor lo esta haciendo, pero es mejor utilizar esta forma despues
  //* de estudiarla un poco mas. 

  // public getTodos: RequestHandler = (req, res) => {
  //   res.json(todos);
  // }

  
  //OBTENER TODOS POR ID
  public getTodoById = (req:Request, res:Response) => {
    // ek simbolo + delante de req.params.id lo que hace es convertir el string que viene en la url a un number
    // por eso lo guardamos en una variable id que es de tipo number.
    const id = +req.params.id;

    // Si el id no es un number devolvemos un error 400
    // y un mensaje de error que le decimos que el id tiene que ser un number
    if (isNaN(id)){
      res.status(400).json({error: 'Bad request: ID argument must be a number'});
      return; // en la version actual de Expres ya no se puede hacer el return junto con el res.status(400).json
      // por eso lo separamos en dos lineas.
    } 

    // Buscamos el todo que tenga el id que le pasamos por la url
    // y lo guardamos en una variable todo.
    const todo  = todos.find(todo => todo.id === id); 
    
    if ( todo ) {
      res.json(todo) //Si existe el todo lo devuelve
      return;
    }else {
      // Si no existe el todo devuelve un error 404
      res.status(404).json({ error: `TODO with id ${ id } not found` });
      return;
    }
      
   
     
  }
  
  // CREAR TODO
  public createTodo = (req:Request, res:Response) => {
    const { text } = req.body; // body es el objeto que viene en el body de la peticion

    if ( !text ) { 
      res.sendStatus(400 ).json({ error: 'Bad request: text property  is required' });
      return; // Si no existe el text devuelve un error 400
    }

    const newTodo = {
      id:todos.length + 1,
      text:text,
      completedAt: null
    }
    
    // Agregamos el nuevo todo al arreglo de TODOS que creamos 
    // en la parte superrior de e ste archivo
    todos.push(newTodo)

    res.json(newTodo); // Devuelve el nuevo todo que se acaba de crear

    return;
  }


  //ACTUALIZAR TODO
  public updateTodo = (req:Request, res:Response) => {

    const id = +req.params.id;


    if ( isNaN(id) ){
      res.status(400).json({error: 'Bad request: ID argument must be a number'});
      return; 
    } 

  
    const todo  = todos.find(todo => todo.id === id); 
    
    if ( !todo ) {
      res.status(404).json({ error: `TODO with id ${ id } not found` });
      return;
    }

    const { text, completedAt } = req.body; 
   
    // ! No debemos mutar la informacion, por ahor esto es una referencia
    // ! a la informacion que tenemos en el arreglo de todos, por eso
    // ! no se recomienda hacer esto, pero por ahora lo hacemos para 
    // ! no complicarnos la vida.
    todo.text = text || todo.text; // Si no existe el text lo dejamos como estaba

    (completedAt  === 'null')
    ? todo.completedAt = null // Si el completedAt es null lo dejamos como estaba
    : todo.completedAt = new Date(completedAt || todo.completedAt); // Si no existe el completedAt lo dejamos como estaba
    // Si el completedAt no es null lo convertimos a un objeto de tipo Date

    res.json(todo); 
    
  }

  // ELIMINAR TODO
  public  deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id;

    const todo = todos.find(todo => todo.id === id);

    if ( !todo ) {  
      res.status(404).json({ error: `TODO with id ${ id } not found` });
      return;
    }

    if ( isNaN(id) ){
      res.status(400).json({error: 'Bad request: ID argument must be a number'});
      return; 
    } 

    todos.splice(todos.indexOf(todo), 1); // Elimina el todo del arreglo de todos

   
    res.json({
      message: 'Elemento eliminado con exito',
      data: todo
    });
   

  }


}
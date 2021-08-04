const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/*
[ ] GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
[ ] GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
[ ] POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos*/


const infoApi = async ()=>{
    try{
 let info =  await axios.get('https://api.rawg.io/api/games?key=0377e95fcacd4286ab3a097c4fd9fd2b')
    return console.log (info.data.results)




    } catch (e){

        console.log (e)

    }
   

}
infoApi()
 



module.exports = router;

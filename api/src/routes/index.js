const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");

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

const infoApi1 = async (pg) => {
    if(!pg){
        try {
            let info = await axios.get(
              "https://api.rawg.io/api/games?key=0377e95fcacd4286ab3a097c4fd9fd2b"
            );
            let gamesInfo = await info.data.results.map((e) => {
              return {
                name: e.name,
                id: e.id,
                released: e.released,
                img: e.background_image,
                rating: e.rating,
                generes: e.genres.map((e) => {
                  return {
                    genere: e.name,
                  };
                }),
                platforms: e.platforms.map((e) => {
                  return {
                    platform: e.name,
                  };
                }),
              };
            });
            return gamesInfo;
          } catch (e) {
            console.log(e);
          }

    }else {
        try {
            let info = await axios.get(
                ` https://api.rawg.io/api/games?key=0377e95fcacd4286ab3a097c4fd9fd2b&page=${pg}` 
            );  
            let gamesInfo = await info.data.results.map((e) => {
              return {
                name: e.name,
                id: e.id,
                released: e.released,
                img: e.background_image,
                rating: e.rating, 
                generes: e.genres.map((e) => {
                  return {
                    genere: e.name,
                  };
                }),
                platforms: e.platforms.map((e) => {
                  return {
                    platform: e.name,
                  };
                }),
              };
            });
            return gamesInfo;
          } catch (e) {
            console.log(e);
          }
    }
  
};

const infoDb = async () => {
  try {
    let gamesDb = await Videogame.findAll({
      includes: {
        model: Generes,
        attributes: ["name"],
        through: {
          attibutes: [],
        },
      },
    });
    return gamesDb
  } catch (e) {
    console.log(e);
  }
};



const allInfo = async ()=>{
    let gamesApi1 =  await infoApi1()
    let gamesDb =  await infoDb()
   /* let gamesApi2 =  await infoApi1(2)
    let gamesApi3 =  await infoApi1(3)
    let gamesApi4 =  await infoApi1(4)
    let gamesApi5 =  await infoApi1(5)
    let gamesApi6 =  await infoApi1(6)
    let gamesApi7 =  await infoApi1(7)
    let gamesApi8 =  await infoApi1(8)
    let gamesApi9 =  await infoApi1(9)
    let gamesApi10 =  await infoApi1(10)*/


    let allGames = gamesApi1.concat(gamesDb,/* gamesApi2, gamesApi3, gamesApi4,gamesApi5,gamesApi6, gamesApi7, gamesApi8, gamesApi9, gamesApi10*/)

    return allGames
}
console.log(allInfo())

router.get ('/videogames', async (req, res)=>{
   let  games = await allInfo()
    res.status(200).send(games)
});

router.get ('/videogames', async (req, res)=>{
    let  games = await allInfo()
     res.status(200).send(games)
 });
 





module.exports = router;





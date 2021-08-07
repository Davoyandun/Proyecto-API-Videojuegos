const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genere } = require("../db");

const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let ruta = "videogames";

const infoApi1 = async (pg) => {
  if (!pg) {
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
          description: e.description,
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
  } else {
    try {
      let info = await axios.get(
        ` https://api.rawg.io/api/games?key=0377e95fcacd4286ab3a097c4fd9fd2b&page=${pg}`
      );
      let gamesInfo = await info.data.results.map((e) => {
        return {
          name: e.name,
          id: e.id,
          released: e.released,
          description: e.description,
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
        model: Genere,
        attributes: ["name"],
        through: {
          attibutes: [],
        },
      },
    });
    return gamesDb;
  } catch (e) {
    console.log(e);
  }
};

const allInfo = async () => {
  let gamesApi1 = await infoApi1();
  let gamesDb = await infoDb();
  let gamesApi2 = await infoApi1(2);
  let gamesApi3 = await infoApi1(3);
  let gamesApi4 = await infoApi1(4);
  let gamesApi5 = await infoApi1(5);

  let allGames = gamesApi1.concat(
    gamesDb,
    gamesApi2,
    gamesApi3,
    gamesApi4,
    gamesApi5
  );

  return allGames;
};

router.get("/videogames", async (req, res) => {
  const qName = req.query.name;
  const games = await allInfo();
  if (qName) {
    let namesMatch = await games.filter((e) => {
      return e.name.toLowerCase().includes(qName.toLowerCase());
    });

    if (namesMatch.length) {
      namesMatch = namesMatch.slice(0, 15);

      res.status(200).send(namesMatch);
    } else {
      res.status(400).send("games no found");
    }
  } else {
    res.status(200).send(games);
  }
});

/*
- [ ] __GET /videogame/{idVideogame}__:
  - Obtener el detalle de un videojuego en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  - Incluir los géneros asociados*/

router.get(`/videogames/${idVideogame}`, async (req, res) => {
  const games = await allInfo();
  let gameDetail = await games.filter((e) => {
    if (e.id == idVideogame) return e;

  });
  res.status(200).send(gameDetail)
});

module.exports = router;

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genere, genere_videogame } = require("../db");
const { v4: uuidv4 } = require("uuid");

const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// este es solo un comentario para probar git 


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
  let gamesDb = await infoDb();
  let gamesApi1 = await infoApi1();
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
    const nameGame = await axios.get(
      `https://api.rawg.io/api/games?key=0377e95fcacd4286ab3a097c4fd9fd2b&search=${qName}`
    );

    let namesMatch = await nameGame.data.results.filter((e) => {
      return e.name.toLowerCase().includes(qName.toLowerCase());
    });
    namesMatch = await namesMatch.map((e) => {
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

router.get(`/videogames/:id`, async (req, res) => {
  let id = req.params.id;
  const idGame = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=0377e95fcacd4286ab3a097c4fd9fd2b`
  );
  const detailGame = [
    {
      name: idGame.data.name,
      description: idGame.data.description_raw,
      released: idGame.data.released,
      img: idGame.data.background_image,
      website: idGame.data.website,
      rating: idGame.data.rating,
      platform: idGame.data.platforms.map((e) => {
        return {
          platform: e.platform.name,
        };
      }),
      genres: idGame.data.genres.map((e) => {
        return {
          name: e.name,
        };
      }),
    },
  ];

  res.status(200).send(detailGame);
});

router.get("/genres", async (req, res) => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=0377e95fcacd4286ab3a097c4fd9fd2b`
    );

    const infoGenres = await apiGenres.data.results.map((e) => e.name);
    for (let i = 0; i < infoGenres.length; i++) {
      Genere.findOrCreate({
        where: {
          name: infoGenres[i],
        },
      });
    }
    const getGenres = await Genere.findAll();
    res.status(200).send(getGenres);
  } catch (e) {
    console.log(e);
  }
});

router.post("/videogame", async (req, res) => {
  const { name, genres, released, rating,description, platform, } =
    req.body;

  let newVideoGame = await Videogame.create({
      name: name,
      description: description,
      releaseDate: released,
      rating: rating,
      platform: platform,
      id: uuidv4(),
    
  });
 
  let genreDB = await Genere.findAll({
    where: {
      name: genres,
    },
  });

   await newVideoGame.addGenere(genreDB); 

  const response =  await Videogame.findAll({
  include: Genere
  })
  res.status(200).send(response);
});

module.exports = router;

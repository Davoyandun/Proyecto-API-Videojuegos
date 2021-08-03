const { DataTypes } = require("sequelize");
const axios = require("axios");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,

    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    createDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  });
};

//axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then((e)=>
// console.log(e))

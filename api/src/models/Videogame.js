const { DataTypes } = require('sequelize');
const axios = require('axios')

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const {
  API_KEY
} = process.env;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type : DataTypes.ID,
      
    }
  });
};








axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then((e)=>
  console.log(e)
)
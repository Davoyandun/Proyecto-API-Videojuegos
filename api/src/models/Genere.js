const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const { API_KEY } = process.env;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genere", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
};
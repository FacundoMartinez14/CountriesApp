const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    traduccion:{
      type: DataTypes.STRING, 
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subregion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.INTEGER
    },
    population:{
      type: DataTypes.INTEGER
    }
  },{ timestamps: true, createdAt: "creado", updatedAt: false }
  );
};


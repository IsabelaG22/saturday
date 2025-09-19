// Import connection and sequelize datatypes
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

class Requirement extends Model {}

Requirement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {                //  nombre
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {              //  estado
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    responsible: {         //  responsable
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {          //  fecha
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {                //  tipo
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Requirement", //  Requerimiento
    tableName: "requirements", // nombre de la tabla en inglés (opcional, recomendado)
    timestamps: false,         // porque ya tienes created_at manual
  }
);

export default Requirement;

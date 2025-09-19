// Importamos la coneccion con la base de datos y  zequelize los tipos de datos
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

// Definicion de modelo usuario
class User extends Model { }

User.init({
  id_document: {                // antes: cedula_id
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  first_name: {             // antes: nombre
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {              // antes: apellido
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {                  // se mantiene igual (ya está en inglés)
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {               // se mantiene igual (ya está en inglés)
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {                   // antes: cargo
    type: DataTypes.STRING(50),
    allowNull: true
  }

}, {
  sequelize,
  modelName: 'User',        // antes: Usuario
});

export default User;

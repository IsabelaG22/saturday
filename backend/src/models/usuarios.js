import { Sequelize, Model, DataTypes } from 'sequelize';
// model Crear el modelado de la base de datos
//Datatypes tipos de datos que vamos a utilizar en la base de datos


const sequelize = new Sequelize('saturday', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql', //Tipo de base de datos a la que nos estamos conectando
  port: 3306, //Puerto de conexión a la base de datos
});

//Definimos el modelo de Usuario (tabla)
class Usuario extends Model { }

Usuario.init({
  cedula_id: {
    type: DataTypes.INTEGER, //Tipo de dato entero
    primaryKey: true, //clave primaria
    allowNull: false //No puede ser nulo(vacio)
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  cargo: {
  type: DataTypes.STRING(50),
  allowNull: true
}

  }, {
    sequelize,
    modelName: 'Usuario',
  }
);
export default Usuario;




// async function testConection() {
//   try {
//    await sequelize.authenticate();
//    console.log('Toda la conexion esta bien');
//   }catch (error) {
//     console.log('Error al conectar a la base de datos', error);
//   }
// }
// testConection();

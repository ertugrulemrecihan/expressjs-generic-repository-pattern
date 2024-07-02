import { Sequelize } from 'sequelize';

class DataAccess {
  static sequelizeInstance: Sequelize;

  constructor() {
    DataAccess.connect();
  }

  static connect(): Sequelize {
    if (this.sequelizeInstance) return this.sequelizeInstance;

    this.sequelizeInstance = new Sequelize({
      host: 'localhost',
      username: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
      dialect: 'mysql',
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
      },
      logging: false,
    });

    this.sequelizeInstance
      .authenticate()
      .then(() => {
        console.log('Database connection has been established successfully ✅');
        this.sequelizeInstance.sync();
      })
      .catch((err) => {
        console.error('❌ Unable to connect to the database: ', err);
      });

    return this.sequelizeInstance;
  }
}

const sequelizeInstance = DataAccess.connect();
export { sequelizeInstance };
export default DataAccess;

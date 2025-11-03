import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
  entities: [Group, Student],
  synchronize: false, // отключаем, чтобы не конфликтовать с миграциями
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// const init = async (): Promise<void> => {
//   try {
//     await AppDataSource.initialize();
//   }
//   catch (error) {
//     console.log(error);
//   }
// };

// init();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    // You can now interact with your entities
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;

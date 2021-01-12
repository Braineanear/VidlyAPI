import chalk from 'chalk';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: 'config.env' });

const connectDB = async () => {
  const DB = process.env.DATABASE_CONNECTION.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  mongoose.set('autoIndex', true);

  const con = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true
  });

  console.log(
    chalk.bgGreen.black(`MongoDB Connected: ${con.connection.host}.`)
  );

  mongoose.connection.on('connected', () => {
    console.log(chalk.bgGreen.black('Mongoose connected to db'));
  });

  mongoose.connection.on('error', (err) => {
    console.log(chalk.bgGreen.black(err.message));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(chalk.bgGreen.black('Mongoose connection is disconnected.'));
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;

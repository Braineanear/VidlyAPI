import chalk from 'chalk';
import { config } from 'dotenv';
import cluster from 'cluster';
import os from 'os';
// eslint-disable-next-line import/no-named-as-default-member
import app from './app.js';
import connectDB from './utils/dbConfig.js';

const numCores = os.cpus().length;

// Handle uncaught exceptions
process.on('uncaughtException', (uncaughtExc) => {
  // Won't execute
  console.log(chalk.bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
  console.log('uncaughtException Err::', uncaughtExc);
  console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack));
  process.exit(1);
});

// Setup number of worker processes to share port which will be defined while setting up server
const workers = [];
const setupWorkerProcesses = () => {
  // Read number of cores on system
  console.log(`Master cluster setting up ${numCores} workers`);

  // Iterate on number of cores need to be utilized by an application
  // Current example will utilize all of them
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCores; i++) {
    // Creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork());

    // Receive messages from worker process
    workers[i].on('message', (message) => {
      console.log(message);
    });
  }

  // Process is clustered on a core and process id is assigned
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is listening`);
  });

  // If any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    // Receive messages from worker process
    workers[workers.length - 1].on('message', (message) => {
      console.log(message);
    });
  });
};

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = () => {
  config({ path: 'config.env' });

  // Connect to MongoDB
  connectDB();

  const port = process.env.PORT || 5000;

  const server = app.listen(port, () => {
    console.log(`App running on port ${chalk.greenBright(port)}...`);
  });

  // In case of an error
  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack);
    console.error('on url', appCtx.req.url);
    console.error('with headers', appCtx.req.headers);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.log(chalk.bgRed('UNHANDLED REJECTION! 💥 Shutting down...'));
    console.log(err.name, err.message);
    // Close server & exit process
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log(chalk.bgRed('👋 SIGTERM RECEIVED. Shutting down gracefully'));
    server.close(() => {
      console.log(chalk.bgRed('💥 Process terminated!'));
    });
  });
};

// Setup server either with clustering or without it
const setupServer = (isClusterRequired) => {
  // If it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    // Setup server configurations and share port address for incoming requests
    setUpExpress();
  }
};

setupServer(false);

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

import userRouter from './routes/userRoutes.js';
import genresRouter from './routes/genresRoutes.js';
import customerRouter from './routes/customerRoutes.js';
import movieRouter from './routes/movieRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.enable('trust proxy');

// Set Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Cookie parser
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

//Limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  messege: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/api', limiter);

//Date sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

// Implement CORS
app.use(cors());

app.options('*', cors());

app.use(compression());

app.disable('x-powered-by');

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/genres', genresRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/movies', movieRouter);

// When someone access route that does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handling Global Errors
app.use(globalErrorHandler);

export default app;

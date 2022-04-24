import express from 'express';
import { PORT } from './config/const';
import { errorHandler } from './infrastructure/middleware/error';
import { connectDB } from './infrastructure/dbConnection';
import { createRouter } from './routes';
import { bootstrapServices } from './bootstrap';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runtimeServices = bootstrapServices();
const router = createRouter(runtimeServices);
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

import { connect, disconnect } from 'mongoose';

import { DB_CONNECTION_STRING } from '../config/const';

export const connectDB = async () => {
  try {
    await connect(DB_CONNECTION_STRING)

    console.log('Successfully connected to the DB');
  } catch (error: any) {
    console.log(error.message);
    await disconnect();
    process.exit(1);
  }
};

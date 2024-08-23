import mongoose from 'mongoose';
import config from '../config/config';
import logger from './logger';
async function connect() {
  const dbURL = config.dbURL || '';
  try {
    const connection = await mongoose.connect(dbURL);
    logger.info('Connected to the database');
    return connection;
  } catch (error) {
    logger.error(`Could not connect to the database + ${error}`);
    process.exit(1);
  }
}

export default connect;
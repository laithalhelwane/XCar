import path from 'path';
import fs from 'fs';
const pathToPrivateKey =
  path.join(__dirname, '..', '..', 'id_rsa_priv.pem') ?? '';
const pathToPublicKey =
  path.join(__dirname, '..', '..', 'id_rsa_pub.pem') ?? '';

const config = {
  production: {
    jwt: {
      privateKey: process.env.PRIVATE_KEY as string,
      publicKey: process.env.PUBLIC_KEY as string,
      saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR ?? '10', 10),
    },
    app: {
      port: process.env.PORT || 1337,
    },
    dbURL: process.env.DB_URL,
    hostURL: 'https://grad-proj-car.onrender.com',
    GOOGLE_APPLICATION_CREDENTIALS: '../serviceAccountKey.json'
  },
  development: {
    jwt: {
      privateKey: fs.readFileSync(pathToPrivateKey, 'utf8') || '',
      publicKey: fs.readFileSync(pathToPublicKey, 'utf8') || '',
      saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR ?? '10', 10),
    },
    app: {
      port: 3000,
    },
    dbURL: 'mongodb://127.0.0.1:27017/Cars',
    hostURL: 'http://localhost:3000',
    GOOGLE_APPLICATION_CREDENTIALS: '../serviceAccountKey.json'
  },
};
export default config[process.env.NODE_ENV as 'production' | 'development'] ??
  config['development'];

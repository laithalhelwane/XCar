import jwt from 'jsonwebtoken';
import config from '../config/config';
const {
  jwt: { privateKey },
} = config;
export function signJwt(object: Record<string, unknown>) {
  const expiresIn = '1y';
  const signedToken = jwt.sign(object, privateKey, {
    expiresIn,
    algorithm: 'RS256',
  });
  return {
    token: signedToken,
    expiresIn,
  };
}

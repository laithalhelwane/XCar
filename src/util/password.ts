// Import the configuration object and the bcrypt library
import config from '../config/config';
import bcrypt from 'bcryptjs';

// Destructure the saltWorkFactor value from the jwt property of the config object
const {
  jwt: { saltWorkFactor },
} = config;

// Define an async function called hash that takes a password string as an argument and returns a Promise that resolves to a string
export async function hash(password: string): Promise<string> {
  // Generate a salt with the specified work factor using the genSalt function from the bcrypt library
  const salt = await bcrypt.genSalt(saltWorkFactor);
  // Hash the password with the generated salt using the hash function from the bcrypt library
  const hash = await bcrypt.hash(password, salt);
  // Return the resulting hash as the resolved value of the Promise
  return hash;
}

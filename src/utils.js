//?ruta del directorio donde actual
import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

//?Importacion encriptacion
import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.compareSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (passwaord, user) => bcrypt.compareSync(passwaord,user.password);

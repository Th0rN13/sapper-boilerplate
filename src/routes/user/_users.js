import { databaseType } from 'helpers/config.js';

import * as facadeFile from '_facades/file.js';
let confirmEmail, registerUser, findProfile, findLogin;

switch (databaseType.toLowerCase()) {
  case 'file':
    console.log('Use file database');
    ({confirmEmail, registerUser, findProfile, findLogin} = facadeFile);
    break;
  case 'mysql':
    console.log('Use MySQL database');
    ({confirmEmail, registerUser, findProfile, findLogin} = facadeMysql);
    break;
  case 'pssql':
    console.log('Use PostgreSQL database');
    ({confirmEmail, registerUser, findProfile, findLogin} = facadePssql);
    break;
  default:
    console.log('No database defined, setup .env file, look .env-example');
    process.exit();
}

export {
  confirmEmail,
  registerUser,
  findProfile,
  findLogin
}

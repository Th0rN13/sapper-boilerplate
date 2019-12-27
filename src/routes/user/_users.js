import { databaseType } from 'helpers/config.js';

import * as facadeFile from '_facades/file.js';
let selectedDb;
let confirmEmail, registerUser, findProfile, tryLogin;

switch (databaseType.toLowerCase()) {
  case 'file':
    console.log('Use file database');
    selectedDb = facadeFile;
    break;
  case 'mysql':
    console.log('Use MySQL database');
    ({confirmEmail, registerUser, findProfile, tryLogin} = facadeMysql);
    break;
  case 'pssql':
    console.log('Use PostgreSQL database');
    ({confirmEmail, registerUser, findProfile, tryLogin} = facadePssql);
    break;
  default:
    console.log('No database defined, setup .env file, look .env-example');
    process.exit();
}

({confirmEmail, registerUser, findProfile, tryLogin} = selectedDb);

export {
  confirmEmail,
  registerUser,
  findProfile,
  tryLogin
}

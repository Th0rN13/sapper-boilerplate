import { databaseType } from 'helpers/config.js';

import * as facadeFile from '_facades/file.js';
let selectedDb;

const databaseFacades = {
  file: {
    facade: facadeFile,
    description: 'Use file database',
  },
  mysql: {
    facade: null,
    description: 'Use MySQL database',
  },
  pssql: {
    facade: null,
    description: 'Use PostgreSQL database',
  },
}

const selectedFacade = databaseFacades[databaseType.toLowerCase()];
console.log(selectedFacade.description);
selectedDb = selectedFacade.facade;

export const {
  tryLogin,
  findProfile,
  registerUser,
  confirmEmail,
  resetPassword,
  createResetHash,
} = selectedDb;

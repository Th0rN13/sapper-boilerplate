import { databaseType } from 'helpers/config.js';

import * as facadeFile from './facades/file.js';
let selectedDb;

const databaseFacades = {
  file: {
    facade: facadeFile,
    description: 'Use file JSON database',
  },
  mysql: {
    facade: null,
    description: 'Use MySQL database',
  },
  mongo: {
    facade: null,
    description: 'Use MongoDB',
  },
  sqlite: {
    facade: null,
    description: 'Use SQLite database',
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
  loadProfile,
  registerUser,
  confirmEmail,
  changePassword,
  createResetHash,
} = selectedDb;

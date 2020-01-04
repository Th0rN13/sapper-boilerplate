import fs from 'fs';
import crypto from 'crypto';
import uuid from 'uuid/v4';
import { send } from './email.js';

const usersDbFile = process.cwd() + '\\.userdb\\user.json';
const emailsDbFile = process.cwd() + '\\.userdb\\email.json';
const passwordsDbFile = process.cwd() + '\\.userdb\\password.json';

const emptyUser = {
  id: -1,
  is_active: true,
  name: '',
  login: '',
  password: '',
  email: '',
  email_verified: false,
  created_time: Date.now(),
  last_login_time: Date.now(),
  avatar: '',
}

function generateHash (password) {
  // TODO: add some salt, change hash function?
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

function tryLogin (login, password) {
  const users = loadJSON(usersDbFile);
  const userFind = users.find((user) => (user.login === login));
  const hashPassword = generateHash(password);
  const ok = (userFind && userFind.password === hashPassword);
  const message = ok ? '' : userFind ? 'Password error' : 'Login error';
  const user_id = ok ? userFind.id : -1;
  const result = {
    ok,
    ...(!ok) ? {message} : {},
    ...(ok) ? {user_id} : {},
  }
  return result;
}

function findUserById (idFind) {
  const users = loadJSON(usersDbFile);
  return users.find((user) => (user.id === idFind));
}

function loadProfile (idFind) {
  const userFind = findUserById(idFind) || emptyUser;
  const { id, login, name, avatar, email } = userFind;
  return { id, login, name, avatar };
}

function checkLoginExist (newLogin) {
  const users = loadJSON(usersDbFile);
  const newLoginLow = newLogin.toLowerCase();
  return users.some(({login}) => login.toLowerCase() === newLoginLow);
}

function checkEmailExist (newEmail) {
  const users = loadJSON(usersDbFile);
  const newEmailLow = newEmail.toLowerCase();
  return users.some(({email}) => email.toLowerCase() === newEmailLow);
}

function registerUser (newUser) {
  const users = loadJSON(usersDbFile);
  generateHash(newUser.password);
  if (checkLoginExist(newUser.login)) {
    return {
      ok: false,
      message: 'Login already in use',
    }
  } else if (checkEmailExist(newUser.email)) {
    return {
      ok: false,
      message: 'Email already in use',
    }
  } else {
    const newId = Math.max(0, ...users.map(({id}) => id)) + 1;
    const createdUser = {...newUser, id: newId, password: generateHash(newUser.password)};
    users.push(createdUser);
    saveJSON(usersDbFile, users);
    const { id, login, name, avatar } = createdUser;
    return {
      ok: true,
      user: { id, login, name, avatar }
    };
  }
}

function saveJSON (fileName, data) {
  try {
    const fileData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, fileData, 'utf8');
  } catch (e) {
    console.log('Error write file: ', fileName);
  }
}

function loadJSON (fileName) {
  try {
    const fileData = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    if (err.name === 'SyntaxError') {
      console.log('Error in data file, deleting');
    } else if (err.code === 'ENOENT') {
      console.log('Create file');
      saveJSON(fileName, []);
    } else {
      console.log('Other error:', JSON.stringify(err, null, 2));
    }
    return [];
  }
}

function confirmEmail (hash) {
  console.log(hash);
}

function changePassword (tryHash, password) {
  console.log('Try hash', tryHash);
  const passwords = loadJSON(passwordsDbFile);
  const findPassword = passwords.find(({ hash }) => hash === tryHash);
  if (!findPassword) {
    return {
      ok: false,
      message: 'Error in hash',
    };
  }
  if (password === '') {
    return {
      ok: true,
      message: 'Hash ok, wait for password',
    };
  }
  const users = loadJSON(usersDbFile);
  const userFind = users.find(({ id }) => (id === findPassword.id));
  userFind.password = generateHash(password);
  saveJSON(usersDbFile, users);
}

function createResetHash (login) {
  console.log('Create reset hash for login:', login);
  const users = loadJSON(usersDbFile);
  const userFind = users.find((user) => (user.login === login));
  // TODO: check also email
  if (!userFind) {
    console.log('Login not found');
    return {
      ok: false,
      error: true,
      message: 'Login not found',
    }
  }
  const timeNow = Date.now();
  let passwords = loadJSON(passwordsDbFile);
  // remove expired hashes
  passwords = passwords.filter(({time}) => (timeNow - time < 10 * 60 * 1000));
  // remove old hash for this userId
  passwords = passwords.filter(({user_id}) => !(user_id === userFind.id));
  const newHash = uuid();
  passwords.push({
    hash: newHash,
    user_id: userFind.id,
    time: timeNow,
  })
  saveJSON(passwordsDbFile, passwords);
  send(userFind.email, 'reset-pass', {
    name: userFind.name,
    hash: newHash,
  })
  return {
    ok: true,
    error: false,
    message: 'Check your email to reset password',
  }
}

export {
  tryLogin,
  loadProfile,
  registerUser,
  confirmEmail,
  changePassword,
  createResetHash,
};

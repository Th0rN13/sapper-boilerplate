import fs from 'fs';
import crypto from 'crypto';

const usersDbFile = process.cwd() + '\\.userdb\\user.json';
const emailsDbFile = process.cwd() + '\\.userdb\\email.json';
const passwordsDbFile = process.cwd() + '\\.userdb\\password.json';
const avatarsDbFile = process.cwd() + '\\.userdb\\avatar.json';

const emptyUser = {
  id: -1,
  login: 'none',
  password: '',
  name: 'Unregistered user',
  avatar: '',
  email: '',
}

function generateHash (password) {
  // TODO: add some salt, change hash function?
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

export function tryLogin (login, password) {
  const users = loadJSON(usersDbFile);
  const userFind = users.find((user) => (user.login === login));
  const hashPassword = generateHash(password);
  return {
    ok: (userFind && userFind.password === hashPassword),
    error: userFind ? 'Password error' : 'Login error',
    user: (userFind && userFind.password === hashPassword) ? userFind.id : -1,
  }
}

export function findProfile (idFind) {
  const users = loadJSON(usersDbFile);
  let userFind = users.find((user) => (user.id === idFind));
  if (!userFind) userFind = emptyUser;
  const { id, login, name, avatar, email } = userFind;
  return { id, login, name, avatar, email };
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

export function registerUser (newUser) {
  const users = loadJSON(usersDbFile);
  generateHash(newUser.password);
  if (checkLoginExist(newUser.login)) {
    return {
      ok: false,
      error: true,
      message: 'Login already in use',
    }
  } else if (checkEmailExist(newUser.email)) {
    return {
      ok: false,
      error: true,
      message: 'Email already in use',
    }
  } else {
    const newId = Math.max(...users.map(({id}) => id)) + 1;
    const createdUser = {...newUser, id: newId, password: generateHash(newUser.password)};
    users.push(createdUser);
    saveJSON(usersDbFile, users);
    return {
      ok: true,
      user: newId
    };
  }
}

function findUserConfirmEmail (hash) {
  let fileData;
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

export function confirmEmail (hash) {
  let fileData;
}

import fs from 'fs';
import crypto from 'crypto';

let users = [];
let usersLoaded = false;
const usersFile = process.cwd() + '\\.userdb\\db.json';
const emailFile = process.cwd() + '\\.userdb\\email.json';

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

export function loadUsers () {
  let fileData;
  try {
    fileData = fs.readFileSync(usersFile, 'utf8');
    users = JSON.parse(fileData);
  } catch (err) {
    users = [];
    if (err.name === 'SyntaxError') {
      console.log('Error in data file, deleting');
    } else if (err.code === 'ENOENT') {
      console.log('Create file');
      saveUsers();
    } else {
      console.log('Other error:', JSON.stringify(err, null, 2));
    }
  }
  usersLoaded = true;
}

export function saveUsers () {
  try {
    const fileData = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFile, fileData, 'utf8');
  } catch (e) {
    console.log('Error write file', e);
  }
}

export function findLogin (login, password) {
  if (!usersLoaded) loadUsers();
  const userFind = users.find((user) => (user.login === login));
  const hashPassword = generateHash(password);
  return {
    ok: (userFind && userFind.password === hashPassword),
    error: userFind ? 'Password error' : 'Login error',
    user: (userFind && userFind.password === hashPassword) ? userFind.id : -1,
  }
}

export function findProfile (idFind) {
  if (!usersLoaded) loadUsers();
  let userFind = users.find((user) => (user.id === idFind));
  if (!userFind) userFind = emptyUser;
  const { id, login, name, avatar, email } = userFind;
  return { id, login, name, avatar, email };
}

function checkLoginExist (newLogin) {
  const newLoginLow = newLogin.toLowerCase();
  return users.some(({login}) => login.toLowerCase() === newLoginLow);
}

function checkEmailExist (newEmail) {
  const newEmailLow = newEmail.toLowerCase();
  return users.some(({email}) => email.toLowerCase() === newEmailLow);
}

export function registerUser (newUser) {
  generateHash(newUser.password);
  if (!usersLoaded) loadUsers();
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
    saveUsers();
    return {
      ok: true,
      user: newId
    };
  }
}

function findUserConfirmEmail (hash) {
  let fileData;
  try {
    fileData = fs.readFileSync(emailFile, 'utf8');
    emails = JSON.parse(fileData);
  } catch (err) {
    emails = [];
    if (err.name === 'SyntaxError') {
      console.log('Error in data file, deleting');
    } else if (err.code === 'ENOENT') {
      console.log('Create file');
      saveEmails();
    } else {
      console.log('Other error:', JSON.stringify(err, null, 2));
    }
  }

}

export function confirmEmail (hash) {
  let fileData;
  try {
    fileData = fs.readFileSync(emailFile, 'utf8');
    emails = JSON.parse(fileData);
  } catch (err) {
    emails = [];
    if (err.name === 'SyntaxError') {
      console.log('Error in data file, deleting');
    } else if (err.code === 'ENOENT') {
      console.log('Create file');
      saveEmails();
    } else {
      console.log('Other error:', JSON.stringify(err, null, 2));
    }
  }
}
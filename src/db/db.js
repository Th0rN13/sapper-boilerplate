import { Sequelize } from 'sequelize';
import crypto from 'crypto';
// import { send } from './email';

export const sequelize = new Sequelize({
  storage: 'db/db.sqlite',
  dialect: 'sqlite',
  logging: false,
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    field: 'is_active',
    defaultValue: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login:  {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      message: 'login already exist',
    },
  },
  password:  {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email:  {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      message: 'email already exist',
    },
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    field: 'email_verified',
    defaultValue: false,
  },
  avatar: Sequelize.STRING,
});

sequelize.sync({force: true});

function generateHash (password) {
  // TODO: add some salt, change hash function?
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

export async function tryLogin (login, password) {
  const userFind = await User.findOne({
    where: { login }
  });
  const hashPassword = generateHash(password);
  const ok = (userFind && userFind.password === hashPassword);
  const message = ok ? '' : userFind ? 'Password error' : 'Login error';
  const { id, name, avatar } = userFind;
  const user = { id, login, name, avatar };
  const result = {
    ok,
    ...(!ok && {message}),
    ...(ok && {user}),
  }
  return result;
}

// export async function loadProfile (idToFind) {
//   const userFind = await User.findOne({
//     where: { id: idToFind },
//   }) || emptyUser;
//   const { id, login, name, avatar } = userFind;
//   return { id, login, name, avatar };
// }

export async function checkLoginExist (newLogin) {
  return false;
}

export async function checkEmailExist (newEmail) {
  return false;
}

export async function registerUser (newUser) {
  try {
    const { id, login, name, avatar, email } = newUser;
    newUser.password = generateHash(newUser.password);
    await User.create(newUser);
    return {
      ok: true,
      user: { id, login, name, avatar, email, password: newUser.password }
    };
  } catch(err) {
    if (err.errors && err.errors[0] && err.errors[0].validatorKey === 'not_unique') {
      return {
        ok: false,
        message: err.errors[0].message,
      }
    } else {
      console.log(err);
      return {
        ok: false,
        message: 'Server error',
      };
    }
  }
}

export async function confirmEmail (hash) {
  console.log(hash);
}

export async function changePassword (tryHash, password) {
  console.log('Try hash', tryHash);
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
  const userFind = users.find(({ id }) => (id === findPassword.id));
  userFind.password = generateHash(password);
}

export async function createResetHash (login) {
  console.log('Create reset hash for login:', login);
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

import { Sequelize } from 'sequelize';
import crypto from 'crypto';

export const sequelize = new Sequelize({
  storage: 'db/db.sqlite',
  dialect: 'sqlite',
  logging: false,
});


// TODO: Request a second email if you didn't get it, or activating link expired
// TODO: Delete accounts that are not activated

// const userStatus = {
//   'JUST_REGISTERED': 0,
//   '': 1,
// }

const EmailConfirm = sequelize.define('EmailConfirm', {
  hash: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  }
});

const PasswordReset = sequelize.define('PasswordReset', {
  hash: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  }
});

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      message: 'email already exist',
    },
  },
  role: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  avatar: Sequelize.STRING,
});

EmailConfirm.belongsTo(User);
PasswordReset.belongsTo(User);

sequelize.sync(
  // { force: true }
);

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

export async function checkLoginExist (login) {
  const user = await User.findOne({ where: { login }});
  return Boolean(user);
}

export async function checkEmailExist (email) {
  const user = await User.findOne({ where: { email }});
  return Boolean(user);
}

export async function registerUser (newUser) {
  try {
    const { login, name, email, password } = newUser;
    newUser.password = generateHash(password);
    const { id } = await User.create(newUser);
    const { hash } = await EmailConfirm.create({UserId: id});
    const emailHash = hash;
    return {
      ok: true,
      user: { id, login, name, email, emailHash }
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
  try {
    // TODO: remove old records (more than 24h)
    const emailConfirmRecord = await EmailConfirm.findOne({
      where: { hash }
    });
    if (emailConfirmRecord) {
      await User.update({ status: 1 }, {
        where: { id: emailConfirmRecord.UserId }
      });
      await EmailConfirm.destroy({
        where: { hash }
      });
      return {
        ok: true,
        userId: emailConfirmRecord.UserId,
      }
    }
    return {
      ok: false,
      message: 'Link not valid',
    }
  } catch(err) {
    console.log(err);
    return {
      ok: false,
      message: 'Server error',
    }
  }
}

export async function changePassword (hash, password) {
  try {
    // TODO: remove old records (more than 24h)
    const passwordResetRecord = await PasswordReset.findOne({ where: { hash } });
    if (passwordResetRecord) {
      await User.update({ password: generateHash(password) }, {
        where: { id: passwordResetRecord.UserId }
      });
      await PasswordReset.destroy({ where: { hash } });
      return {
        ok: true,
      }
    }
    return {
      ok: false,
      message: 'Hash wrong',
    }
  } catch(err) {
    console.log(err);
    return {
      ok: false,
      message: 'Server error',
    }
  }
}

export async function createResetHash (login) {
  try {
    // TODO: remove old records (more than 24h)
    const user = await User.findOne({ where: { login } });
    await PasswordReset.destroy({ where: { UserId: user.id }});
    const passwordResetRecord = await PasswordReset.create({ UserId: user.id });
    return {
      ok: true,
      email: user.email,
      hash: passwordResetRecord.hash,
    }
  } catch(err) {
    console.log(err);
    return {
      ok: false,
      message: 'Server error',
    }
  }
}

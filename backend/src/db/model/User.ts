import * as Sequelize from 'sequelize';
import { sequelize } from '..';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export interface UserAddModel {
  email: string;
  username: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface UserViewModel {
  id: string;
  email: string;
}

const User: Sequelize.Model<UserModel, UserAddModel> = sequelize.define<
  UserModel,
  UserAddModel
>(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.STRING
  },
  {
    timestamps: true
  }
);

export const hash = (password: string): string => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(password, salt);
  return hash;
};

export default User;

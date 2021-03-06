import { sequelize } from '.';

import { Post, User, Category, Tag, Work, Folder, Plan, Planer } from './model';
export const sync = () => {
	Post.associate();
	Category.associate();
	Folder.associate();
	Work.associate();
	Plan.associate();
	Planer.associate();
	sequelize.query('set FOREIGN_KEY_CHECKS=0');
	sequelize.sync();
};

import Post from '../../db/model/Post';
import User from '../../db/model/User';
import Category from '../../db/model/Category';

export const uploadBookCoverImage = (req, res) => {
	let imgFile = req.file;
	res.json(imgFile);
};

export const uploadImageInContent = (req, res) => {
	let imgFile = req.file;
	res.status(200).json(imgFile);
};

export const write = async (req, res) => {
	const { category } = req.body;
	const { userId: fk_user_id } = req.decodedUser;
	try {
		const machedCategory = await Category.findOrCreate({
			where: { name: category }
		});
		const user = await User.findOne({ where: { id: fk_user_id } });
		// const user = await User.find({ where: { id: fk_user_id } });
		const post = await Post.create(req.body);
		await post.setUser(user);
		// await post.setUser(fk_user_id);
		await post.setCategory(machedCategory[0]);
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updatePost = async (req, res) => {
	const {
		id,
		createdAt,
		fk_user_id,
		fk_category_id,
		category,
		...updateDate
	} = req.body;
	try {
		const machedCategory = await Category.findOrCreate({
			where: { name: category }
		});
		const post = await Post.findOne({ where: { id } });
		await post.setCategory(machedCategory[0]);
		const a = await Post.update(updateDate, { where: { id } });
		res.status(200).json(a);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.query;
	try {
		await Post.destroy({
			where: {
				id
			}
		});
		res.status(200).json({ message: 'delete post successfully' });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getPostsByUserId = async (req, res) => {
	const { userId } = req.query;
	const posts = await Post.findAll({
		where: { fk_user_id: userId },
		order: [ [ 'createdAt', 'DESC' ] ]
	});
	res.status(200).json(posts);
};
export const getPostByPostId = async (req, res) => {
	const { postId } = req.query;
	const posts = await Post.findOne({ where: { id: postId } });
	res.status(200).json(posts);
};

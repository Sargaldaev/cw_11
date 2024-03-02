import express from 'express';
import { Error } from 'mongoose';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import Category from '../models/Category';

const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const product = new Product({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      image: req.file ? 'images/' + req.file.filename : null,
      category: req.body.category,
    });
    await product.save();
    return res.send(product);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});

productsRouter.get('/', async (req, res) => {
  try {

    const category = req.query.category;

    if (category === 'AllItems' || !category) {
      const product = await Product.find();
      return res.send(product);
    }

    const categoryById = await Category.findOne({_id: category});

    if (!categoryById) {
      return res.sendStatus(404);
    }

    const product = await Product.find({category: categoryById._id});
    return res.send(product);

  } catch (error) {
    return res.send(error);
  }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.send('product not found');
    }

    if (product && user._id.toString() === product.user.toString()) {

      await Product.deleteOne({_id});
      return res.send('product deleted');

    }

    return res.sendStatus(403);

  } catch (error) {

    if (error instanceof Error.ValidationError) {
      return res.status(422).send(error);
    }
    return next(error);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({_id}).populate('user', 'username phone');
    return res.send(product);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default productsRouter;
import mongoose, { Types } from 'mongoose';
import User from './User';
import Category from './Category';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    validate: {
      validator: async (value: mongoose.Schema.Types.ObjectId) => User.findById(value),
      message: 'Users is not found!',
    },
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist!',
    },
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: [0, 'the number cannot be less than 0'],
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;

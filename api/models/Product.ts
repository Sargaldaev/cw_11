import mongoose from 'mongoose';
import { Product } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const ProductSchema = new Schema<Product>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    validate: {
      validator: async (value: mongoose.Schema.Types.ObjectId) => User.findById(value),
      message: 'Users is not found!',
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

  category: {
    type: String,
    required: true,
    enum: ['Cars', 'Computers', 'Other'],
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;

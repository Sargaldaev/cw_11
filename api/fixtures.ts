import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Product from './models/Product';
import Category from './models/Category';

(async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('products');
    await db.dropCollection('categories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'John',
      password: '123',
      displayName: 'admin',
      phone: '+996 727 241 222',
      token: crypto.randomUUID(),
    },
    {
      username: 'Bob',
      password: '123',
      displayName: 'admin1',
      phone: '+996 728 142 256',
      token: crypto.randomUUID(),
    },
  );

  const [_, Car, Phone, Laptop] = await Category.create(
    {
      title: 'AllItems',
    },
    {
      title: 'Car',
    },
    {
      title: 'Phone',
    },
    {
      title: 'Laptop',
    },
  );

  await Product.create(
    {
      user: user_1._id,
      category: Laptop,
      title: 'MacBook',
      description: 'laptop office work',
      price: 199.0,
      image: 'fixtures/macbook.jpg',
    },
    {
      user: user_1._id,
      category: Laptop,
      title: 'Laptop hp',
      description: 'Laptop play Game',
      price: 922.45,
      image: 'fixtures/laptop1.png',
      phone: '0701-83-83-63',
    },
    {
      user: user_1._id,
      category: Car,
      title: 'Mersedes',
      description: 'Best car',
      price: 38978,
      phone: '0701-83-83-63',
      image: 'fixtures/Mercedes1.jpg',
    },
    {
      user: user_2._id,
      category: Car,
      title: 'BMW',
      description: '2015 BMW Model S 85D',
      price: 25000,
      image: 'fixtures/bmw.png',
    },
    {
      user: user_2._id,
      category: Phone,
      title: 'IPhone 11',
      description: 'black color',
      price: 34,
      image: 'fixtures/Iphone.jpg',
    },
    {
      user: user_1._id,
      category: Phone,
      title: 'Samsung',
      description: ' white color ',
      price: 1926,
      image: 'fixtures/samsung.jpg',
    },
  );

  await db.close();
})().catch(console.error);

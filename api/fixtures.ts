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

  const [AllItems,Car, Phone, Laptop] = await Category.create(
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
      title: 'notebook',
      description: 'notebook office work',
      price: 199.0,
      image: 'fixtures/laptop1.png',
    },
    {
      user: user_1._id,
      category: Laptop,
      title: 'notebook',
      description: 'notebook play Game',
      price: 922.45,
      image: 'fixtures/laptop1.png',
    },
    {
      user: user_1._id,
      category: Car,
      title: 'Mersedes ',
      description: 'Best car',
      price: 38978,
      image: 'fixtures/Mercedes1.jpg',
    },
    {
      user: user_2._id,
      category: Car,
      title: '2015 Mersedes s class',
      description: 'I\'d like to know if the Used 2015 Mersedes Model S 85D you have listed on Cars.com for $22,995 is still available.',
      price: 25000,
      image: 'fixtures/Mercedes1.jpg',
    },
    {
      user: user_2._id,
      category: Phone,
      title: 'Orange',
      description: 'eat orange',
      price: 34,
      image: 'fixtures/orange.png',
    },
    {
      user: user_1._id,
      category: Phone,
      title: 'Ball',
      description: 'Football playing ',
      price: 1926,
      image: 'fixtures/ball.jpeg',
    },
  );

  await db.close();
})().catch(console.error);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { announcements, quizzes } from './sampleData';
import User from '../models/User';
import Announcement from '../models/Announcement';
import Quiz from '../models/Quiz';
import connectDB from '../config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Announcement.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Cleared...');

    await User.create({
      name: 'Talia',
      email: 'demo@example.com',
      isLoggedIn: false,
    });

    console.log('User Created...');

    await Announcement.insertMany(announcements);
    await Quiz.insertMany(quizzes);

    console.log('Data Imported!');
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Announcement.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 
import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

// @desc    Register or Login a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let user = await User.findOne({ email: 'mohamed@gmail.com' });

    if (!user) {
      user = await User.create({
        name: 'Mohamed',
        email: 'mohamed@gmail.com',
        isLoggedIn: true,
      });
    } else {
      user.isLoggedIn = true;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isLoggedIn: user.isLoggedIn,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: 'demo@example.com' });

    if (user) {
      user.isLoggedIn = false;
      await user.save();
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: 'demo@example.com' });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isLoggedIn: user.isLoggedIn,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 
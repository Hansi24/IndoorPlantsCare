import e from 'express';
import User from '../schema/User';
import { Helper } from '../utils/helper';
import { Types } from 'mongoose';

interface IUserInput {
    name?: string;
    email?: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    gender?: string;
}

export const createUser = async (userData: IUserInput) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await Helper.hashPassword(userData.password);
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();
    const token = Helper.generateToken(newUser._id, newUser.role);
    return { token: token };
  } catch (error) {
    throw error;
  }
};

export const login = async (userData: IUserInput) => {
  try {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        throw new Error('User not found');
      }
      const isPasswordValid = await Helper.comparePassword(userData.password, existingUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = Helper.generateToken(existingUser._id, existingUser.role);
      return {token: token };
  } catch (error) {
      throw error;
  }
};
export const userDetails = async (userId: Types.ObjectId) => {
  try {
      const existingUser = await User.findById(userId).select('-password');
      if (!existingUser) {
        throw new Error('User not found');
      }
      return existingUser;
  } catch (error) {
      throw error;
  }
  
};

export const getAllUsers = async () => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    return users;
  } catch (error) {
    throw error;
  }
};


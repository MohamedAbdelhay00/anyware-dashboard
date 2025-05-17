import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User; 
import mongoose from 'mongoose';

export interface IQuiz extends mongoose.Document {
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz; 
import mongoose from 'mongoose';

export interface IAnnouncement extends mongoose.Document {
  title: string;
  content: string;
  author: {
    name: string;
    subject: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema);

export default Announcement; 
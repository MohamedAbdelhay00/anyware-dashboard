import { Request, Response } from 'express';
import Announcement from '../models/Announcement';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
export const getAnnouncements = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single announcement
// @route   GET /api/announcements/:id
// @access  Private
export const getAnnouncementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (announcement) {
      res.status(200).json(announcement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private
export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author } = req.body;
    
    const announcement = await Announcement.create({
      title,
      content,
      author,
    });
    
    res.status(201).json(announcement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private
export const updateAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author } = req.body;
    
    const announcement = await Announcement.findById(req.params.id);
    
    if (announcement) {
      announcement.title = title || announcement.title;
      announcement.content = content || announcement.content;
      announcement.author = author || announcement.author;
      
      const updatedAnnouncement = await announcement.save();
      res.status(200).json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private
export const deleteAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (announcement) {
      await Announcement.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Announcement removed' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; 
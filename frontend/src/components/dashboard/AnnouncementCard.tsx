import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  Divider 
} from '@mui/material';
import type { Announcement } from '../../services/announcementService';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 'none', borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={announcement.author.avatar}
            alt={announcement.author.name}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" component="div" fontWeight="bold">
              {announcement.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {announcement.author.subject}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1" component="div" sx={{ mt: 1 }}>
          {announcement.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard; 
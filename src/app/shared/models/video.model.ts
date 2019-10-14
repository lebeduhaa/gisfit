import { Comment } from './comment.model';

export interface Video {
  id?: string;
  title?: string;
  description?: string;
  videoFile?: string;
  imageFile?: string;
  views?: number;
  likes?: string[];
  dislikes?: string[];
  comments?: Comment[];
  duration?: number;
  timestamp?: number;
}

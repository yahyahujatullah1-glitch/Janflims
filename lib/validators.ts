import { z } from 'zod';

export const VideoCreateSchema = z.object({
  title:        z.string().min(1, 'Title is required').max(255),
  slug:         z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug: lowercase letters, numbers, hyphens only'),
  description:  z.string().min(1, 'Description is required'),
  streamUrl:    z.string().url('Must be a valid URL'),
  trailerUrl:   z.string().url().optional().or(z.literal('')),
  thumbnailUrl: z.string().url('Must be a valid URL'),
  backdropUrl:  z.string().url().optional().or(z.literal('')),
  type:         z.enum(['movie', 'series']),
  genre:        z.string().min(1, 'At least one genre required'),
  releaseYear:  z.coerce.number().int().min(1900).max(2100),
  rating:       z.string().min(1).max(10),
  duration:     z.coerce.number().int().positive().optional(),
  imdbScore:    z.coerce.number().min(0).max(10).optional(),
  language:     z.string().min(1),
  cast:         z.string().optional(),
  isFeatured:   z.boolean().default(false),
});

export const VideoUpdateSchema = VideoCreateSchema.partial();

export const RegisterSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:    z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const WatchProgressSchema = z.object({
  videoId:         z.number().int().positive(),
  progressSeconds: z.number().int().min(0),
});

export type VideoCreateInput  = z.infer<typeof VideoCreateSchema>;
export type VideoUpdateInput  = z.infer<typeof VideoUpdateSchema>;
export type RegisterInput     = z.infer<typeof RegisterSchema>;
export type WatchProgressInput= z.infer<typeof WatchProgressSchema>;

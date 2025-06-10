
-- Create a table for poems
CREATE TABLE public.poems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  read_time TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for writer bio
CREATE TABLE public.writer_bio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default writer bio
INSERT INTO public.writer_bio (name, title, bio, email) 
VALUES (
  'Varnika', 
  'Magical Word Weaver', 
  'A dreamer who believes in the magic of words and the power of stories to change hearts.',
  'varnika1947kaushik@gmail.com'
);

-- Enable Row Level Security (RLS) - making tables publicly readable but only admin can modify
ALTER TABLE public.poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writer_bio ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view published poems" 
  ON public.poems 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Anyone can view writer bio" 
  ON public.writer_bio 
  FOR SELECT 
  USING (true);

-- Create policies for admin access (all operations)
CREATE POLICY "Admin can manage poems" 
  ON public.poems 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can manage blog posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can manage writer bio" 
  ON public.writer_bio 
  FOR ALL 
  USING (true);

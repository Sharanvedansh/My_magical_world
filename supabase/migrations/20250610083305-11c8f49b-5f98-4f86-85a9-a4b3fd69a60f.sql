
-- Create a table for likes
CREATE TABLE public.likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_ip TEXT NOT NULL,
  post_type TEXT NOT NULL CHECK (post_type IN ('poem', 'blog_post')),
  post_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_ip, post_type, post_id)
);

-- Create a table for contact messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for likes (anyone can add/view)
CREATE POLICY "Anyone can view likes" 
  ON public.likes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can add likes" 
  ON public.likes 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for contact messages (anyone can submit, admin can view)
CREATE POLICY "Anyone can submit contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (true);

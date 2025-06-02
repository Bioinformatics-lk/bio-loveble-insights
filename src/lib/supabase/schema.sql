-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid references auth.users on delete cascade primary key,
    username text,
    organization text,
    description text,
    profile_picture_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text not null,
    full_description text not null,
    duration text not null,
    price decimal(10,2) not null,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    course_id uuid references public.courses on delete cascade not null,
    status text default 'pending' not null,
    payment_status text default 'pending' not null,
    enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
    completed_at timestamp with time zone,
    unique(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view courses" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "Users can view their own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" ON public.enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profile updates
CREATE TRIGGER on_profile_update
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_profile_update(); 
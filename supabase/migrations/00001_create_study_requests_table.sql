-- Create the study_requests table
CREATE TABLE public.study_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    organization TEXT,
    project_type TEXT NOT NULL,
    project_location TEXT NOT NULL,
    pool_volume TEXT,
    requirement TEXT NOT NULL,
    target_temperature TEXT,
    operating_season TEXT,
    existing_system TEXT,
    project_notes TEXT,
    
    -- Status of the request for internal tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'completed'))
);

-- Secure the table by enabling Row Level Security
ALTER TABLE public.study_requests ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (so unauthenticated users can submit the form via public client if we choose to do so from the client side)
-- Alternatively, if we insert via Server Action using Service Role, we don't strictly need this policy, 
-- but it's good practice to have it in case we switch to client-side inserts.
CREATE POLICY "Anyone can insert a study request" ON public.study_requests
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Only authenticated admins can view the requests
CREATE POLICY "Only authenticated users can view study requests" ON public.study_requests
    FOR SELECT
    TO authenticated
    USING (true);

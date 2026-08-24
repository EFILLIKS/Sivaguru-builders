-- Sivaguru Builders Database Migration
-- Initial Schema and Security (RLS) Policies

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum types
CREATE TYPE user_role AS ENUM ('admin', 'editor');

-- 1. PROFILES TABLE
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'editor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    category TEXT NOT NULL,
    service TEXT NOT NULL,
    location TEXT NOT NULL,
    year INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    built_up_area TEXT,
    plot_area TEXT,
    floors INTEGER,
    bedrooms INTEGER,
    short_description_en TEXT NOT NULL,
    short_description_ta TEXT NOT NULL,
    overview_en TEXT NOT NULL,
    overview_ta TEXT NOT NULL,
    design_description_en TEXT,
    design_description_ta TEXT,
    construction_description_en TEXT,
    construction_description_ta TEXT,
    interior_description_en TEXT,
    interior_description_ta TEXT,
    key_features_en TEXT[] DEFAULT '{}',
    key_features_ta TEXT[] DEFAULT '{}',
    map_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    cover_image_url TEXT NOT NULL,
    cover_image_public_id TEXT NOT NULL,
    seo_title_en TEXT,
    seo_title_ta TEXT,
    seo_description_en TEXT,
    seo_description_ta TEXT,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECT IMAGES TABLE
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL,
    cloudinary_secure_url TEXT NOT NULL,
    alt_en TEXT NOT NULL DEFAULT '',
    alt_ta TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SERVICES TABLE
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_ta TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ta TEXT NOT NULL,
    image_url TEXT,
    icon TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. FAQS TABLE
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_en TEXT NOT NULL,
    question_ta TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    answer_ta TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CONTACT ENQUIRIES TABLE
CREATE TABLE contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    service TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. SITE SETTINGS TABLE
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL DEFAULT 'Sivaguru Builders',
    phone TEXT NOT NULL,
    whatsapp TEXT,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    google_maps_url TEXT,
    instagram TEXT,
    facebook TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_project_images_project ON project_images(project_id, sort_order);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(published, sort_order);
CREATE INDEX idx_faqs_published ON faqs(published, sort_order);
CREATE INDEX idx_contact_enquiries_status ON contact_enquiries(status, created_at DESC);

-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- AUTOMATIC PROFILE CREATION TRIGGER FOR AUTH USERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'editor'::public.user_role)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- HELPER FUNCTIONS FOR SECURITY RULES
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can read own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id OR is_admin());

CREATE POLICY "Admins can insert profiles"
    ON profiles FOR INSERT
    WITH CHECK (is_admin());

CREATE POLICY "Users can update own profile name, Admins full update"
    ON profiles FOR UPDATE
    USING (auth.uid() = id OR is_admin())
    WITH CHECK (auth.uid() = id OR is_admin());

CREATE POLICY "Admins can delete profiles"
    ON profiles FOR DELETE
    USING (is_admin());

-- 2. PROJECTS POLICIES
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = TRUE OR is_admin_or_editor());

CREATE POLICY "Admins and Editors can insert projects"
    ON projects FOR INSERT
    WITH CHECK (is_admin_or_editor());

CREATE POLICY "Admins and Editors can update projects"
    ON projects FOR UPDATE
    USING (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

CREATE POLICY "Admins and Editors can delete projects"
    ON projects FOR DELETE
    USING (is_admin_or_editor());

-- 3. PROJECT IMAGES POLICIES
CREATE POLICY "Public can view project images for published projects"
    ON project_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_images.project_id
            AND (projects.published = TRUE OR is_admin_or_editor())
        )
    );

CREATE POLICY "Admins and Editors can manage project images"
    ON project_images FOR ALL
    USING (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

-- 4. SERVICES POLICIES
CREATE POLICY "Public can view published services"
    ON services FOR SELECT
    USING (published = TRUE OR is_admin_or_editor());

CREATE POLICY "Admins and Editors can manage services"
    ON services FOR ALL
    USING (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

-- 5. FAQS POLICIES
CREATE POLICY "Public can view published FAQs"
    ON faqs FOR SELECT
    USING (published = TRUE OR is_admin_or_editor());

CREATE POLICY "Admins and Editors can manage FAQs"
    ON faqs FOR ALL
    USING (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

-- 6. CONTACT ENQUIRIES POLICIES
CREATE POLICY "Anyone can submit contact enquiries"
    ON contact_enquiries FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Only Admins and Editors can view enquiries"
    ON contact_enquiries FOR SELECT
    USING (is_admin_or_editor());

CREATE POLICY "Only Admins and Editors can update enquiry status"
    ON contact_enquiries FOR UPDATE
    USING (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

CREATE POLICY "Only Admins can delete enquiries"
    ON contact_enquiries FOR DELETE
    USING (is_admin());

-- 7. SITE SETTINGS POLICIES
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins can update site settings"
    ON site_settings FOR UPDATE
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can insert site settings"
    ON site_settings FOR INSERT
    WITH CHECK (is_admin());

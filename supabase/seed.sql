-- Sivaguru Builders Database Seed Script

-- 1. SEED SERVICES
INSERT INTO public.services (slug, title_en, title_ta, description_en, description_ta, image_url, icon, sort_order, published)
VALUES
(
  'residential-construction',
  'Residential Construction',
  'குடியிருப்பு கட்டுமானம்',
  'We build residential spaces with careful attention to structure, materials, functionality and the details that make a house feel like home.',
  'அமைப்பு, தரமான பொருட்கள், செயல்பாடு மற்றும் வீட்டின் உணர்வை உருவாக்கும் நுணுக்கமான விவரங்களில் கவனம் செலுத்தி குடியிருப்புகளை கட்டுகிறோம்.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/house-image.jpg',
  'Home',
  1,
  TRUE
),
(
  'commercial-construction',
  'Commercial Construction',
  'வணிக கட்டுமானம்',
  'We combine practical planning, structural expertise, and attention to create environments designed for commercial growth.',
  'வடிவமைக்கப்பட்ட சூழல்களை உருவாக்க நடைமுறை திட்டமிடல், கட்டமைப்பு நிபுணத்துவம் மற்றும் கவனத்தை நாங்கள் ஒன்றிணைக்கிறோம்.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/wcu1.png',
  'Building2',
  2,
  TRUE
),
(
  'interior-design',
  'Interior Design',
  'உள் வடிவமைப்பு',
  'Our interior design approach balances aesthetics with everyday functionality that feel intentional, comfortable, and distinctly yours.',
  'எங்கள் உள் வடிவமைப்பு அணுகுமுறை அழகியல் மற்றும் அன்றாட செயல்பாட்டை சமநிலைப்படுத்துகிறது.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/wcu2.png',
  'Sparkles',
  3,
  TRUE
),
(
  'reconstruct',
  'Reconstruct',
  'மறுசீரமைப்பு',
  'We transform existing buildings through thoughtful reconstruction and structural improvements that preserves something better.',
  'சிந்தனைமிக்க மறுசீரமைப்பு மற்றும் கட்டமைப்பு மேம்பாடுகள் மூலம் தற்போதுள்ள கட்டிடங்களை நாங்கள் மாற்றுகிறோம்.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/house-image.jpg',
  'Hammer',
  4,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  description_en = EXCLUDED.description_en,
  image_url = EXCLUDED.image_url;

-- 2. SEED PROJECTS
INSERT INTO public.projects (
  slug, name_en, name_ta, category, location, location_ta, year, status, built_up_area,
  short_description_en, short_description_ta, overview_en, overview_ta, cover_image_url, published
)
VALUES
(
  'demo-luxury-villa',
  'Demo Luxury Villa',
  'டெமோ லக்சுரி வில்லா',
  'Residential',
  'Trichy, Tamil Nadu',
  'திருச்சி, தமிழ்நாடு',
  2026,
  'Published',
  '3,500 sq.ft',
  'A modern luxury villa designed with sustainable materials and open courtyard planning.',
  'சுற்றுச்சூழலுக்கு உகந்த பொருட்கள் மற்றும் திறந்த முற்ற திட்டமிடலுடன் வடிவமைக்கப்பட்ட நவீன சொகுசு வில்லா.',
  'This residential project demonstrates modern aesthetic principles combined with tropical climate optimization. Designed to deliver optimal natural lighting and cross-ventilation.',
  'இந்த குடியிருப்பு திட்டம் நவீன அழகியல் கொள்கைகளை வெப்பமண்டல காலநிலை தேர்வுடன் வெளிப்படுத்துகிறது.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/house-image.jpg',
  TRUE
),
(
  'demo-corporate-complex',
  'Demo Corporate Complex',
  'டெமோ கார்ப்பரேட் வளாகம்',
  'Commercial',
  'Thanjavur, Tamil Nadu',
  'தஞ்சாவூர், தமிழ்நாடு',
  2025,
  'Published',
  '12,000 sq.ft',
  'State of the art commercial hub featuring energy-efficient glass facade and flexible office spaces.',
  'ஆற்றல் திறன் கொண்ட கண்ணாடி முகப்பு மற்றும் நெகிழ்வான அலுவலக இடங்களைக் கொண்ட அதிநவீன வணிக மையம்.',
  'Designed for commercial growth with smart building automation and ample parking infrastructure.',
  'ஸ்மார்ட் கட்டிட ஆட்டோமேஷன் மற்றும் போதுமான பார்க்கிங் உள்கட்டமைப்புடன் வணிக வளர்ச்சிக்காக வடிவமைக்கப்பட்டுள்ளது.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/wcu1.png',
  TRUE
),
(
  'demo-penthouse-transformation',
  'Demo Penthouse Transformation',
  'டெமோ பென்ட்ஹவுஸ் மாற்றம்',
  'Interior',
  'Chennai, Tamil Nadu',
  'சென்னை, தமிழ்நாடு',
  2026,
  'Published',
  '2,200 sq.ft',
  'Contemporary interior makeover featuring custom wooden millwork and warm ambient lighting.',
  'விருப்ப மர வேலைப்பாடுகள் மற்றும் சூடான விளக்குகளைக் கொண்ட நவீன உட்புற மாற்றம்.',
  'A sleek interior overhaul focused on spatial openness, ergonomics, and bespoke furniture design.',
  'இடவெளி திறந்த தன்மை, பணிச்சூழலியல் மற்றும் தனிப்பயனாக்கப்பட்ட தளபாடங்கள் வடிவமைப்பு.',
  'https://res.cloudinary.com/fbkn66wc/image/upload/v1/sivaguru_projects/wcu2.png',
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  cover_image_url = EXCLUDED.cover_image_url;

-- 3. SEED FAQS
INSERT INTO public.faqs (question_en, question_ta, answer_en, answer_ta, sort_order, published)
VALUES
(
  'What architectural & construction services do you offer?',
  'நீங்கள் என்ன கட்டிடக்கலை மற்றும் கட்டுமான சேவைகளை வழங்குகிறீர்கள்?',
  'We provide end-to-end architecture, residential construction, commercial complexes, bespoke interior design, and building reconstruction across Tamil Nadu.',
  'தமிழ்நாடு முழுவதும் இறுதி முதல் இறுதி வரையிலான கட்டிடக்கலை, குடியிருப்பு கட்டுமானம், வணிக வளாகங்கள், உள் வடிவமைப்பு மற்றும் மறுசீரமைப்பு சேவைகளை நாங்கள் வழங்குகிறோம்.',
  1,
  TRUE
),
(
  'How do you manage project timelines and quality standards?',
  'திட்ட காலக்கெடு மற்றும் தரக் தரநிலைகளை எவ்வாறு நிர்வகிக்கிறீர்கள்?',
  'Every project undergoes strict milestone planning, certified material testing, and weekly progress reports provided directly to client owners.',
  'ஒவ்வொரு திட்டமும் கடுமையான திட்டமிடல், சான்றளிக்கப்பட்ட பொருள் சோதனை மற்றும் வாராந்திர முன்னேற்ற அறிக்கைகளுக்கு உட்படுகிறது.',
  2,
  TRUE
),
(
  'Can I customize interior designs for my ongoing construction?',
  'எனது நடந்து வரும் கட்டுமானத்திற்கான உள் வடிவமைப்புகளை நான் தனிப்பயனாக்கலாமா?',
  'Yes! Our interior designers collaborate closely with our construction team to seamlessly integrate custom joinery, lighting, and finishes during the build.',
  'ஆம்! எங்கள் உள் வடிவமைப்பாளர்கள் எங்கள் கட்டுமானக் குழுவுடன் நெருக்கமாக இணைந்து செயல்படுகிறார்கள்.',
  3,
  TRUE
)
ON CONFLICT DO NOTHING;

-- 4. SEED SITE SETTINGS
INSERT INTO public.site_settings (company_name, phone, whatsapp, email, address, google_maps_url)
VALUES (
  'Sivaguru Builders',
  '+91 98765 43210',
  '+91 98765 43210',
  'info@sivagurubuilders.com',
  'Tamil Nadu, India',
  'https://maps.google.com'
)
ON CONFLICT DO NOTHING;

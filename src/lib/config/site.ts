export const siteConfig = {
  name: "Sivaguru Builders",
  nameTa: "சிவகுரு பில்டர்ஸ்",
  legalName: "Sivaguru Builders",
  title: "Sivaguru Builders | Architecture, Construction & Interior Design in Tamil Nadu",
  description:
    "Sivaguru Builders offers premium architectural design, custom residential & commercial construction, and luxury interior design across Trichy & Tamil Nadu.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.sivagurubuilders.com",
  ogImage: "/opengraph-image",
  contact: {
    phone: "+91 7358640561",
    email: "sivagurubuilders2022@gmail.com",
    contactType: "Customer Support",
  },
  address: {
    streetAddress: "Andavar Street, Kattuputhur",
    addressLocality: "Trichy",
    addressRegion: "Tamil Nadu",
    postalCode: "621207",
    addressCountry: "IN",
  },
  geo: {
    latitude: 11.0257,
    longitude: 78.4357,
  },
  serviceAreas: [
    "Trichy",
    "Karur",
    "Musiri",
    "Namakkal",
    "Salem",
    "Madurai",
    "Chennai",
    "Tamil Nadu",
  ],
  social: {
    facebook: "https://facebook.com/sivagurubuilders",
    instagram: "https://instagram.com/sivagurubuilders",
    linkedin: "https://linkedin.com/company/sivagurubuilders",
    youtube: "https://youtube.com/@sivagurubuilders",
  },
  keywords: [
    "Sivaguru Builders",
    "Sivaguru Builders Trichy",
    "Best Builders in Trichy",
    "Construction Company in Tamil Nadu",
    "Architects in Trichy",
    "Residential Builders in Trichy",
    "Custom Home Construction Tamil Nadu",
    "Commercial Building Contractors Trichy",
    "Luxury Interior Design Services",
    "Turnkey Construction Company",
    "Builders in Kattuputhur",
    "Building Contractors Musiri",
  ],
  priceRange: "₹₹ - ₹₹₹₹",
  openingHours: [
    "Mo-Sa 09:00-19:00",
  ],
};

export type SiteConfig = typeof siteConfig;

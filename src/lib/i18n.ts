import type { Locale } from '@/types';

export const LOCALES: { code: Locale; label: string; nativeName: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'ta', label: 'TA', nativeName: 'தமிழ்' },
];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Extract a localized field value from a database record containing *_en and *_ta properties.
 * Example: getLocalizedField(project, 'name', 'ta') -> project.name_ta || project.name_en
 */
export function getLocalizedField<T extends Record<string, unknown>>(
  item: T | null | undefined,
  fieldName: string,
  locale: Locale = DEFAULT_LOCALE
): string {
  if (!item) return '';

  const targetKey = `${fieldName}_${locale}`;
  const fallbackKey = `${fieldName}_en`;

  const targetValue = item[targetKey];
  if (typeof targetValue === 'string' && targetValue.trim() !== '') {
    return targetValue;
  }

  const fallbackValue = item[fallbackKey];
  if (typeof fallbackValue === 'string') {
    return fallbackValue;
  }

  return '';
}

/**
 * Extract a localized array field (such as key_features_en / key_features_ta).
 */
export function getLocalizedArray<T extends Record<string, unknown>>(
  item: T | null | undefined,
  fieldName: string,
  locale: Locale = DEFAULT_LOCALE
): string[] {
  if (!item) return [];

  const targetKey = `${fieldName}_${locale}`;
  const fallbackKey = `${fieldName}_en`;

  const targetValue = item[targetKey];
  if (Array.isArray(targetValue) && targetValue.length > 0) {
    return targetValue as string[];
  }

  const fallbackValue = item[fallbackKey];
  if (Array.isArray(fallbackValue)) {
    return fallbackValue as string[];
  }

  return [];
}

/**
 * Common UI static strings dictionary for English and Tamil.
 */
export const uiDictionaries = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
      admin: 'Admin Portal',
    },
    common: {
      readMore: 'Read More',
      viewProject: 'View Project',
      contactUs: 'Contact Us',
      getInTouch: 'Get In Touch',
      submit: 'Submit Enquiry',
      loading: 'Loading...',
      languageSwitch: 'Language',
    },
  },
  ta: {
    nav: {
      home: 'முகப்பு',
      projects: 'திட்டங்கள்',
      services: 'சேவைகள்',
      about: 'எங்களைப் பற்றி',
      contact: 'தொடர்புகொள்ள',
      admin: 'நிர்வாக பகுதி',
    },
    common: {
      readMore: 'மேலும் படிக்க',
      viewProject: 'திட்டத்தைப் பார்க்க',
      contactUs: 'தொடர்பு கொள்ளவும்',
      getInTouch: 'எங்களை தொடர்பு கொள்ள',
      submit: 'விசாரணையை சமர்ப்பிக்கவும்',
      loading: 'ஏற்றுகிறது...',
      languageSwitch: 'மொழி',
    },
  },
};

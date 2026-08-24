import React from "react";
import { siteConfig } from "@/lib/config/site";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
  providerName?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  dateCreated?: string;
  location?: string;
}

interface JsonLdProps {
  type: "LocalBusiness" | "Organization" | "WebSite" | "FAQPage" | "Service" | "CreativeWork";
  data?: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schemaData: any = null;

  const baseUrl = siteConfig.url.replace(/\/+$/, "");

  switch (type) {
    case "LocalBusiness":
      schemaData = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "GeneralContractor", "ArchitecturalService"],
        "@id": `${baseUrl}/#localbusiness`,
        name: siteConfig.name,
        alternateName: siteConfig.nameTa,
        legalName: siteConfig.legalName,
        url: baseUrl,
        logo: `${baseUrl}/favicon.ico`,
        image: `${baseUrl}${siteConfig.ogImage}`,
        description: siteConfig.description,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        priceRange: siteConfig.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        areaServed: siteConfig.serviceAreas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        sameAs: Object.values(siteConfig.social),
        ...data,
      };
      break;

    case "Organization":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.nameTa,
        legalName: siteConfig.legalName,
        url: baseUrl,
        logo: `${baseUrl}/favicon.ico`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            contactType: siteConfig.contact.contactType,
            email: siteConfig.contact.email,
            availableLanguage: ["English", "Tamil"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        sameAs: Object.values(siteConfig.social),
        ...data,
      };
      break;

    case "WebSite":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteConfig.name,
        alternateName: siteConfig.nameTa,
        description: siteConfig.description,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/projects?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        ...data,
      };
      break;

    case "FAQPage":
      if (Array.isArray(data)) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.map((faq: FAQItem) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        };
      } else {
        schemaData = data;
      }
      break;

    case "Service":
      if (Array.isArray(data)) {
        schemaData = data.map((svc: ServiceItem) => ({
          "@context": "https://schema.org",
          "@type": "Service",
          name: svc.name,
          description: svc.description,
          provider: {
            "@type": "LocalBusiness",
            name: svc.providerName || siteConfig.name,
            url: baseUrl,
          },
          serviceType: svc.serviceType || "Construction & Architecture",
          areaServed: siteConfig.serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
          })),
          url: svc.url || `${baseUrl}/services`,
        }));
      } else {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Service",
          provider: {
            "@type": "LocalBusiness",
            name: siteConfig.name,
            url: baseUrl,
          },
          areaServed: siteConfig.serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
          })),
          ...data,
        };
      }
      break;

    case "CreativeWork":
      schemaData = {
        "@context": "https://schema.org",
        "@type": ["CreativeWork", "RealEstateListing"],
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url: baseUrl,
        },
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        ...data,
      };
      break;

    default:
      schemaData = data;
      break;
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

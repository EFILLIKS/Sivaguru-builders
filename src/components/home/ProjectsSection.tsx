"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/lib/repositories/projects";
import { Project } from "@/types/admin";
import { Maximize2, X } from "lucide-react";

interface ProjectsSectionContentProps {
  hideViewAll?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const filterCategories = [
  { id: "all", labelEn: "All", labelTa: "அனைத்தும்" },
  { id: "Residential", labelEn: "Residential", labelTa: "குடியிருப்பு" },
  { id: "Architecture", labelEn: "Architecture", labelTa: "கட்டிடக்கலை" },
  { id: "Commercial", labelEn: "Commercial", labelTa: "வணிகம்" },
  { id: "Interior Design", labelEn: "Interior Design", labelTa: "உள் வடிவமைப்பு" },
  { id: "Reconstruct", labelEn: "Reconstruct", labelTa: "மறுசீரமைப்பு" },
];

function ProjectCardItem({ project }: { project: Project }) {
  const [imgSrc, setImgSrc] = useState(project.coverImage || "/images/house-image.jpg");

  useEffect(() => {
    setImgSrc(project.coverImage || "/images/house-image.jpg");
  }, [project.coverImage]);

  return (
    <motion.div 
      variants={cardVariants}
      className="flex flex-col items-start p-[10px] gap-5 bg-white rounded-[20px] shadow-sm w-full group hover:shadow-md transition-all"
    >
      {/* Image Box */}
      <div className="flex flex-col items-end p-5 w-full h-[314px] bg-[#D9D9D9] rounded-[12.5px] relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/images/house-image.jpg")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="flex flex-row justify-center items-center px-[10px] py-[10px] bg-white/90 backdrop-blur-xs rounded-[7px] shadow-sm z-10 h-[35px]">
          <span className="text-[#F47920] font-medium text-[11.64px] leading-[15px]">
            <span className="lang-en">{project.category}</span>
            <span className="lang-ta">{project.categoryTa || project.category}</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-start gap-[10px] w-full">
        {/* Project Name */}
        <h3 className="text-[22px] font-bold leading-[28px] uppercase text-black w-full line-clamp-1">
          <span className="lang-en">{project.name}</span>
          <span className="lang-ta">{project.nameTa || project.name}</span>
        </h3>

        {/* Sub-badges (Location, Area, Year) */}
        <div className="flex flex-row items-start gap-[8px] flex-wrap">
          {project.location && (
            <div className="flex flex-row justify-center items-center px-[10px] py-[5px] h-[25px] bg-[#F47920]/20 rounded-[12.5px]">
              <span className="text-[#F47920] text-[12px] leading-[15px]">
                <span className="lang-en">{project.location}</span>
                <span className="lang-ta">{project.locationTa || project.location}</span>
              </span>
            </div>
          )}
          {(project.area || project.areaTa) && (
            <div className="flex flex-row justify-center items-center px-[10px] py-[5px] h-[25px] bg-[#F47920]/20 rounded-[12.5px]">
              <span className="text-[#F47920] text-[12px] leading-[15px]">
                <span className="lang-en">{project.area}</span>
                <span className="lang-ta">{project.areaTa || project.area}</span>
              </span>
            </div>
          )}
          {project.year && (
            <div className="flex flex-row justify-center items-center px-[10px] py-[5px] h-[25px] bg-[#F47920]/20 rounded-[12.5px]">
              <span className="text-[#F47920] text-[12px] leading-[15px]">{project.year}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[14px] leading-[20px] text-black/60 w-full min-h-[40px] line-clamp-2">
          <span className="lang-en">{project.shortDescription || project.projectOverview || "Transforming spaces with custom cabinetry, ergonomic layouts, modular kitchens, and ambient lighting tailored to your lifestyle."}</span>
          <span className="lang-ta">{project.shortDescriptionTa || project.projectOverviewTa || "உங்கள் வாழ்க்கை முறைக்கேற்ப தனிப்பயனாக்கப்பட்ட அலமாரிகள், மாடுலர் சமையலறைகள் மற்றும் சூடான விளக்குகளுடன் உங்கள் இடங்களை மாற்றியமைக்கிறோம்."}</span>
        </p>
      </div>

      {/* View Project Button */}
      <Link href={`/projects/${project.slug || project.id}`} className="w-full mt-auto">
        <Button theme="light" className="w-full justify-center">
          <span className="lang-en">View Project</span>
          <span className="lang-ta">திட்டத்தைப் பார்க்க</span>
        </Button>
      </Link>
    </motion.div>
  );
}

{/* Pinterest-Style Masonry Grid Component for Interior Design */}
function InteriorPinterestGrid({ projects }: { projects: Project[] }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Collect all unique photos from all interior design records
  const photos = projects.flatMap((item) => {
    const rawList = [item.coverImage, ...(item.galleryImages || [])].filter((url) => Boolean(url) && typeof url === "string" && url.trim().length > 0);
    const uniqueUrls = Array.from(new Set(rawList));
    return uniqueUrls.map((url, idx) => ({
      id: `${item.id}-${idx}`,
      url,
      title: item.name,
      titleTa: item.nameTa,
      location: item.location,
    }));
  });

  if (photos.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 font-medium w-full">
        <span className="lang-en">No interior design photos uploaded yet. Upload images in Admin Panel to showcase here!</span>
        <span className="lang-ta">உள் வடிவமைப்பு புகைப்படங்கள் எதுவும் பதிவேற்றப்படவில்லை.</span>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 w-full max-w-[1400px] mb-10">
        {photos.map((photo, index) => {
          // Staggered heights for Pinterest aesthetic
          const heights = ["h-[270px]", "h-[380px]", "h-[310px]", "h-[420px]", "h-[290px]", "h-[360px]"];
          const heightClass = heights[index % heights.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setLightboxImg(photo.url)}
              className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group break-inside-avoid border border-gray-100 bg-gray-100`}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Fullscreen Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs text-[#F47920] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={lightboxImg}
              alt="Interior Showcase"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

function normalizeCategory(catStr: string | null): string {
  if (!catStr || catStr === "all") return "all";
  const lower = catStr.toLowerCase();
  if (lower.includes("interior")) return "Interior Design";
  if (lower.includes("residential")) return "Residential";
  if (lower.includes("commercial")) return "Commercial";
  if (lower.includes("architect")) return "Architecture";
  if (lower.includes("reconstruct")) return "Reconstruct";

  const match = filterCategories.find((c) => c.id.toLowerCase() === lower);
  return match ? match.id : catStr;
}

function ProjectsSectionContent({ hideViewAll }: ProjectsSectionContentProps) {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlCategory = searchParams ? searchParams.get("category") : null;
  const [activeCategory, setActiveCategory] = useState<string>(normalizeCategory(urlCategory));

  useEffect(() => {
    const normalized = normalizeCategory(urlCategory);
    setActiveCategory(normalized);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProjects = () => {
      getProjects({
        status: "Published",
        category: activeCategory !== "all" ? activeCategory : undefined,
      })
        .then((data) => {
          setProjectsList(data);
        })
        .finally(() => setIsLoading(false));
    };

    fetchProjects();

    if (typeof window !== "undefined") {
      window.addEventListener("projects_updated", fetchProjects);
      return () => window.removeEventListener("projects_updated", fetchProjects);
    }
  }, [activeCategory]);

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    if (catId === "all") {
      router.push("/projects", { scroll: false });
    } else {
      router.push(`/projects?category=${encodeURIComponent(catId)}`, { scroll: false });
    }
  };

  const isInteriorCategory = activeCategory.toLowerCase().includes("interior");

  return (
    <section id="projects" className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[100px] px-5 pb-5 z-10">
      {/* Header Container */}
      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1400px] mb-3">
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px]">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33 3.12V5.70667C7.33 5.92085 7.2877 6.13292 7.20554 6.33071C7.12338 6.5285 7.00296 6.70812 6.8512 6.85926C6.69945 7.01039 6.51934 7.13008 6.32121 7.21143C6.12308 7.29278 5.91084 7.33421 5.69666 7.33333H3.12333C2.90973 7.33463 2.69807 7.29278 2.50103 7.2103C2.304 7.12782 2.12564 7.00641 1.97666 6.85333C1.82541 6.70334 1.70563 6.52464 1.62435 6.32774C1.54307 6.13084 1.50192 5.91968 1.50333 5.70667V3.12667C1.50333 2.6964 1.67379 2.28366 1.97741 1.97879C2.28103 1.67392 2.69307 1.50176 3.12333 1.5H5.70333C5.91671 1.50021 6.12792 1.54274 6.32475 1.62513C6.52158 1.70752 6.7001 1.82814 6.85 1.98C7.00166 2.12866 7.12221 2.30602 7.20462 2.50174C7.28703 2.69746 7.32965 2.90763 7.33 3.12ZM14.4967 3.12667V5.70667C14.4932 6.13587 14.3216 6.5466 14.0188 6.85073C13.7159 7.15485 13.3058 7.32811 12.8767 7.33333H10.29C9.8588 7.33069 9.4454 7.16104 9.13666 6.86C8.9858 6.70833 8.86634 6.52838 8.78512 6.33048C8.7039 6.13257 8.66251 5.92059 8.66333 5.70667V3.12667C8.66279 2.91318 8.70498 2.70174 8.78742 2.50481C8.86986 2.30788 8.99087 2.12944 9.14333 1.98C9.29322 1.82814 9.47175 1.70752 9.66858 1.62513C9.86541 1.54274 10.0766 1.50021 10.29 1.5H12.87C13.3003 1.50348 13.7121 1.67598 14.0164 1.98029C14.3207 2.2846 14.4932 2.69633 14.4967 3.12667ZM14.4967 10.2933V12.8733C14.4932 13.3025 14.3216 13.7133 14.0188 14.0174C13.7159 14.3215 13.3058 14.4948 12.8767 14.5H10.29C9.85605 14.5044 9.4375 14.3394 9.12333 14.04C8.97187 13.8888 8.85202 13.7089 8.77076 13.5109C8.6895 13.3129 8.64845 13.1007 8.65 12.8867V10.3067C8.64946 10.0932 8.69165 9.88174 8.77409 9.68481C8.85652 9.48788 8.99754 9.30944 9.13 9.16C9.27989 9.00814 9.45842 8.88752 9.65525 8.80513C9.85207 8.72274 10.0633 8.68021 10.2767 8.68H12.8567C13.287 8.68349 13.6987 8.85598 14.003 9.16029C14.3073 9.4646 14.4798 9.87633 14.4833 10.3067L14.4967 10.2933ZM7.33 10.3V12.88C7.32475 13.3103 7.15057 13.7214 6.84501 14.0244C6.53946 14.3275 6.12702 14.4983 5.69666 14.5H3.12333C2.91034 14.5009 2.69929 14.4596 2.50234 14.3785C2.3054 14.2974 2.12646 14.1781 1.97585 14.0275C1.82524 13.8769 1.70595 13.6979 1.62485 13.501C1.54375 13.304 1.50245 13.093 1.50333 12.88V10.3C1.50505 9.86964 1.67586 9.45721 1.97892 9.15165C2.28198 8.8461 2.693 8.67191 3.12333 8.66667H5.70333C6.13547 8.67109 6.54899 8.84319 6.85666 9.14667C7.16073 9.45341 7.33092 9.86809 7.33 10.3Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-normal">
            <span className="lang-en">{isInteriorCategory ? "Interior Gallery" : "Our Projects"}</span>
            <span className="lang-ta">{isInteriorCategory ? "உள் வடிவமைப்பு புகைப்படங்கள்" : "எங்கள் திட்டங்கள்"}</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[24px] sm:text-[28px] md:text-[30px] leading-[32px] sm:leading-[38px] font-medium uppercase text-black w-full max-w-[800px] mx-auto">
          <span className="lang-en">{isInteriorCategory ? "Interior Design Portfolio" : "Projects We Done"}</span>
          <span className="lang-ta">{isInteriorCategory ? "உள் வடிவமைப்பு காட்சியகம்" : "நாங்கள் முடித்த திட்டங்கள்"}</span>
        </h2>
      </div>

      {/* Category Filter Tabs Bar */}
      <div className="w-full max-w-[1400px] overflow-x-auto py-2 mb-6 sm:mb-8 scrollbar-none">
        <div className="flex flex-row items-center justify-start md:justify-center gap-2.5 sm:gap-4 min-w-max px-2">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`h-9 sm:h-10 px-4 sm:px-5 rounded-[20px] flex flex-row justify-center items-center gap-2 font-['Geologica',sans-serif] font-medium text-[14px] sm:text-[16px] leading-[20px] transition-all cursor-pointer border-none shrink-0 ${
                  isActive
                    ? "bg-[#F47920] text-white shadow-xs"
                    : "bg-[#F47920]/10 text-[#F47920] hover:bg-[#F47920]/20"
                }`}
              >
                <span className="lang-en">{cat.labelEn}</span>
                <span className="lang-ta">{cat.labelTa}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER MODE CONDITIONAL: Pinterest Grid for Interior vs Standard Project Cards */}
      {isInteriorCategory ? (
        <InteriorPinterestGrid projects={projectsList} />
      ) : (
        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1400px] mb-10"
        >
          {projectsList.length > 0 ? (
            projectsList.map((project) => (
              <ProjectCardItem key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 font-medium">
              <span className="lang-en">No projects found in this category.</span>
              <span className="lang-ta">இந்த பிரிவில் திட்டங்கள் எதுவும் இல்லை.</span>
            </div>
          )}
        </motion.div>
      )}

      {/* View All Button (Only shown on homepage, hidden on /projects page) */}
      {pathname !== "/projects" && !hideViewAll && (
        <Link href="/projects">
          <Button theme="light" className="px-8">
            <span className="lang-en">View All</span>
            <span className="lang-ta">அனைத்தையும் பார்க்க</span>
          </Button>
        </Link>
      )}
    </section>
  );
}

export default function ProjectsSection({ hideViewAll }: { hideViewAll?: boolean }) {
  return (
    <Suspense fallback={null}>
      <ProjectsSectionContent hideViewAll={hideViewAll} />
    </Suspense>
  );
}

import FooterSection from "@/components/layout/FooterSection";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <FooterSection />
    </div>
  );
}

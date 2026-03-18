import BentoGridEdit from "@/components/Dashboard/BentoGrid/BentoGridEdit";
import PropertyManagement from "@/components/Dashboard/PropertyManagement/PropertyManagement";

interface PageProps {
  params: Promise<{
    cardtitle: string;
    buttonName: string;
  }>;
}

export default async function DynamicDashboardPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cardTitle = resolvedParams?.cardtitle ?? "";
  const buttonName = resolvedParams?.buttonName ?? "";

  const renderContent = () => {
    if (buttonName === "property-management") {
      return <PropertyManagement />;
    }
    
    if (buttonName === "design-settings") {
      return <BentoGridEdit />;
    }
    
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-serif text-gray-400 italic">Coming Soon: {buttonName.replace(/-/g, ' ')}</h2>
      </div>
    );
  };

  return (
     <div className="bg-[#F7F7F7] min-h-screen">     
        {renderContent()}
     </div>
  );
}
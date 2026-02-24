import BentoGridEdit from "@/components/Dashboard/BentoGrid/BentoGridEdit";

interface PageProps {
  params: {
    cardtitle: string;
    buttonName: string;
  };
}

export default function DynamicDashboardPage({ params }: PageProps) {
  const cardTitle = params?.cardtitle ?? "";
  const buttonName = params?.buttonName ?? "";

  return (
     <div className="bg-white">     
        <BentoGridEdit /> 
        </div>
  );
}
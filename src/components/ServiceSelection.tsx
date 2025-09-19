import { ArrowLeft, FileText, Zap, Building, Car, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedWait: string;
  availableSlots: number;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "permits",
    title: "Permits & Licenses",
    description: "Business licenses, construction permits, event permits",
    icon: <FileText className="w-6 h-6" />,
    estimatedWait: "30-45 min",
    availableSlots: 12
  },
  {
    id: "utilities",
    title: "Utilities",
    description: "Water, electricity, gas services and payments",
    icon: <Zap className="w-6 h-6" />,
    estimatedWait: "15-20 min",
    availableSlots: 8
  },
  {
    id: "property",
    title: "Property Services",
    description: "Tax assessments, property registration, certifications",
    icon: <Building className="w-6 h-6" />,
    estimatedWait: "45-60 min",
    availableSlots: 5
  },
  {
    id: "transportation",
    title: "Transportation",
    description: "Parking permits, vehicle registration, road services",
    icon: <Car className="w-6 h-6" />,
    estimatedWait: "20-30 min",
    availableSlots: 15
  },
  {
    id: "social",
    title: "Social Services",
    description: "Family services, senior services, community programs",
    icon: <Users className="w-6 h-6" />,
    estimatedWait: "60-90 min",
    availableSlots: 3
  },
  {
    id: "support",
    title: "General Support",
    description: "Information desk, complaints, general inquiries",
    icon: <Phone className="w-6 h-6" />,
    estimatedWait: "10-15 min",
    availableSlots: 20
  }
];

interface ServiceSelectionProps {
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export default function ServiceSelection({ onBack, onSelectCategory }: ServiceSelectionProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 hover:bg-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Select Service</h1>
            <p className="text-muted-foreground">Choose the type of service you need</p>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="px-6 pb-6">
        <div className="space-y-4">
          {serviceCategories.map((category) => (
            <Card 
              key={category.id} 
              className="bg-gradient-card shadow-card border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">
                      {category.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-muted-foreground">
                      Est. wait: <span className="text-foreground font-medium">{category.estimatedWait}</span>
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.availableSlots > 10 
                      ? 'bg-status-complete/20 text-status-complete' 
                      : category.availableSlots > 5 
                      ? 'bg-status-pending/20 text-status-pending'
                      : 'bg-status-cancelled/20 text-status-cancelled'
                  }`}>
                    {category.availableSlots} slots available
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
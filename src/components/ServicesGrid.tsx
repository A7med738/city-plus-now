import { 
  Building2, 
  Car, 
  FileText, 
  Heart, 
  Home, 
  Landmark, 
  MapPin, 
  Shield, 
  Users, 
  Wrench,
  ArrowLeft,
  Search,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface ServiceCategory {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  services: string[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "permits",
    title: "Permits & Licenses",
    titleAr: "التراخيص والتصاريح",
    description: "Business licenses, building permits, and official documents",
    descriptionAr: "تراخيص الأعمال، تصاريح البناء، والوثائق الرسمية",
    icon: FileText,
    color: "bg-blue-500",
    services: ["Business License", "Building Permit", "Trade License", "Health Certificate"]
  },
  {
    id: "utilities",
    title: "Utilities",
    titleAr: "المرافق العامة",
    description: "Water, electricity, gas, and waste management services",
    descriptionAr: "خدمات المياه والكهرباء والغاز وإدارة النفايات",
    icon: Wrench,
    color: "bg-green-500",
    services: ["Water Bill", "Electricity Bill", "Gas Connection", "Waste Collection"]
  },
  {
    id: "transportation",
    title: "Transportation",
    titleAr: "النقل والمواصلات",
    description: "Public transport, parking, and vehicle services",
    descriptionAr: "النقل العام، مواقف السيارات، وخدمات المركبات",
    icon: Car,
    color: "bg-purple-500",
    services: ["Bus Pass", "Parking Permit", "Vehicle Registration", "Driver License"]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    titleAr: "الرعاية الصحية",
    description: "Medical services, health certificates, and emergency services",
    descriptionAr: "الخدمات الطبية، الشهادات الصحية، وخدمات الطوارئ",
    icon: Heart,
    color: "bg-red-500",
    services: ["Health Certificate", "Medical Report", "Emergency Services", "Vaccination"]
  },
  {
    id: "housing",
    title: "Housing",
    titleAr: "الإسكان",
    description: "Housing applications, property registration, and maintenance",
    descriptionAr: "طلبات الإسكان، تسجيل العقارات، والصيانة",
    icon: Home,
    color: "bg-orange-500",
    services: ["Housing Application", "Property Registration", "Maintenance Request", "Rent Certificate"]
  },
  {
    id: "education",
    title: "Education",
    titleAr: "التعليم",
    description: "School enrollment, certificates, and educational services",
    descriptionAr: "تسجيل المدارس، الشهادات، والخدمات التعليمية",
    icon: Users,
    color: "bg-indigo-500",
    services: ["School Enrollment", "Certificate Request", "Student ID", "Scholarship Application"]
  },
  {
    id: "finance",
    title: "Finance & Taxes",
    titleAr: "المالية والضرائب",
    description: "Tax payments, financial services, and economic support",
    descriptionAr: "دفع الضرائب، الخدمات المالية، والدعم الاقتصادي",
    icon: Landmark,
    color: "bg-yellow-500",
    services: ["Tax Payment", "Financial Aid", "Business Support", "Economic Certificate"]
  },
  {
    id: "safety",
    title: "Safety & Security",
    titleAr: "الأمان والأمن",
    description: "Police services, safety certificates, and emergency response",
    descriptionAr: "خدمات الشرطة، شهادات الأمان، والاستجابة للطوارئ",
    icon: Shield,
    color: "bg-gray-500",
    services: ["Police Report", "Safety Certificate", "Emergency Response", "Security Clearance"]
  },
  {
    id: "tourism",
    title: "Tourism & Culture",
    titleAr: "السياحة والثقافة",
    description: "Tourist services, cultural events, and heritage sites",
    descriptionAr: "الخدمات السياحية، الفعاليات الثقافية، والمواقع التراثية",
    icon: MapPin,
    color: "bg-pink-500",
    services: ["Tourist Guide", "Event Permit", "Heritage Visit", "Cultural Certificate"]
  },
  {
    id: "business",
    title: "Business Support",
    titleAr: "دعم الأعمال",
    description: "Business development, investment, and entrepreneurship",
    descriptionAr: "تطوير الأعمال، الاستثمار، وريادة الأعمال",
    icon: Building2,
    color: "bg-teal-500",
    services: ["Business Plan", "Investment Support", "Startup Registration", "Export License"]
  }
];

interface ServicesGridProps {
  onBack: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export default function ServicesGrid({ onBack, onSelectCategory }: ServicesGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());

  // Animate cards on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      serviceCategories.forEach((category, index) => {
        setTimeout(() => {
          setAnimatedCards(prev => new Set([...prev, category.id]));
        }, index * 100);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredCategories = serviceCategories.filter(category =>
    category.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-primary/10 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                City Services
              </h1>
              <p className="text-muted-foreground">اختر الخدمة التي تحتاجها</p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="ابحث عن الخدمة..."
            className="pl-10 text-right bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 transition-all duration-300"
            dir="rtl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Innovative Services Display */}
      <div className="relative z-10 px-4 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {filteredCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isAnimated = animatedCards.has(category.id);
            const isHovered = hoveredCard === category.id;
            
            return (
              <div
                key={category.id}
                className={`transform transition-all duration-500 ${
                  isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  className={`
                    relative overflow-hidden cursor-pointer group
                    bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm
                    border border-border/50 hover:border-primary/30
                    shadow-lg hover:shadow-2xl hover:shadow-primary/10
                    transition-all duration-500 ease-out
                    ${isHovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}
                    hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5
                  `}
                  onClick={() => onSelectCategory(category.id)}
                  onMouseEnter={() => setHoveredCard(category.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Particles Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                      <div className="absolute bottom-3 left-3 w-1 h-1 bg-accent rounded-full animate-ping delay-300"></div>
                      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-secondary rounded-full animate-ping delay-700"></div>
                    </div>
                  )}

                  <CardHeader className="pb-2 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      {/* Enhanced Icon with Glow Effect */}
                      <div className={`
                        relative w-12 h-12 rounded-lg flex items-center justify-center
                        ${category.color} shadow-lg
                        group-hover:shadow-xl group-hover:shadow-primary/25
                        transition-all duration-500 ease-out
                        ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                      `}>
                        <IconComponent className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Sparkle Effect */}
                        {isHovered && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="w-3 h-3 text-yellow-400 animate-spin" />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <CardTitle className="text-xs font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                          {category.titleAr}
                        </CardTitle>
                        <p className="text-[10px] text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative z-10">
                    {/* Clean minimal design */}
                  </CardContent>

                  {/* Corner Decoration */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لم يتم العثور على خدمات تطابق البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { 
  ArrowLeft, 
  Phone, 
  MapPin,
  Users,
  CheckCircle,
  Star,
  Heart,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthCenter {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  phone: string;
  rating: number;
  distance: string;
  waitTime: string;
  services: string[];
  isOpen: boolean;
  nextAvailableSlot: string;
  queueLength: number;
  image: string;
}

interface ServiceSlot {
  id: string;
  service: string;
  currentQueue: number;
  doctorName: string;
}

interface HealthCenterDetailsProps {
  center: HealthCenter;
  onBack: () => void;
  onBookAppointment: (service: string, timeSlot: string) => void;
}

const mockServiceSlots: ServiceSlot[] = [
  {
    id: "1",
    service: "الطوارئ",
    currentQueue: 3,
    doctorName: "د. أحمد محمد"
  },
  {
    id: "2", 
    service: "الطب العام",
    currentQueue: 7,
    doctorName: "د. فاطمة عبدالله"
  },
  {
    id: "3",
    service: "طب الأطفال", 
    currentQueue: 5,
    doctorName: "د. خالد سعد"
  },
  {
    id: "4",
    service: "أمراض القلب",
    currentQueue: 2,
    doctorName: "د. نورا عبدالرحمن"
  },
  {
    id: "5",
    service: "طب الأسنان",
    currentQueue: 4,
    doctorName: "د. محمد عبدالعزيز"
  }
];

export default function HealthCenterDetails({ center, onBack, onBookAppointment }: HealthCenterDetailsProps) {

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? "bg-green-500" : "bg-red-500";
  };

  const getStatusText = (isOpen: boolean) => {
    return isOpen ? "مفتوح" : "مغلق";
  };


  const handleServiceSelect = (service: string) => {
    onBookAppointment(service, "فوري");
  };


  return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden pb-20" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
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
                <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                تفاصيل المركز
              </h1>
              <p className="text-muted-foreground">معلومات وخدمات المركز الصحي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Center Image and Basic Info */}
      <div className="relative z-10 px-4 mb-6">
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <img 
              src={center.image} 
              alt={center.nameAr}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <Badge className={`${getStatusColor(center.isOpen)} text-white text-sm px-3 py-1`}>
                {getStatusText(center.isOpen)}
              </Badge>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-bold text-lg">{center.rating}</span>
            </div>
          </div>
          
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              {center.nameAr}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 gap-x-reverse">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-foreground font-medium text-sm">{center.addressAr}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 gap-x-reverse">
              <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-foreground font-medium text-sm">{center.phone}</span>
            </div>
            
          </CardContent>
        </Card>
      </div>

      {/* Services and Booking */}
      <div className="relative z-10 px-4 pb-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          الخدمات المتاحة
        </h2>
        
        <div className="space-y-4">
          {mockServiceSlots.map((slot) => (
            <Card key={slot.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Service Title */}
                  <div className="text-center">
                    <h3 className="font-bold text-foreground text-lg">{slot.service}</h3>
                  </div>
                  
                  {/* Doctor Info */}
                  <div className="flex items-center justify-center gap-2 gap-x-reverse">
                    <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">الطبيب:</span>
                    <span className="font-medium text-foreground text-sm">{slot.doctorName}</span>
                  </div>
                  
                  {/* Current Number */}
                  <div className="flex items-center justify-center gap-2 gap-x-reverse">
                    <Users className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">الرقم الحالي:</span>
                    <span className="font-medium text-foreground text-sm">{slot.currentQueue}</span>
                  </div>
                  
                  {/* Your Number */}
                  <div className="flex items-center justify-center gap-2 gap-x-reverse">
                    <Users className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">أنت رقم:</span>
                    <span className="font-bold text-green-600 text-lg">{slot.currentQueue + Math.floor(Math.random() * 5) + 1}</span>
                  </div>
                  
                  {/* Book Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleServiceSelect(slot.service)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      حجز دور
                    </Button>
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

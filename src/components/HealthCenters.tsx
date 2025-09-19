import { 
  ArrowLeft, 
  Phone, 
  Heart,
  Search,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

const mockHealthCenters: HealthCenter[] = [
  {
    id: "1",
    name: "City General Hospital",
    nameAr: "مستشفى المدينة العام",
    address: "123 Health Street, Downtown",
    addressAr: "شارع الصحة 123، وسط المدينة",
    phone: "+966 11 234 5678",
    rating: 4.8,
    distance: "2.3 km",
    waitTime: "15-30 min",
    services: ["الطوارئ", "الطب العام", "طب الأطفال", "أمراض القلب", "طب الأسنان"],
    isOpen: true,
    nextAvailableSlot: "2:30 PM",
    queueLength: 8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "2",
    name: "Al-Noor Medical Center",
    nameAr: "المركز الطبي النور",
    address: "456 Medical Avenue, North District",
    addressAr: "شارع الطب 456، الحي الشمالي",
    phone: "+966 11 345 6789",
    rating: 4.6,
    distance: "1.8 km",
    waitTime: "10-20 min",
    services: ["الطب الأسري", "الأمراض الجلدية", "العظام", "التحاليل الطبية", "طب الأسنان"],
    isOpen: true,
    nextAvailableSlot: "3:15 PM",
    queueLength: 5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "3",
    name: "King Fahd Health Center",
    nameAr: "مركز الملك فهد الصحي",
    address: "789 Wellness Blvd, East Side",
    addressAr: "شارع العافية 789، الجانب الشرقي",
    phone: "+966 11 456 7890",
    rating: 4.9,
    distance: "3.1 km",
    waitTime: "20-40 min",
    services: ["الرعاية المتخصصة", "الجراحة", "الأشعة", "الصيدلية"],
    isOpen: true,
    nextAvailableSlot: "4:00 PM",
    queueLength: 12,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "4",
    name: "Al-Salam Clinic",
    nameAr: "عيادة السلام",
    address: "321 Care Street, West Quarter",
    addressAr: "شارع الرعاية 321، الحي الغربي",
    phone: "+966 11 567 8901",
    rating: 4.4,
    distance: "1.2 km",
    waitTime: "5-15 min",
    services: ["الرعاية الأولية", "التطعيم", "الفحص الصحي", "الاستشارة الطبية", "طب الأسنان"],
    isOpen: true,
    nextAvailableSlot: "1:45 PM",
    queueLength: 3,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "5",
    name: "Modern Health Complex",
    nameAr: "المجمع الصحي الحديث",
    address: "654 Innovation Road, Tech District",
    addressAr: "طريق الابتكار 654، حي التقنية",
    phone: "+966 11 678 9012",
    rating: 4.7,
    distance: "4.2 km",
    waitTime: "25-45 min",
    services: ["التشخيص المتقدم", "الطب عن بُعد", "الصحة النفسية", "التأهيل الطبي"],
    isOpen: true,
    nextAvailableSlot: "5:30 PM",
    queueLength: 15,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: "6",
    name: "Community Health Center",
    nameAr: "مركز صحة المجتمع",
    address: "987 Unity Square, Central Plaza",
    addressAr: "ساحة الوحدة 987، الساحة المركزية",
    phone: "+966 11 789 0123",
    rating: 4.5,
    distance: "2.8 km",
    waitTime: "30-50 min",
    services: ["صحة المجتمع", "الرعاية الوقائية", "التوعية الصحية", "مجموعات الدعم"],
    isOpen: false,
    nextAvailableSlot: "9:00 AM",
    queueLength: 0,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&crop=center"
  }
];

interface HealthCentersProps {
  onBack: () => void;
  onSelectCenter: (centerId: string) => void;
}

export default function HealthCenters({ onBack, onSelectCenter }: HealthCentersProps) {
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");


  // Filter centers based on search query
  const filteredCenters = mockHealthCenters.filter(center => {
    const query = searchQuery.toLowerCase();
    return (
      center.nameAr.toLowerCase().includes(query) ||
      center.name.toLowerCase().includes(query) ||
      center.addressAr.toLowerCase().includes(query) ||
      center.address.toLowerCase().includes(query) ||
      center.phone.includes(searchQuery) ||
      center.services.some(service => 
        service.toLowerCase().includes(query)
      ) ||
      // Search by specific keywords
      (query.includes('طوارئ') && center.services.some(s => s.includes('الطوارئ'))) ||
      (query.includes('أطفال') && center.services.some(s => s.includes('طب الأطفال'))) ||
      (query.includes('قلب') && center.services.some(s => s.includes('أمراض القلب'))) ||
      (query.includes('جلد') && center.services.some(s => s.includes('الأمراض الجلدية'))) ||
      (query.includes('عظام') && center.services.some(s => s.includes('العظام'))) ||
      (query.includes('جراحة') && center.services.some(s => s.includes('الجراحة'))) ||
      (query.includes('أشعة') && center.services.some(s => s.includes('الأشعة'))) ||
      (query.includes('صيدلية') && center.services.some(s => s.includes('الصيدلية'))) ||
      (query.includes('تطعيم') && center.services.some(s => s.includes('التطعيم'))) ||
      (query.includes('تحليل') && center.services.some(s => s.includes('التحاليل'))) ||
      (query.includes('نفسي') && center.services.some(s => s.includes('الصحة النفسية'))) ||
      (query.includes('تأهيل') && center.services.some(s => s.includes('التأهيل'))) ||
      (query.includes('طب عام') && center.services.some(s => s.includes('الطب العام'))) ||
      (query.includes('أسري') && center.services.some(s => s.includes('الطب الأسري'))) ||
      (query.includes('أولية') && center.services.some(s => s.includes('الرعاية الأولية'))) ||
      (query.includes('فحص') && center.services.some(s => s.includes('الفحص'))) ||
      (query.includes('استشارة') && center.services.some(s => s.includes('الاستشارة'))) ||
      (query.includes('تشخيص') && center.services.some(s => s.includes('التشخيص'))) ||
      (query.includes('طب عن بعد') && center.services.some(s => s.includes('الطب عن بُعد'))) ||
      (query.includes('مجتمع') && center.services.some(s => s.includes('صحة المجتمع'))) ||
      (query.includes('وقائية') && center.services.some(s => s.includes('الرعاية الوقائية'))) ||
      (query.includes('توعية') && center.services.some(s => s.includes('التوعية'))) ||
      (query.includes('دعم') && center.services.some(s => s.includes('مجموعات الدعم'))) ||
      (query.includes('أسنان') && center.services.some(s => s.includes('طب الأسنان'))) ||
      (query.includes('أسناني') && center.services.some(s => s.includes('طب الأسنان'))) ||
      (query.includes('فم') && center.services.some(s => s.includes('طب الأسنان'))) ||
      (query.includes('لثة') && center.services.some(s => s.includes('طب الأسنان')))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden" dir="rtl">
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
                المراكز الصحية
              </h1>
              <p className="text-muted-foreground">اختر المركز الصحي المناسب لك</p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="ابحث بالاسم، العنوان، أو الخدمة (مثل: طوارئ، طب الأطفال، أمراض القلب، طب الأسنان)..."
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

      {/* Results Counter */}
      {searchQuery && (
        <div className="relative z-10 px-4 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCenters.length} من {mockHealthCenters.length} مركز صحي
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="text-primary hover:text-primary/80"
            >
              مسح البحث
            </Button>
          </div>
        </div>
      )}

      {/* Health Centers Grid */}
      <div className="relative z-10 px-4 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {filteredCenters.map((center, index) => (
            <Card
              key={center.id}
              className={`
                relative overflow-hidden cursor-pointer group
                bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm
                border border-border/50 hover:border-red-500/30
                shadow-lg hover:shadow-2xl hover:shadow-red-500/10
                transition-all duration-500 ease-out
                ${selectedCenter === center.id ? 'ring-2 ring-red-500/50 scale-[1.02]' : ''}
                hover:bg-gradient-to-br hover:from-red-500/5 hover:to-blue-500/5
              `}
              onClick={() => {
                setSelectedCenter(center.id);
                onSelectCenter(center.id);
              }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Health Center Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={center.image} 
                  alt={center.nameAr}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-red-600 transition-colors duration-300 mb-1">
                  {center.nameAr}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 relative z-10 space-y-4">
                {/* Phone */}
                <div className="flex items-center gap-3 gap-x-reverse">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{center.phone}</span>
                </div>

                {/* Services */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">الخدمات المتاحة:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.services.map((service, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs px-2 py-1">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* Corner Decoration */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCenters.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لم يتم العثور على مراكز صحية تطابق البحث</p>
            <p className="text-sm text-muted-foreground mt-2">جرب البحث بكلمات مختلفة</p>
          </div>
        )}

        {/* No Centers Message */}
        {mockHealthCenters.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد مراكز صحية متاحة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}

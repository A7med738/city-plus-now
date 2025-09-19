import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import MainDashboard from "@/components/MainDashboard";
import BookingConfirmation from "@/components/BookingConfirmation";
import ServicesGrid from "@/components/ServicesGrid";
import HealthCenters from "@/components/HealthCenters";
import HealthCenterDetails from "@/components/HealthCenterDetails";
import MyBookings from "@/components/MyBookings";
import { useToast } from "@/hooks/use-toast";

type AppState = "dashboard" | "services-grid" | "booking-confirmation" | "health-centers" | "health-center-details" | "my-bookings";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-foreground">جاري التحميل...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleBookService = () => {
    setCurrentState("services-grid");
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentState("booking-confirmation");
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: "You'll receive notifications about your queue status.",
    });
    setCurrentState("dashboard");
    setSelectedCategory("");
  };

  const handleViewHealthCenters = () => {
    setCurrentState("health-centers");
  };

  const handleViewBookings = () => {
    setCurrentState("my-bookings");
  };

  const handleSelectHealthCenter = (centerId: string) => {
    // Find the center data from HealthCenters component
    const mockHealthCenters = [
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
    
    const center = mockHealthCenters.find(c => c.id === centerId);
    if (center) {
      setSelectedCenter(center);
      setCurrentState("health-center-details");
    }
  };

  const handleBookAppointment = (service: string, timeSlot: string) => {
    const newBooking = {
      id: Date.now().toString(),
      service: service,
      centerName: selectedCenter?.nameAr || "مركز صحي",
      doctorName: getDoctorNameForService(service),
      timeSlot: timeSlot,
      status: "مؤكد",
      queuePosition: Math.floor(Math.random() * 10) + 1,
      estimatedWait: Math.floor(Math.random() * 30) + 15,
      bookingTime: new Date().toLocaleString('ar-SA')
    };
    
    setBookings(prev => [newBooking, ...prev]);
    
    toast({
      title: "تم حجز الدور بنجاح",
      description: `تم حجز دور ${service} في الساعة ${timeSlot}`,
    });
    setCurrentState("health-centers");
    setSelectedCenter(null);
  };

  const getDoctorNameForService = (service: string) => {
    const doctorMap: { [key: string]: string } = {
      "الطوارئ": "د. أحمد محمد",
      "الطب العام": "د. فاطمة عبدالله",
      "طب الأطفال": "د. خالد سعد",
      "أمراض القلب": "د. نورا عبدالرحمن",
      "طب الأسنان": "د. محمد عبدالعزيز"
    };
    return doctorMap[service] || "د. غير محدد";
  };

  const handleBack = () => {
    if (currentState === "booking-confirmation") {
      setCurrentState("services-grid");
    } else if (currentState === "services-grid") {
      setCurrentState("dashboard");
    } else if (currentState === "health-centers") {
      setCurrentState("services-grid");
    } else if (currentState === "health-center-details") {
      setCurrentState("health-centers");
      setSelectedCenter(null);
    } else if (currentState === "my-bookings") {
      setCurrentState("dashboard");
    }
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case "services-grid":
        return (
          <ServicesGrid 
            onBack={handleBack}
            onSelectCategory={handleSelectCategory}
            onViewHealthCenters={handleViewHealthCenters}
          />
        );
      case "health-centers":
        return (
          <HealthCenters 
            onBack={handleBack}
            onSelectCenter={handleSelectHealthCenter}
          />
        );
      case "health-center-details":
        return (
          <HealthCenterDetails 
            center={selectedCenter}
            onBack={handleBack}
            onBookAppointment={handleBookAppointment}
          />
        );
      case "booking-confirmation":
        return (
          <BookingConfirmation 
            categoryId={selectedCategory}
            onBack={handleBack}
            onConfirmBooking={handleConfirmBooking}
          />
        );
      case "my-bookings":
        return (
          <MyBookings 
            onBack={handleBack}
            bookings={bookings}
          />
        );
      default:
        return (
          <MainDashboard 
            onBookService={handleBookService}
            onViewBookings={handleViewBookings}
            bookings={bookings}
          />
        );
    }
  };

  return renderCurrentView();
};

export default Index;

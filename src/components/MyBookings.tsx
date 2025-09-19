import { 
  ArrowLeft, 
  Calendar,
  Stethoscope,
  User,
  Users,
  Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  serviceType: string;
  serviceName: string;
  currentQueue: number;
  yourNumber: number;
  doctorName: string;
  centerName: string;
  status: string;
  bookingTime: string;
}

interface MyBookingsProps {
  onBack: () => void;
  bookings: Booking[];
}

const mockBookings: Booking[] = [
  {
    id: "1",
    serviceType: "الطوارئ",
    serviceName: "الطوارئ",
    currentQueue: 3,
    yourNumber: 7,
    doctorName: "د. أحمد محمد",
    centerName: "مستشفى المدينة العام",
    status: "مؤكد",
    bookingTime: "اليوم، 10:30 ص"
  },
  {
    id: "2",
    serviceType: "الطب العام",
    serviceName: "الطب العام",
    currentQueue: 5,
    yourNumber: 9,
    doctorName: "د. فاطمة عبدالله",
    centerName: "المركز الطبي النور",
    status: "مؤكد",
    bookingTime: "أمس، 2:15 م"
  },
  {
    id: "3",
    serviceType: "طب الأسنان",
    serviceName: "طب الأسنان",
    currentQueue: 2,
    yourNumber: 6,
    doctorName: "د. محمد عبدالعزيز",
    centerName: "عيادة السلام",
    status: "مؤكد",
    bookingTime: "غداً، 9:00 ص"
  }
];

export default function MyBookings({ onBack, bookings }: MyBookingsProps) {
  // استخدام البيانات الفعلية إذا كانت متوفرة، وإلا استخدام البيانات الوهمية
  const displayBookings = bookings.length > 0 ? bookings : mockBookings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
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
                <Calendar className="w-6 h-6 text-blue-500 animate-pulse" />
                حجوزاتي
              </h1>
              <p className="text-muted-foreground">جميع حجوزاتك النشطة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="relative z-10 px-2 pb-8">
        {displayBookings.length > 0 ? (
          <Card className="bg-gradient-card shadow-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-right p-2 font-bold text-foreground text-xs">نوع الخدمة</th>
                      <th className="text-right p-2 font-bold text-foreground text-xs">اسم الطبيب</th>
                      <th className="text-right p-2 font-bold text-foreground text-xs">الدور الحالي</th>
                      <th className="text-right p-2 font-bold text-foreground text-xs">رقم دورك</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayBookings.map((booking, index) => (
                      <tr key={booking.id} className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                        <td className="p-2">
                          <div className="flex items-center gap-1 gap-x-reverse">
                            <Stethoscope className="w-3 h-3 text-red-500 flex-shrink-0" />
                            <span className="font-medium text-foreground text-xs truncate">{booking.serviceType}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1 gap-x-reverse">
                            <User className="w-3 h-3 text-blue-500 flex-shrink-0" />
                            <span className="text-foreground text-xs truncate">{booking.doctorName}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="w-3 h-3 text-purple-500 flex-shrink-0" />
                            <span className="font-bold text-foreground text-sm">{booking.currentQueue}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-1">
                            <Hash className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="font-bold text-green-600 text-sm">{booking.yourNumber}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">لا توجد حجوزات حالياً</p>
            <p className="text-sm text-muted-foreground mt-2">قم بحجز خدمة جديدة</p>
          </div>
        )}
      </div>
    </div>
  );
}

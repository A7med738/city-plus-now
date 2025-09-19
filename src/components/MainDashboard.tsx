import { Plus, Clock, MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';

interface Service {
  id: string;
  title: string;
  category: string;
  status: "pending" | "progress" | "complete" | "cancelled";
  queuePosition?: number;
  estimatedTime?: string;
  bookingDate: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    title: "Business License Renewal",
    category: "Permits",
    status: "progress",
    queuePosition: 3,
    estimatedTime: "45 min",
    bookingDate: "Today, 10:30 AM"
  },
  {
    id: "2",
    title: "Water Bill Payment",
    category: "Utilities",
    status: "complete",
    bookingDate: "Yesterday, 2:15 PM"
  }
];

interface MainDashboardProps {
  onBookService: () => void;
}

export default function MainDashboard({ onBookService }: MainDashboardProps) {
  const { user, signOut } = useAuth();
  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'pending': return 'bg-status-pending';
      case 'progress': return 'bg-status-progress';
      case 'complete': return 'bg-status-complete';
      case 'cancelled': return 'bg-status-cancelled';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: Service['status']) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'progress': return 'In Progress';
      case 'complete': return 'Complete';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center px-4">
      {/* Large Plus Sign and Arabic Text */}
      <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-md">
        {/* Extra Large Plus Sign for Mobile with Pulse Animation */}
        <div className="relative">
          <Button
            onClick={onBookService}
            size="lg"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-primary hover:bg-gradient-primary shadow-float hover:shadow-float transition-all duration-300 scale-100 hover:scale-105 animate-slow-pulse"
          >
            <Plus className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 text-primary-foreground" />
          </Button>
        </div>
        
        {/* Arabic Text - Smaller for better balance */}
        <div className="text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" dir="rtl">
            احجز أي خدمة دلوقتي !
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
            Book any service now!
          </p>
        </div>
      </div>

      {/* Header - Compact for Mobile */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">خدمات المدينة</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              أهلاً {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground w-8 h-8 sm:w-10 sm:h-10"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats - Compact for Mobile */}
      <div className="absolute bottom-20 left-4 right-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-card shadow-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Bookings</p>
                  <p className="text-lg font-semibold text-foreground">
                    {mockServices.filter(s => s.status === 'progress' || s.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-border">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Next Appointment</p>
                  <p className="text-lg font-semibold text-foreground">45 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { Plus, User, LogOut, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
    title: "Health Certificate",
    category: "Healthcare",
    status: "progress",
    queuePosition: 3,
    estimatedTime: "45 min",
    bookingDate: "Today, 10:30 AM"
  },
  {
    id: "2",
    title: "Medical Report",
    category: "Healthcare",
    status: "complete",
    bookingDate: "Yesterday, 2:15 PM"
  }
];

interface Booking {
  id: string;
  service: string;
  centerName: string;
  doctorName: string;
  timeSlot: string;
  status: string;
  queuePosition: number;
  estimatedWait: number;
  bookingTime: string;
}

interface MainDashboardProps {
  onBookService: () => void;
  onViewBookings: () => void;
  bookings: Booking[];
}

export default function MainDashboard({ onBookService, onViewBookings, bookings }: MainDashboardProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center px-4" dir="rtl">
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
          <div className="flex items-center gap-2 gap-x-reverse">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground w-8 h-8 sm:w-10 sm:h-10"
              onClick={() => navigate('/admin/login')}
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
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

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 shadow-lg">
        <div className="flex items-center justify-center py-4">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-2 px-8 py-3 hover:bg-primary/10 transition-colors"
            onClick={onViewBookings}
          >
            <Calendar className="w-7 h-7 text-primary" />
            <span className="text-sm font-medium text-foreground">حجوزاتي</span>
          </Button>
        </div>
      </div>

    </div>
  );
}
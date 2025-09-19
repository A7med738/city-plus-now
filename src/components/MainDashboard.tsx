import { Plus, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">City Services</h1>
            <p className="text-muted-foreground">Book and manage your appointments</p>
          </div>
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                  <p className="text-xl font-semibold text-foreground">
                    {mockServices.filter(s => s.status === 'progress' || s.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="text-xl font-semibold text-foreground">45 min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services List */}
      <div className="px-6 pb-32">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Services</h2>
        <div className="space-y-4">
          {mockServices.map((service) => (
            <Card key={service.id} className="bg-gradient-card shadow-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base text-foreground">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{service.category}</p>
                  </div>
                  <Badge 
                    className={`${getStatusColor(service.status)} text-primary-foreground`}
                  >
                    {getStatusText(service.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{service.bookingDate}</span>
                  {service.queuePosition && (
                    <div className="flex items-center space-x-2 text-primary">
                      <Clock className="w-4 h-4" />
                      <span>Queue: #{service.queuePosition} • {service.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={onBookService}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-primary hover:bg-gradient-primary shadow-float hover:shadow-float transition-all duration-300 scale-100 hover:scale-105"
        >
          <Plus className="w-8 h-8 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}
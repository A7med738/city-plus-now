import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookingConfirmationProps {
  categoryId: string;
  onBack: () => void;
  onConfirmBooking: () => void;
}

const categoryNames: Record<string, string> = {
  permits: "Permits & Licenses",
  utilities: "Utilities",
  property: "Property Services",
  transportation: "Transportation",
  social: "Social Services",
  support: "General Support"
};

export default function BookingConfirmation({ categoryId, onBack, onConfirmBooking }: BookingConfirmationProps) {
  const categoryName = categoryNames[categoryId] || "Service";
  const currentQueue = Math.floor(Math.random() * 15) + 1;
  const estimatedWait = Math.floor(Math.random() * 45) + 15;
  const nextAvailableSlot = new Date();
  nextAvailableSlot.setMinutes(nextAvailableSlot.getMinutes() + estimatedWait);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

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
            <h1 className="text-2xl font-bold text-foreground">Confirm Booking</h1>
            <p className="text-muted-foreground">Review your appointment details</p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="px-6 pb-6">
        <Card className="bg-gradient-card shadow-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>{categoryName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-foreground font-medium">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Time</p>
                <p className="text-foreground font-medium">{formatTime(nextAvailableSlot)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground font-medium">City Hall - Service Center</p>
                <p className="text-xs text-muted-foreground">123 Main Street, Downtown</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Queue Information */}
        <Card className="bg-gradient-card shadow-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground">Queue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-primary">#{currentQueue}</p>
                <p className="text-sm text-muted-foreground">Your position in queue</p>
              </div>
              <Badge className="bg-status-pending text-primary-foreground">
                ~{estimatedWait} min wait
              </Badge>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                You'll receive notifications when it's almost your turn and when your service is ready.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="bg-gradient-card shadow-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Please arrive 10 minutes before your estimated time</li>
              <li>• Bring valid ID and any required documents</li>
              <li>• You can track your queue status in the app</li>
              <li>• Cancellations must be made at least 30 minutes in advance</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onConfirmBooking}
            className="w-full bg-gradient-primary hover:bg-gradient-primary text-primary-foreground font-semibold py-4 shadow-float"
          >
            Confirm Booking
          </Button>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full border-border hover:bg-secondary"
          >
            Choose Different Service
          </Button>
        </div>
      </div>
    </div>
  );
}
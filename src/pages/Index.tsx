import { useState } from "react";
import MainDashboard from "@/components/MainDashboard";
import ServiceSelection from "@/components/ServiceSelection";
import BookingConfirmation from "@/components/BookingConfirmation";
import { useToast } from "@/hooks/use-toast";

type AppState = "dashboard" | "service-selection" | "booking-confirmation";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();

  const handleBookService = () => {
    setCurrentState("service-selection");
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

  const handleBack = () => {
    if (currentState === "booking-confirmation") {
      setCurrentState("service-selection");
    } else if (currentState === "service-selection") {
      setCurrentState("dashboard");
    }
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case "service-selection":
        return (
          <ServiceSelection 
            onBack={handleBack}
            onSelectCategory={handleSelectCategory}
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
      default:
        return <MainDashboard onBookService={handleBookService} />;
    }
  };

  return renderCurrentView();
};

export default Index;

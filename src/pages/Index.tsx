import { useState } from "react";
import MainDashboard from "@/components/MainDashboard";
import BookingConfirmation from "@/components/BookingConfirmation";
import ServicesGrid from "@/components/ServicesGrid";
import { useToast } from "@/hooks/use-toast";

type AppState = "dashboard" | "services-grid" | "booking-confirmation";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();

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

  const handleBack = () => {
    if (currentState === "booking-confirmation") {
      setCurrentState("services-grid");
    } else if (currentState === "services-grid") {
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

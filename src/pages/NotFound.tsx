import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-trust p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gradient-healthcare flex items-center justify-center mx-auto mb-6">
          <Heart className="h-10 w-10 text-white" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Healthcare Page Not Found</h2>
        <p className="mb-8 text-muted-foreground leading-relaxed">
          The health information you're looking for seems to have taken a different path. 
          Let's get you back to our healthcare assistant.
        </p>
        <Button variant="healthcare" size="lg" asChild>
          <a href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Return to Sensily
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground h-8 w-8 rounded flex items-center justify-center font-bold">IC</div>
          <span className="font-bold text-xl hidden sm:inline-block">InsightCode</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
          <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">Features</Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/login" className="text-foreground/80 hover:text-foreground transition-colors">Login</Link>
          <Button asChild>
            <Link to="/login">Start Free Trial</Link>
          </Button>
        </div>
        
        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background animate-fade-in md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Button asChild className="mt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Start Free Trial
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

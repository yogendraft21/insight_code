import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  className?: string;
}

const PricingCard = ({ 
  name, 
  price, 
  period = "/mo", 
  description, 
  features, 
  popular = false, 
  buttonText = "Get Started", 
  buttonVariant = "default",
  className = ""
}: PricingCardProps) => {
  return (
    <div className={`relative rounded-xl p-6 ${popular ? 'bg-primary/5 border-2 border-primary shadow-md' : 'bg-card border shadow-sm'} ${className}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2 flex items-end justify-center gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground text-sm pb-1">{period}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`flex-shrink-0 h-5 w-5 rounded-full ${feature.included ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'} flex items-center justify-center`}>
              {feature.included ? <Check size={12} /> : <X size={12} />}
            </div>
            <span className={`text-sm ${!feature.included && 'text-muted-foreground'}`}>{feature.text}</span>
          </div>
        ))}
      </div>
      
      <Button 
        variant={buttonVariant} 
        className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}
        asChild
      >
        <Link to="/signup">{buttonText}</Link>
      </Button>
    </div>
  );
};

export default PricingCard;
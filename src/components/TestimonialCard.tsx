import { ReactNode } from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  logo?: ReactNode;
}

const TestimonialCard = ({ quote, author, role, company, avatar, logo }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-primary text-primary" />
        ))}
      </div>
      <p className="text-lg mb-6 italic">{quote}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt={author} className="h-10 w-10 rounded-full" />
          ) : (
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
              {author.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}, {company}</div>
          </div>
        </div>
        {logo && <div>{logo}</div>}
      </div>
    </div>
  );
};

export default TestimonialCard;

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "AI Code Reviews",
      description: "Get detailed code reviews from our AI assistant that works like a senior developer.",
      benefits: [
        "Automated pull request analysis",
        "Code quality suggestions",
        "Performance optimization tips",
        "Security vulnerability detection",
        "Best practices enforcement"
      ]
    },
    {
      title: "Developer Analytics",
      description: "Track developer performance and team productivity with comprehensive analytics.",
      benefits: [
        "Individual developer metrics",
        "Team performance trends",
        "Code quality over time",
        "Review response time tracking",
        "Personalized improvement suggestions"
      ]
    },
    {
      title: "Multi-Repository Support",
      description: "Connect and monitor all your GitHub and GitLab repositories in one place.",
      benefits: [
        "Unlimited repository connections",
        "Organization-level integration",
        "Repository grouping and filtering",
        "Custom review rules per repository",
        "Batch operations across repositories"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Powerful Features for Modern Development Teams
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8">
                InsightCode combines AI-powered code reviews with powerful analytics 
                to help your team ship better code faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/login">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10">
                  <Link to="/dashboard">Live Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features detail section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-16">
              {features.map((feature, index) => (
                <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                    <p className="text-lg text-muted-foreground">{feature.description}</p>
                    <ul className="space-y-2 pt-4">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-6 h-64 md:h-80 flex items-center justify-center">
                    <div className="text-2xl font-medium text-muted-foreground">Feature Illustration {index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-primary/10 py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your code review process?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of developers already using InsightCode to improve their code quality.
              </p>
              <Button size="lg" asChild>
                <Link to="/onboarding">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;

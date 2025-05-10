import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  ChartBar,
  FolderOpen,
  Clock,
  Code,
  ArrowRight,
  Star,
  ArrowUpRight,
  Zap,
  ChevronLeft,
  Github,
  Gitlab,
  Slack,
  Landmark,
  Workflow,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import CodeReviewExample from "@/components/CodeReviewExample";
import PerformanceChart from "@/components/PerformanceChart";
import TestimonialCard from "@/components/TestimonialCard";
import PricingCard from "@/components/PricingCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote:
        "InsightCode has drastically reduced our review bottlenecks and helped our junior developers level up faster. Our team productivity increased by 37% in just 2 months!",
      author: "Sarah Kim",
      role: "CTO",
      company: "Acme Tech",
      avatar:
        "http://www.ag-decor.com/wp-content/uploads/2014/10/Smiling-Man-4.jpg",
      logo: (
        <div className="w-24 h-6 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold">
          Acme Tech
        </div>
      ),
    },
    {
      quote:
        "The insights we get from the dashboard have been eye-opening. We've been able to focus our training efforts exactly where needed and onboard new developers 2x faster.",
      author: "Mark Johnson",
      role: "Engineering Manager",
      company: "Sunrise Software",
      avatar: "https://www.geps.it/wp-content/uploads/2015/07/John_Doe.jpg",
      logo: (
        <div className="w-24 h-6 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold">
          Sunrise
        </div>
      ),
    },
    {
      quote:
        "Our PR review times have decreased by 40% while code quality has actually improved. The ROI is a no-brainer for any serious development team.",
      author: "Alex Rivera",
      role: "VP Engineering",
      company: "CloudScale Inc",
      avatar: "https://www.isme.in/wp-content/uploads/2017/10/user9.jpg",
      logo: (
        <div className="w-24 h-6 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold">
          CloudScale
        </div>
      ),
    },
    {
      quote:
        "InsightCode feels like having a team of senior engineers reviewing your code 24/7. The suggestions are spot-on and have helped us prevent countless bugs.",
      author: "Jessica Chen",
      role: "Lead Developer",
      company: "DevForce",
      avatar:
        "https://www.bllifesciences.com/wp-content/uploads/2022/06/testimonialjpg.jpg",
      logo: (
        <div className="w-24 h-6 bg-primary/10 rounded flex items-center justify-center text-primary font-semibold">
          DevForce
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const integrationLogos = [
    {
      name: "GitHub",
      icon: Github,
      color: "bg-[#24292e]",
      textColor: "text-white",
    },
    {
      name: "GitLab",
      icon: Gitlab,
      color: "bg-[#fc6d26]",
      textColor: "text-white",
    },
    {
      name: "Slack",
      icon: Slack,
      color: "bg-[#4a154b]",
      textColor: "text-white",
    },
    {
      name: "Jira",
      icon: Landmark, 
      color: "bg-[#0052cc]",
      textColor: "text-white",
    },
    {
      name: "Linear",
      icon: Workflow, 
      color: "bg-[#5E6AD2]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section - Revamped with more compelling copy and visual elements */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-primary/5 via-secondary/20 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Zap size={14} className="animate-pulse" />
              <span>10x Faster Code Reviews with AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              Your AI Software Engineer that{" "}
              <span className="text-primary relative">
                never sleeps
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,5 Q40,0 80,5 T160,5 T240,5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mt-4">
              Deploy code 3x faster with AI code reviews that catch bugs{" "}
              <span className="font-semibold">in seconds</span> instead of
              hours. InsightCode delivers senior-level feedback instantly while
              your human engineers focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="group">
                <Link to="/login">
                  Start Free Trial
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mt-6">
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-primary" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-primary" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground mt-2">
                Bug detection accuracy
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">3x</div>
              <div className="text-sm text-muted-foreground mt-2">
                Faster deployment cycles
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">40%</div>
              <div className="text-sm text-muted-foreground mt-2">
                Reduction in technical debt
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur border rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">25hrs</div>
              <div className="text-sm text-muted-foreground mt-2">
                Saved per developer monthly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Logos - Revamped with better styling */}
      <section className="py-12 bg-secondary/30 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium">
              Seamlessly integrates with your workflow
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {integrationLogos.map((logo, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform"
              >
                <div
                  className={`h-12 w-36 ${logo.color} ${logo.textColor} rounded-md flex items-center justify-center gap-2 shadow-md font-medium px-2`}
                >
                  <logo.icon className="h-5 w-5" />
                  <span className="text-sm">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How InsightCode Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI reviews your code like a senior engineer would, providing
              contextual feedback and helping your team grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FolderOpen size={24} />}
              title="Automated PR Reviews"
              description="Get instant, context-aware code reviews on every pull request with AI that understands your codebase."
            />
            <FeatureCard
              icon={<MessageSquare size={24} />}
              title="Actionable Feedback"
              description="Receive specific suggestions for improvements, not just generic comments or style nitpicks."
            />
            <FeatureCard
              icon={<Check size={24} />}
              title="Best Practices"
              description="Enforce coding standards and catch bugs before they make it to production."
            />
            <FeatureCard
              icon={<LayoutDashboard size={24} />}
              title="Developer Dashboard"
              description="Track progress and identify areas for improvement with personalized insights."
            />
            <FeatureCard
              icon={<ChartBar size={24} />}
              title="Team Analytics"
              description="Measure quality metrics and see how your team is improving over time."
            />
            <FeatureCard
              icon={<ChevronRight size={24} />}
              title="CI/CD Integration"
              description="Seamlessly integrate with your existing workflows and development pipelines."
            />
          </div>
        </div>
      </section>

      {/* Code Review Example - Revamped to look more like GitHub PR */}
      <section className="py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how our AI provides senior-level code reviews directly in
              your GitHub pull requests.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* GitHub-style PR UI */}
            <div className="bg-card border shadow-lg rounded-xl overflow-hidden">
              <div className="bg-muted/50 border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Code size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      Update cart calculation logic
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pull request #423 opened by jsmith
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    Review in progress
                  </div>
                </div>
              </div>

              <div className="p-4">
                <CodeReviewExample />
              </div>

              <div className="border-t p-4 bg-success/5">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">AI</span>
                  </div>
                  <div>
                    <div className="font-medium mb-2">
                      InsightCode AI Review Summary
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        This PR improves the cart functionality but has
                        potential performance issues with the loop
                        implementation. I'd recommend using Array.reduce() for
                        better readability and fewer potential bugs.
                      </p>
                      <p className="text-primary font-medium">
                        3 issues found · 1 suggestion offered · Review completed
                        in 12 seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Enhanced with more metrics and visualization */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <ChartBar size={14} />
                <span>Data-Driven Development</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Track Developer & Team Performance
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Get actionable insights into team performance, identify
                patterns, and measure improvement over time with our
                comprehensive analytics dashboard.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Track code quality metrics across projects",
                  "Analyze PR review time and bottlenecks",
                  "Identify knowledge gaps and learning opportunities",
                  "Monitor individual and team progress",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <Check size={14} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <span>View Dashboard Demo</span>
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="space-y-6">
              <div className="bg-card border rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">
                  Developer Performance Trends
                </h3>
                <PerformanceChart />
                <div className="flex gap-6 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Code Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success"></div>
                    <span className="text-sm">Actionable Insights</span>
                  </div>
                </div>
              </div>

              {/* Additional dashboard metrics */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Code Quality Score
                  </h3>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">
                      87
                      <span className="text-sm text-muted-foreground">
                        /100
                      </span>
                    </div>
                    <div className="text-success flex items-center text-sm">
                      <ArrowUpRight size={14} />
                      <span>+12%</span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Tech Debt Reduction
                  </h3>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">
                      40<span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <div className="text-success flex items-center text-sm">
                      <ArrowUpRight size={14} />
                      <span>+5%</span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Revamped as a slider */}
      <section className="py-24 bg-secondary relative">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Star size={14} />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Engineering Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about how InsightCode has
              transformed their development workflow.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className="bg-card border rounded-xl shadow-md p-8">
                      <div className="flex items-center gap-2 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-xl mb-8 italic">{testimonial.quote}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.author}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">
                              {testimonial.author}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </div>
                        </div>
                        <div>{testimonial.logo}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentTestimonial === index ? "bg-primary w-6" : "bg-muted"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                goToTestimonial(
                  (currentTestimonial - 1 + testimonials.length) %
                    testimonials.length
                )
              }
              className="absolute top-1/2 -left-12 -translate-y-1/2 h-10 w-10 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                goToTestimonial((currentTestimonial + 1) % testimonials.length)
              }
              className="absolute top-1/2 -right-12 -translate-y-1/2 h-10 w-10 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing - Enhanced styling */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Check size={14} />
              <span>Simple Pricing</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing that scales with your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-background to-muted rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <PricingCard
                name="Starter"
                price="$49"
                period="/month"
                description="For small teams getting started"
                features={[
                  { text: "Up to 5 developers", included: true },
                  { text: "AI code reviews", included: true },
                  { text: "GitHub integration", included: true },
                  { text: "Basic dashboard", included: true },
                  { text: "Email support", included: true },
                  { text: "Advanced analytics", included: false },
                  { text: "Custom rules", included: false },
                ]}
                buttonVariant="outline"
                className="relative bg-card"
              />
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-background to-muted rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <PricingCard
                name="Professional"
                price="$149"
                period="/month"
                description="For growing development teams"
                popular={true}
                features={[
                  { text: "Up to 15 developers", included: true },
                  { text: "AI code reviews", included: true },
                  { text: "All integrations", included: true },
                  { text: "Advanced dashboard", included: true },
                  { text: "Priority support", included: true },
                  { text: "Advanced analytics", included: true },
                  { text: "Custom rules", included: false },
                ]}
                className="relative"
              />
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-background to-muted rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <PricingCard
                name="Enterprise"
                price="Custom"
                description="For large organizations"
                features={[
                  { text: "Unlimited developers", included: true },
                  { text: "AI code reviews", included: true },
                  { text: "All integrations", included: true },
                  { text: "Advanced dashboard", included: true },
                  { text: "Dedicated support", included: true },
                  { text: "Advanced analytics", included: true },
                  { text: "Custom rules", included: true },
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
                className="relative bg-card"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA - Enhanced with better visuals and copy */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
              <Clock size={14} />
              <span>Stop wasting developer time</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your code quality?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl">
              Join thousands of developers who are shipping better code faster
              with InsightCode. Set up in minutes, see results immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link to="/login" className="group">
                  <span>Start Free Trial</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row gap-8 items-center text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

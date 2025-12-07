import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  FileText, 
  Building2, 
  MessageCircle, 
  Users, 
  TrendingUp,
  BookOpen,
  Sparkles,
  ArrowRight
} from "lucide-react";

const quickLinks = [
  {
    to: "/marketplace",
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Buy & sell notes, books, electronics",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    to: "/notes",
    icon: FileText,
    title: "Notes Repository",
    description: "Access study materials by course",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    to: "/accommodation",
    icon: Building2,
    title: "Accommodation",
    description: "Find PG, flats & roommates",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    to: "/chat",
    icon: MessageCircle,
    title: "Peer Chat",
    description: "Connect with fellow students",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const campusFeed = [
  { type: "event", title: "Hackathon 2024", subtitle: "Registration open until Dec 15" },
  { type: "trending", title: "CS301 Notes Pack", subtitle: "50+ downloads this week" },
  { type: "new", title: "3 new PG listings", subtitle: "Near IIT Campus" },
];

export default function Home() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative mb-12 overflow-hidden rounded-2xl gradient-hero p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Your Campus Companion
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
            Connect. Learn. Thrive.
          </h1>
          <p className="mb-6 text-lg text-primary-foreground/90">
            Everything you need for campus life — peer connections, marketplace, notes sharing, and accommodation finder.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/marketplace">
              <Button variant="accent" size="lg" className="gap-2">
                <ShoppingBag className="h-5 w-5" />
                Browse Marketplace
              </Button>
            </Link>
            <Link to="/notes">
              <Button variant="hero-outline" size="lg" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <BookOpen className="h-5 w-5" />
                Explore Notes
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-background/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Quick Access</h2>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.to} to={link.to}>
                  <Card variant="interactive" className="h-full">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className={`rounded-lg p-3 ${link.bg}`}>
                        <Icon className={`h-6 w-6 ${link.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{link.title}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Stats Section */}
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">2.5k+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">850+</div>
                  <div className="text-sm text-muted-foreground">Notes Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">120+</div>
                  <div className="text-sm text-muted-foreground">Colleges</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Campus Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campusFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${
                    item.type === 'event' ? 'bg-primary' : 
                    item.type === 'trending' ? 'bg-accent' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6 text-center">
              <Users className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h4 className="font-semibold mb-2">Join the Community</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with peers from your college and beyond.
              </p>
              <Link to="/profile">
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
}

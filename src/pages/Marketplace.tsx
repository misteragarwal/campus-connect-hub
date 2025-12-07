import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import { Search, Filter, Tag, MessageCircle, Heart, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Listing {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  seller: string;
  college: string;
  image?: string;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Engineering Mathematics Textbook",
    price: "₹350",
    description: "Like new condition, all chapters included. Perfect for 1st year students.",
    category: "Books",
    seller: "Rahul S.",
    college: "IIT Delhi",
  },
  {
    id: "2",
    title: "Scientific Calculator (Casio FX-991)",
    price: "₹800",
    description: "Barely used, comes with original case. Great for exams.",
    category: "Electronics",
    seller: "Priya M.",
    college: "DTU",
  },
  {
    id: "3",
    title: "Data Structures Notes Bundle",
    price: "₹150",
    description: "Handwritten notes covering all topics. Helped me score 9+ CGPA.",
    category: "Notes",
    seller: "Amit K.",
    college: "BITS Pilani",
  },
  {
    id: "4",
    title: "Study Lamp with USB Charging",
    price: "₹450",
    description: "LED lamp with adjustable brightness. Perfect for late night study sessions.",
    category: "Electronics",
    seller: "Sneha R.",
    college: "IIT Bombay",
  },
];

const categories = ["All", "Books", "Notes", "Electronics", "Clothing", "Other"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase()) ||
                         listing.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || listing.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Marketplace</h1>
        <p className="text-muted-foreground">
          Buy and sell books, notes, electronics, and more from verified students.
        </p>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id} variant="interactive">
            {/* Placeholder Image */}
            <div className="h-48 bg-secondary rounded-t-xl flex items-center justify-center">
              <Tag className="h-12 w-12 text-muted-foreground/30" />
            </div>
            
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {listing.category}
                  </Badge>
                  <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                </div>
                <span className="text-lg font-bold text-primary">{listing.price}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {listing.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{listing.seller}</span>
                <span>{listing.college}</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="default" className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Seller
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <Search className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Add Listing CTA */}
      <Card variant="elevated" className="mt-8">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Have something to sell?</h3>
          <p className="text-muted-foreground mb-4">
            List your items and reach thousands of students on campus.
          </p>
          <Button variant="hero">Create Listing</Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

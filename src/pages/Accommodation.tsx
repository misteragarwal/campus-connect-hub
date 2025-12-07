import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import { Search, MapPin, Users, Wifi, Car, Home, IndianRupee, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Accommodation {
  id: string;
  title: string;
  location: string;
  rent: string;
  type: string;
  amenities: string[];
  details: string;
  postedBy: string;
  distance: string;
}

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    title: "Spacious 2BHK Near IIT Gate",
    location: "Hauz Khas, Delhi",
    rent: "₹18,000/month",
    type: "Flat",
    amenities: ["WiFi", "Parking", "Furnished"],
    details: "Fully furnished flat with AC in both rooms. Looking for 1 roommate. Girls preferred.",
    postedBy: "Neha G.",
    distance: "500m from campus",
  },
  {
    id: "2",
    title: "PG with Meals Included",
    location: "Munirka, Delhi",
    rent: "₹12,000/month",
    type: "PG",
    amenities: ["WiFi", "Meals", "Laundry"],
    details: "Single occupancy room available. 3 meals included. AC and geyser in room.",
    postedBy: "Krishna PG",
    distance: "1.2km from campus",
  },
  {
    id: "3",
    title: "Looking for Flatmate - 3BHK",
    location: "Powai, Mumbai",
    rent: "₹15,000/month",
    type: "Shared",
    amenities: ["WiFi", "Gym", "Parking"],
    details: "One room available in 3BHK. Society has gym and pool. Near metro station.",
    postedBy: "Arjun M.",
    distance: "2km from campus",
  },
  {
    id: "4",
    title: "Studio Apartment - Perfect for Students",
    location: "Pilani, Rajasthan",
    rent: "₹8,000/month",
    type: "Flat",
    amenities: ["WiFi", "Furnished"],
    details: "Compact studio apartment ideal for single occupancy. Quiet neighborhood.",
    postedBy: "Sharma Properties",
    distance: "800m from campus",
  },
];

const types = ["All", "PG", "Flat", "Shared", "Hostel"];

export default function Accommodation() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const filteredAccommodations = mockAccommodations.filter((acc) => {
    const matchesSearch = acc.title.toLowerCase().includes(search.toLowerCase()) ||
                         acc.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === "All" || acc.type === activeType;
    return matchesSearch && matchesType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="h-3 w-3" />;
      case "parking": return <Car className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Accommodation</h1>
        <p className="text-muted-foreground">
          Discover PGs, flats, and find roommates near your campus.
        </p>
      </div>

      {/* Search */}
      <Card variant="elevated" className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by location or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={activeType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredAccommodations.map((acc) => (
          <Card key={acc.id} variant="interactive">
            {/* Map Placeholder */}
            <div className="h-40 bg-secondary rounded-t-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                <span className="text-xs text-muted-foreground">{acc.distance}</span>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {acc.type}
                  </Badge>
                  <h3 className="font-semibold">{acc.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">{acc.rent}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                {acc.location}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {acc.details}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {acc.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="gap-1">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Posted by {acc.postedBy}
                </span>
                <Button className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAccommodations.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <Home className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No listings found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Post Listing CTA */}
      <Card variant="elevated" className="mt-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Have a Room to Rent?</h3>
            <p className="text-muted-foreground">
              List your PG, flat, or find a roommate through our platform.
            </p>
          </div>
          <Button variant="hero" className="gap-2 whitespace-nowrap">
            <Home className="h-4 w-4" />
            Post Listing
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

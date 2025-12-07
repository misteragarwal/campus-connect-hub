import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building, 
  Edit, 
  Settings, 
  LogOut,
  ShoppingBag,
  FileText,
  MessageCircle,
  Star
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockUser = {
  name: "Arjun Mehta",
  email: "arjun.mehta@iitd.ac.in",
  college: "IIT Delhi",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  bio: "Passionate about AI/ML and open source. Always looking to connect with fellow tech enthusiasts!",
  stats: {
    listings: 5,
    notes: 12,
    connections: 48,
  },
  badges: ["Top Contributor", "Verified Student"],
};

const activities = [
  { type: "note", title: "Uploaded 'OS Complete Notes'", time: "2 days ago" },
  { type: "listing", title: "Listed 'Casio Calculator'", time: "1 week ago" },
  { type: "chat", title: "Connected with Priya P.", time: "1 week ago" },
];

export default function Profile() {
  return (
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {mockUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                      <p className="text-muted-foreground">{mockUser.email}</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mockUser.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="gap-1">
                        <Star className="h-3 w-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{mockUser.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">College</label>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.college}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Course</label>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.course}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Year</label>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{mockUser.year}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{mockUser.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`rounded-lg p-2 ${
                      activity.type === 'note' ? 'bg-primary/10' : 
                      activity.type === 'listing' ? 'bg-accent/10' : 'bg-secondary'
                    }`}>
                      {activity.type === 'note' && <FileText className="h-4 w-4 text-primary" />}
                      {activity.type === 'listing' && <ShoppingBag className="h-4 w-4 text-accent" />}
                      {activity.type === 'chat' && <MessageCircle className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Stats Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{mockUser.stats.listings}</div>
                  <div className="text-xs text-muted-foreground">Listings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{mockUser.stats.notes}</div>
                  <div className="text-xs text-muted-foreground">Notes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{mockUser.stats.connections}</div>
                  <div className="text-xs text-muted-foreground">Peers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3">
                <ShoppingBag className="h-4 w-4" />
                My Listings
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <FileText className="h-4 w-4" />
                My Notes
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>

          {/* Verification Card */}
          <Card variant="glass">
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Verified Student</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Your college email has been verified
              </p>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                ✓ IIT Delhi
              </Badge>
            </CardContent>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
}

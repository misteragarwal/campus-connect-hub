import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import { Search, Download, Eye, Upload, BookOpen, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Note {
  id: string;
  title: string;
  course: string;
  semester: string;
  uploaderName: string;
  college: string;
  downloads: number;
  rating: number;
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Complete Data Structures Notes",
    course: "CS201",
    semester: "3rd Sem",
    uploaderName: "Ankit Sharma",
    college: "IIT Delhi",
    downloads: 234,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Digital Electronics Handwritten",
    course: "EC301",
    semester: "5th Sem",
    uploaderName: "Priya Patel",
    college: "NIT Trichy",
    downloads: 156,
    rating: 4.5,
  },
  {
    id: "3",
    title: "Operating Systems - Complete Guide",
    course: "CS302",
    semester: "5th Sem",
    uploaderName: "Rohit Kumar",
    college: "BITS Pilani",
    downloads: 312,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Thermodynamics Solved Problems",
    course: "ME201",
    semester: "3rd Sem",
    uploaderName: "Kavita Singh",
    college: "IIT Bombay",
    downloads: 89,
    rating: 4.3,
  },
  {
    id: "5",
    title: "Machine Learning Fundamentals",
    course: "CS401",
    semester: "7th Sem",
    uploaderName: "Vikram Reddy",
    college: "IIIT Hyderabad",
    downloads: 445,
    rating: 4.7,
  },
];

const semesters = ["All", "1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"];

export default function Notes() {
  const [search, setSearch] = useState("");
  const [activeSemester, setActiveSemester] = useState("All");

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                         note.course.toLowerCase().includes(search.toLowerCase());
    const matchesSemester = activeSemester === "All" || note.semester === activeSemester;
    return matchesSearch && matchesSemester;
  });

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notes Repository</h1>
        <p className="text-muted-foreground">
          Access and share study materials by college, course, and semester.
        </p>
      </div>

      {/* Search */}
      <Card variant="elevated" className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes by title or course code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {semesters.slice(0, 5).map((sem) => (
                <Button
                  key={sem}
                  variant={activeSemester === sem ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSemester(sem)}
                >
                  {sem}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} variant="interactive">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold">{note.title}</h3>
                      <Badge variant="secondary">{note.course}</Badge>
                      <Badge variant="outline">{note.semester}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>by {note.uploaderName}</span>
                      <span>•</span>
                      <span>{note.college}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {note.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {note.downloads}
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card variant="glass" className="text-center py-12">
          <CardContent>
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or semester filter.</p>
          </CardContent>
        </Card>
      )}

      {/* Upload CTA */}
      <Card variant="elevated" className="mt-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Share Your Knowledge</h3>
            <p className="text-muted-foreground">
              Help fellow students by uploading your notes and study materials.
            </p>
          </div>
          <Button variant="hero" className="gap-2 whitespace-nowrap">
            <Upload className="h-4 w-4" />
            Upload Notes
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

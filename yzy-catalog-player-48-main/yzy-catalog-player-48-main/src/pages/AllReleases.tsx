import { useState, useEffect } from "react";
import { Music, Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Release {
  id: string;
  title: string;
  type: "album" | "ep" | "single";
  year: number;
  artwork: string;
}

function ReleaseRow({ release }: { release: any }) {
  return (
    <div className="card-yzy p-4 flex items-center gap-4 group cursor-pointer">
      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
        <Music className="h-6 w-6 text-muted-foreground" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="yzy" size="sm" className="rounded-full w-8 h-8">
            <Play className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{release.title}</h3>
        <p className="text-xs text-muted-foreground">{release.type} • {release.year}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 bg-muted rounded-full">
          {release.type}
        </span>
      </div>
    </div>
  );
}

export default function AllReleases() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    const savedReleases = localStorage.getItem('yzy-releases');
    if (savedReleases) {
      setReleases(JSON.parse(savedReleases));
    }
  }, []);

  const filteredReleases = releases.filter(release => 
    filter === "all" || release.type.toLowerCase() === filter
  );

  const sortedReleases = [...filteredReleases].sort((a, b) => {
    if (sort === "newest") return b.year - a.year;
    if (sort === "oldest") return a.year - b.year;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="space-y-4">
        <h1 className="text-3xl font-black tracking-wider text-foreground">
          All Releases
        </h1>
        
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="album">Albums</SelectItem>
              <SelectItem value="ep">EPs</SelectItem>
              <SelectItem value="single">Singles</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="space-y-3">
        {sortedReleases.length > 0 ? (
          sortedReleases.map((release) => (
            <ReleaseRow key={release.id} release={release} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {releases.length === 0 ? "No releases yet. Add some in the Admin Panel!" : "No releases match your filter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
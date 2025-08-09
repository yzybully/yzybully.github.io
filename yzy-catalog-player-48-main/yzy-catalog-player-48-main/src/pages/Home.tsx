import { Play, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

interface Release {
  id: string;
  title: string;
  type: "album" | "ep" | "single";
  year: number;
  artwork: string;
}

function ReleaseCard({ release }: { release: any }) {
  return (
    <div className="card-yzy p-4 group cursor-pointer">
      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
        <Music className="h-12 w-12 text-muted-foreground" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="yzy" size="sm" className="rounded-full w-12 h-12">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <h3 className="font-semibold text-sm truncate">{release.title}</h3>
      <p className="text-xs text-muted-foreground">{release.type} • {release.year}</p>
    </div>
  );
}

function ReleaseSection({ title, releases }: { title: string; releases: any[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    const savedReleases = localStorage.getItem('yzy-releases');
    if (savedReleases) {
      setReleases(JSON.parse(savedReleases));
    }
  }, []);

  const albums = releases.filter(r => r.type === 'album');
  const eps = releases.filter(r => r.type === 'ep');
  const singles = releases.filter(r => r.type === 'single');

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-wider text-foreground">
          Welcome to YZYPlayer
        </h1>
        <p className="text-muted-foreground">
          Your personal music collection
        </p>
      </header>

      {albums.length > 0 && <ReleaseSection title="Albums" releases={albums} />}
      {eps.length > 0 && <ReleaseSection title="EPs" releases={eps} />}
      {singles.length > 0 && <ReleaseSection title="Singles" releases={singles} />}
      
      {releases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No releases yet. Add some in the Admin Panel!</p>
        </div>
      )}
    </div>
  );
}
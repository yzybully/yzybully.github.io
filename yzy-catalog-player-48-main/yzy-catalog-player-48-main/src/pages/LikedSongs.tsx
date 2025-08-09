import { Heart, Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

// Remove mock data - liked songs will come from localStorage when implemented

function SongRow({ song }: { song: any }) {
  return (
    <div className="card-yzy p-4 flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
        <Music className="h-5 w-5 text-muted-foreground" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="yzy" size="sm" className="rounded-full w-8 h-8">
            <Play className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{song.title}</h3>
        <p className="text-xs text-muted-foreground">{song.album}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">{song.duration}</span>
        <Button variant="ghost-yzy" size="sm">
          <Heart className="h-4 w-4 fill-primary text-primary" />
        </Button>
      </div>
    </div>
  );
}

export default function LikedSongs() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-wider text-foreground">
          Liked Songs
        </h1>
        <p className="text-muted-foreground">
          Feature coming soon
        </p>
      </header>

      <div className="card-yzy p-8 text-center">
        <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Liked Songs Feature</h3>
        <p className="text-muted-foreground text-sm">
          This feature will be available when tracks are implemented with the music player
        </p>
      </div>
    </div>
  );
}
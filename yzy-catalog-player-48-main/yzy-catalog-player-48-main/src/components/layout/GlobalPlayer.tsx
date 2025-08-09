import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function GlobalPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([75]);

  return (
    <div className="h-20 bg-card border-t border-border/50 px-6 flex items-center justify-between">
      {/* Track Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-14 h-14 bg-muted rounded-lg flex-shrink-0"></div>
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">No track selected</p>
          <p className="text-xs text-muted-foreground truncate">Select a release to start playing</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-4 mx-8">
        <Button variant="ghost-yzy" size="sm">
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          variant="yzy"
          size="sm"
          className="w-10 h-10 rounded-full"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
        
        <Button variant="ghost-yzy" size="sm">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress & Volume */}
      <div className="flex items-center gap-4 min-w-0 flex-1 justify-end">
        <div className="flex items-center gap-2 w-32">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
        
        <div className="flex items-center gap-2 w-24">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
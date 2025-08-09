import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: string;
  name: string;
  mp3Url: string;
}

interface Release {
  id: string;
  title: string;
  artist: string;
  type: "album" | "ep" | "single";
  year: number;
  artwork: string;
  tracks: Track[];
}

interface NewRelease {
  title: string;
  artist: string;
  type: "album" | "ep" | "single";
  year: string;
  artwork: string;
}

export default function AdminPanel() {
  const { toast } = useToast();
  const [releases, setReleases] = useState<Release[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const [newRelease, setNewRelease] = useState<NewRelease>({
    title: "",
    artist: "",
    type: "album",
    year: new Date().getFullYear().toString(),
    artwork: ""
  });
  const [newTracks, setNewTracks] = useState<Track[]>([]);

  useEffect(() => {
    const savedReleases = localStorage.getItem('yzy-releases');
    if (savedReleases) {
      setReleases(JSON.parse(savedReleases));
    }
  }, []);

  const saveReleases = (updatedReleases: Release[]) => {
    localStorage.setItem('yzy-releases', JSON.stringify(updatedReleases));
    setReleases(updatedReleases);
  };

  const handleCreateRelease = () => {
    if (!newRelease.title || !newRelease.artist || !newRelease.artwork) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const release: Release = {
      id: Date.now().toString(),
      ...newRelease,
      year: parseInt(newRelease.year),
      tracks: newTracks
    };

    const updatedReleases = [release, ...releases];
    saveReleases(updatedReleases);

    setNewRelease({
      title: "",
      artist: "",
      type: "album",
      year: new Date().getFullYear().toString(),
      artwork: ""
    });
    setNewTracks([]);
    setShowAddForm(false);

    toast({
      title: "Release Created",
      description: `"${release.title}" has been added with ${newTracks.length} tracks`,
    });
  };

  const handleDeleteRelease = (id: string) => {
    const releaseToDelete = releases.find(r => r.id === id);
    const updatedReleases = releases.filter(r => r.id !== id);
    saveReleases(updatedReleases);

    toast({
      title: "Release Deleted",
      description: `"${releaseToDelete?.title}" has been removed`,
    });
  };

  const handleAddTrack = () => {
    const track: Track = {
      id: Date.now().toString() + Math.random(),
      name: "",
      mp3Url: ""
    };
    setNewTracks([...newTracks, track]);
  };

  const handleUpdateTrack = (trackId: string, field: keyof Track, value: string) => {
    setNewTracks(tracks => 
      tracks.map(t => t.id === trackId ? { ...t, [field]: value } : t)
    );
  };

  const handleDeleteTrack = (trackId: string) => {
    setNewTracks(tracks => tracks.filter(t => t.id !== trackId));
  };

  const startEdit = (release: Release) => {
    setEditingRelease(release);
    setNewRelease({
      title: release.title,
      artist: release.artist,
      type: release.type,
      year: release.year.toString(),
      artwork: release.artwork
    });
    setNewTracks([...release.tracks]);
    setShowAddForm(true);
  };

  const handleUpdateRelease = () => {
    if (!editingRelease || !newRelease.title || !newRelease.artist || !newRelease.artwork) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedRelease: Release = {
      ...editingRelease,
      ...newRelease,
      year: parseInt(newRelease.year),
      tracks: newTracks
    };

    const updatedReleases = releases.map(r => 
      r.id === editingRelease.id ? updatedRelease : r
    );
    saveReleases(updatedReleases);

    setEditingRelease(null);
    setNewRelease({
      title: "",
      artist: "",
      type: "album",
      year: new Date().getFullYear().toString(),
      artwork: ""
    });
    setNewTracks([]);
    setShowAddForm(false);

    toast({
      title: "Release Updated",
      description: `"${updatedRelease.title}" has been updated`,
    });
  };

  const cancelEdit = () => {
    setEditingRelease(null);
    setNewRelease({
      title: "",
      artist: "",
      type: "album",
      year: new Date().getFullYear().toString(),
      artwork: ""
    });
    setNewTracks([]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-wider text-foreground">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage your music releases and tracks
          </p>
        </div>
        
        {!showAddForm && (
          <Button onClick={() => setShowAddForm(true)} variant="yzy" className="hover-scale">
            <Plus className="h-4 w-4 mr-2" />
            Add Release
          </Button>
        )}
      </header>

      {/* Add/Edit Release Form */}
      {showAddForm && (
        <Card className="card-yzy">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {editingRelease ? <Edit3 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {editingRelease ? "Edit Release" : "Add New Release"}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={cancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Release Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Release title"
                  value={newRelease.title}
                  onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist">Artist *</Label>
                <Input
                  id="artist"
                  placeholder="Artist name"
                  value={newRelease.artist}
                  onChange={(e) => setNewRelease({ ...newRelease, artist: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newRelease.type} onValueChange={(value: "album" | "ep" | "single") => 
                  setNewRelease({ ...newRelease, type: value })
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="album">Album</SelectItem>
                    <SelectItem value="ep">EP</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2024"
                  value={newRelease.year}
                  onChange={(e) => setNewRelease({ ...newRelease, year: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="artwork">Artwork URL *</Label>
                <Input
                  id="artwork"
                  placeholder="https://example.com/artwork.jpg"
                  value={newRelease.artwork}
                  onChange={(e) => setNewRelease({ ...newRelease, artwork: e.target.value })}
                />
              </div>
            </div>

            {/* Tracks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tracks ({newTracks.length})</h3>
                <Button onClick={handleAddTrack} variant="outline" size="sm" className="hover-scale">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Track
                </Button>
              </div>

              {newTracks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tracks added yet
                </p>
              ) : (
                <div className="space-y-3">
                  {newTracks.map((track, index) => (
                    <div key={track.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <span className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Track name"
                          value={track.name}
                          onChange={(e) => handleUpdateTrack(track.id, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="MP3 URL"
                          value={track.mp3Url}
                          onChange={(e) => handleUpdateTrack(track.id, 'mp3Url', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTrack(track.id)}
                        className="text-destructive hover:text-destructive hover-scale"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={editingRelease ? handleUpdateRelease : handleCreateRelease}
                variant="yzy" 
                className="hover-scale"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingRelease ? "Update Release" : "Create Release"}
              </Button>
              <Button onClick={cancelEdit} variant="outline" className="hover-scale">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Releases List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          Releases ({releases.length})
        </h2>
        
        {releases.length === 0 ? (
          <Card className="card-yzy">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No releases yet. Create your first release above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {releases.map((release) => (
              <Card key={release.id} className="card-yzy hover-scale transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={release.artwork} 
                        alt={release.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{release.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {release.artist} • {release.type.charAt(0).toUpperCase() + release.type.slice(1)} • {release.year}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {release.tracks.length} tracks
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(release)}
                        className="hover-scale"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRelease(release.id)}
                        className="hover-scale text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import SongCard from "~/components/songCard";
import { useSession } from "next-auth/react";
import getSongClip from "~/lib/utils/getSongClip";
import getTrackData from "~/lib/utils/getTrackData";

interface SongSidebarProps {
  code: string;
}

function SongSidebar({ code }: SongSidebarProps) {
  const { data: session } = useSession();
  const game = useQuery(api.games.getGame, { code });
  const [songClips, setSongClips] = useState<any[]>([]); // Use 'any' to represent the shape of track data

  useEffect(() => {
    // Fetch song clips when the component mounts
    async function fetchTrackData() {
      if (session && game?.suggestedSongs) {
        const clips = await Promise.all(
          game.suggestedSongs.map(async (song) => {
            const songClip = await getSongClip(session, song);
            const trackData = await getTrackData(session, songClip);
            return trackData; // This will replace the songClip in the array with the trackData
          })
        );
        setSongClips(clips);
      }
    }

    fetchTrackData();
  }, [session, game]);

  if (!game?.suggestedSongs || game.suggestedSongs.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h1 className="text-3xl text-primary">SUGGESTED SONGS</h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul>
            {songClips.map((trackData, index) => (
              <li key={index} className="mb-1">
                <SongCard trackData={trackData} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default SongSidebar;

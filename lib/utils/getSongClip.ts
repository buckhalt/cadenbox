import axios from "axios";

export default async function getSongClip(session: any, songSearch: string) {
  const spotifyApiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    songSearch
  )}&type=track&market=US&limit=1`;
  // Make the API request
  const response = await axios.get(spotifyApiUrl, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const songId = response.data.tracks.items[0].id;
  // generate a random song id
  return songId;
}

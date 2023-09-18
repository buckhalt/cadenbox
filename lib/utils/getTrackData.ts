import axios from "axios";

export default async function getTrackData(session: any, trackId: string) {
  const spotifyApiUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
  try {
    // Make the API request
    const response = await axios.get(spotifyApiUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Check if the request was successful
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching track data: ${response.status}`);
    }
  } catch (error) {
    // Handle errors here
    console.error("Error fetching track data:", error);
    throw error;
  }
}

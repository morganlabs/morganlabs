export default class LastFM {
  #defaultArgs = { period: "6month", limit: 10 };

  constructor(apiKey, username) {
    this.apiKey = apiKey;
    this.username = username;
  }

  async getTopArtists() {
    const artists = await this.#fetchAPI(
      "user",
      "getTopArtists",
      this.#defaultArgs,
    );
    const formatted = this.#formatTopArtists(artists);
    devLog(formatted);
    return formatted;
  }

  async getTopTracks() {
    const tracks = await this.#fetchAPI(
      "user",
      "getTopTracks",
      this.#defaultArgs,
    );
    const formatted = this.#formatTopTracks(tracks);
    devLog(formatted);
    return formatted;
  }

  async #fetchAPI(namespace, method, extraQuery = "") {
    let extraQueryStr = "";

    for (const [key, value] of Object.entries(extraQuery)) {
      extraQueryStr += `&${key}=${value}`;
    }

    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=${namespace}.${method}&user=morganlabs&api_key=${this.apiKey}&format=json${extraQueryStr}`,
    );
    const json = await res.json();

    devLog(json);

    return json;
  }

  #formatTopArtists(topArtists) {
    let artists = topArtists.topartists.artist;
    artists = artists
      .sort((a) => a.playcount)
      .map(({ name, url, playcount }) => ({
        name,
        url,
        plays: parseInt(playcount),
      }));

    return artists;
  }

  #formatTopTracks(topTracks) {
    let tracks = topTracks.toptracks.track;

    tracks = tracks
      .sort((t) => t.playcount)
      .map(({ name, url, playcount, artist }) => ({
        title: name,
        url,
        plays: parseInt(playcount),
        artist: { name: artist.name, url: artist.url },
      }));

    return tracks;
  }
}

function devLog(...message) {
  const isDev = process.env.NODE_ENV === "dev";
  if (isDev) console.log(...message);
}

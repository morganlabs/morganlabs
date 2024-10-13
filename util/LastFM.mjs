const ENV = {
  username: "morganlabs",
  base_url: "http://ws.audioscrobbler.com/2.0",
  key: process.env.LFM_API_KEY,
  isDev: process.env.DEV === "true",
};

export default class LastFM {
  static #defaultArgs = { period: "6month", limit: 5 };

  static async getTopArtists() {
    const artists = await this.#fetchAPI(
      "user",
      "getTopArtists",
      this.#defaultArgs,
    );
    const formatted = this.#formatTopArtists(artists);
    if (ENV.isDev) console.log(formatted);
    return formatted;
  }

  static async getTopTracks() {
    const tracks = await this.#fetchAPI(
      "user",
      "getTopTracks",
      this.#defaultArgs,
    );
    const formatted = this.#formatTopTracks(tracks);
    if (ENV.isDev) console.log(formatted);
    return formatted;
  }

  static async #fetchAPI(namespace, method, extraQuery = "") {
    let extraQueryStr = "";

    for (const [key, value] of Object.entries(extraQuery)) {
      extraQueryStr += `&${key}=${value}`;
    }

    const res = await fetch(
      `${ENV.base_url}/?method=${namespace}.${method}&user=${ENV.username}&api_key=${ENV.key}&format=json${extraQueryStr}`,
    );
    const json = await res.json();

    if (ENV.isDev) console.log(json);

    return json;
  }

  static #formatTopArtists(topArtists) {
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

  static #formatTopTracks(topTracks) {
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

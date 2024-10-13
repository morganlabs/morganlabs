import LastFM from "./util/LastFM.mjs";
import mustachify from "./util/mustachify.js";
import getAge from "./util/getAge.js";

console.log("Setting variables...");
const vars = {
  age: getAge(),
  topArtists: (await LastFM.getTopArtists())
    .map(
      ({ name, url, plays }, idx) =>
        `${idx + 1}. [${name}](${url}) *(${plays} play${plays !== 1 ? "s" : ""})*`,
    )
    .join("\n"),
  topTracks: (await LastFM.getTopTracks())
    .map(
      ({ title, url, plays, artist }, idx) =>
        `${idx + 1}. [${title}](${url}) by [${artist.name}](${artist.url}) *(${plays} play${plays !== 1 ? "s" : ""})*`,
    )
    .join("\n"),
};

console.log("Mustachifying...");
mustachify("README", vars);
mustachify("ABOUT_ME", vars);

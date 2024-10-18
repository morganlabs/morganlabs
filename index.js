import LastFM from "./util/LastFM.mjs";
import mustachify from "./util/mustachify.js";
import getAge from "./util/getAge.js";
import { config } from "dotenv";

config();
devLog("Loaded environment variables");

devLog("Constructing LastFM");
const fm = new LastFM(process.env.LFM_API_KEY, "morganlabs");

devLog("Setting variables...");
const vars = {
  age: getAge(),
  topArtists: (await fm.getTopArtists())
    .map(
      ({ name, url, plays }, idx) =>
        `${idx + 1}. [${name}](${url}) *(${plays} play${plays !== 1 ? "s" : ""})*`,
    )
    .join("\n"),
  topTracks: (await fm.getTopTracks())
    .map(
      ({ title, url, plays, artist }, idx) =>
        `${idx + 1}. [${title}](${url}) by [${artist.name}](${artist.url}) *(${plays} play${plays !== 1 ? "s" : ""})*`,
    )
    .join("\n"),
};

mustachify("README", vars);
mustachify("ABOUT_ME", vars);

function devLog(...message) {
  const isDev = process.env.NODE_ENV === "dev";
  if (isDev) console.log(...message);
}

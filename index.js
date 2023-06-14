const Mustache = require("mustache");
const { readFile, writeFileSync } = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const A_LEVELS = ["Computer Science", "Law", "Psychology"];

const GCSE = [
  "English Language",
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Religious Studies",
  "Information Technology",
  "more",
];

const OS = ["Arch Linux", "Windows 11"];

const STORAGE = [
  "256GB NVMe M.2 Addlink SSD",
  "256 GB Silicon Power SATA SSD",
  "1TB SATA M.2 Western Digital Blue SSD",
];

const FAVORITE_ARTISTS = shuffleArray([
  ["Linkin Park", "https://music.apple.com/gb/artist/linkin-park/148662"],
  ["Limp Bizkit", "https://music.apple.com/gb/artist/limp-bizkit/105544"],
  [
    "Ariana Grande",
    "https://music.apple.com/gb/artist/ariana-grande/412778295",
  ],
  ["AURORA", "https://music.apple.com/gb/artist/aurora/947171999"],
  ["Silverstein", "https://music.apple.com/gb/artist/silverstein/2621140"],
  ["Fall Out Boy", "https://music.apple.com/gb/artist/fall-out-boy/28673423"],
]);

const PROGRAMMING_LANGUAGES = ["JavaScript", "TypeScript", "Rust"];

const DATA = {
  age: calculateAge(new Date(2007, 3, 1)),
  website: "doesstuff.dev",
  programming_languages_array: PROGRAMMING_LANGUAGES.map((x) => `"${x}"`).join(
    ", "
  ),
  programming_languages: formatter.format(PROGRAMMING_LANGUAGES),

  a_levels_array: A_LEVELS.map((x) => `"${x}"`).join(", "),
  a_levels: formatter.format(A_LEVELS),
  gcse_array: GCSE.map((x) => `"${x}"`).join(",\n\t\t"),
  gcse: formatter.format(GCSE),

  oses_array: OS.map((x) => `"${x}"`).join(", "),
  oses: formatter.format(OS),
  cpu: "Ryzen 5 3400G",
  gpu: "AMD Radeon RX 6650XT",
  memory: "Corsair 16GB (2x8GB) 3200MHz",
  storage_array: STORAGE.map((x) => `"${x}"`).join(",\n\t\t"),
  storage: formatter.format(STORAGE),

  favorite_artists_array: FAVORITE_ARTISTS.map((x) => `"${x[0]}"`).join(
    ",\n\t\t"
  ),
  favorite_artists: FAVORITE_ARTISTS.map((x) => `[${x[0]}](${x[1]})`).join(
    ", "
  ),
};

readFile(MUSTACHE_MAIN_DIR, (err, data) => {
  if (err) throw err;
  const output = Mustache.render(data.toString(), DATA);
  writeFileSync("README.md", output);
});

function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function isBeforeALevels() {
  const isBeforeSeptember2023 = new Date() < new Date(2023, 9, 1);
  return isBeforeSeptember2023;
}

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// index.js
const Mustache = require("mustache");
const { readFile, writeFileSync } = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const beforeALevels = isBeforeALevels();

const DATA = {
  age: calculateAge(new Date(2007, 03, 01)),
  website: "doesstuff.dev",
  alevels: formatter.format(["Computer Science", "Law", "Psychology"]),
  alevel_status: isBeforeALevels()
    ? "I will be studying"
    : "I am currently studying",
  gcses: formatter.format([
    "English Language",
    "Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "Religious Studies",
    "Information Technology",
    "more",
  ]),
  gcses_status: isBeforeALevels()
    ? "I am currently studying"
    : "I have studied",

  os: formatter.format(["Arch Linux", "Windows 11"]),
  cpu: "Ryzen 5 3400G",
  gpu: "AMD Radeon RX 6650XT",
  ram: "Corsair 16GB (2x8GB) 3200MHz",
  storage: formatter.format([
    "256GB NVMe M.2 Addlink SSD",
    "1TB SATA M.2 Western Digital Blue SSD",
  ]),

  favourite_artists: formatter.format([
    ...shuffleArray(
      [
        ["Linkin Park", "https://music.apple.com/gb/artist/linkin-park/148662"],
        ["Limp Bizkit", "https://music.apple.com/gb/artist/limp-bizkit/105544"],
        [
          "Ariana Grande",
          "https://music.apple.com/gb/artist/ariana-grande/412778295",
        ],
        ["AURORA", "https://music.apple.com/gb/artist/aurora/947171999"],
        [
          "Silverstein",
          "https://music.apple.com/gb/artist/silverstein/2621140",
        ],
        [
          "Fall Out Boy",
          "https://music.apple.com/gb/artist/fall-out-boy/28673423",
        ],
      ].map(([n, l]) => `[${n}](${l})`)
    ),
    "[more](https://www.last.fm/user/morgan_wj)",
  ]),
};

function generateReadMe() {
  readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    writeFileSync("README.md", output);
  });
}

generateReadMe();

function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function isBeforeALevels() {
  const isBeforeSeptember2023 = new Date() < new Date(2023, 09, 01);
  return isBeforeSeptember2023;
}

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

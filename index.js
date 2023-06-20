const Mustache = require("mustache");
const { readFile, writeFileSync } = require("fs");

const MUSTACHE_MAIN = "./main.mustache";

const METEORA = {
  os: ["Arch Linux", "Windows 11"],
  cpu: "Ryzen 5 3400G",
  gpu: "AMD Radeon RX 6650XT",
  memory: "Corsair 16GB (2x8GB) DDR4 3200MHz",
  storage: [
    "256GB NVMe M.2 Addlink SSD",
    "256GB SATA Silicon Power SSD",
    "1TB SATA M.2 Western Digital Blue SSD",
  ],
};

const DATA = {
  age: calculateAge(new Date("2007-03-01")),
  Meteora__OSes: METEORA.os.map((x) => `"${x}"`).join(", "),
  Meteora__CPU: METEORA.cpu,
  Meteora__GPU: METEORA.gpu,
  Meteora__Memory: METEORA.memory,
  Meteora__Storage: METEORA.storage.map((x) => `"${x}"`).join(",\n    "),
};

readFile(MUSTACHE_MAIN, (err, data) => {
  if (err) throw err;
  const output = Mustache.render(data.toString(), DATA);
  writeFileSync("README.md", output);
});

function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

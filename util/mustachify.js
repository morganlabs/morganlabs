import Mustache from "mustache";
import { readFileSync, writeFileSync } from "fs";

// Disable escaping
Mustache.escape = function (text) {
  return text;
};

export default function mustachify(filename, vars) {
  devLog(`Reading file ${filename}.template.md`);
  const file = readFileSync(`${filename}.template.md`, "utf8");

  devLog(`Mustachifying ${filename}`);
  const output = Mustache.render(file, vars);

  devLog(`Writing to ${filename}.md`);
  writeFileSync(`${filename}.md`, output);
}

function devLog(...message) {
  const isDev = process.env.NODE_ENV === "dev";
  if (isDev) console.log(...message);
}

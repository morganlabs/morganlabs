import Mustache from "mustache";
import { readFileSync, writeFileSync } from "fs";

// Disable escaping
Mustache.escape = function (text) {
  return text;
};

export default function mustachify(filename, vars) {
  console.log(`Reading file ${filename}.template.md`);
  const file = readFileSync(`${filename}.template.md`, "utf8");

  console.log(`Mustachifying ${filename}`);
  const output = Mustache.render(file, vars);

  console.log(`Writing to ${filename}.md`);
  writeFileSync(`${filename}.md`, output);
}

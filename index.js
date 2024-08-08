import { readFileSync, writeFileSync } from "fs";
import Mustache from "mustache";

const current_date = new Date();
const birthday = new Date("2007-03-01");
let age = current_date.getFullYear() - birthday.getFullYear();
const m = current_date.getMonth() - birthday.getMonth();
if (m < 0 || (m === 0 && current_date.getDate() < birthday.getDate())) {
    age--;
}

const vars = {
    age,
};

const file = readFileSync("README.template.md", "utf8");
const output = Mustache.render(file, vars);
writeFileSync("README.md", output);

export default function getAge() {
  const current_date = new Date();
  const birthday = new Date("2007-03-01");
  let age = current_date.getFullYear() - birthday.getFullYear();
  const m = current_date.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && current_date.getDate() < birthday.getDate())) {
    return age--;
  }

  return age;
}

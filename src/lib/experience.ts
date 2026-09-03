const EXPERIENCE_START_YEAR = 2021;

export function getYearsOfExperience() {
  return new Date().getFullYear() - EXPERIENCE_START_YEAR;
}

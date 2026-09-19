const START_YEAR = 2026;

export function updateCopyrightYear(elementId = 'year') {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  const currentYear = new Date().getFullYear();

  element.textContent =
    START_YEAR === currentYear
      ? `${START_YEAR}`
      : `${START_YEAR}-${currentYear}`;
}

updateCopyrightYear();

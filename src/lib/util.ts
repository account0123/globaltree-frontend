export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function isURLValid(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
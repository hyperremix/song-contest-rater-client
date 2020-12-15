/* istanbul ignore next line */
export const isSystemDark: boolean = window?.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
  : true;

export function saveTheme(isLightTheme: boolean): void {
  window.localStorage &&
    localStorage.setItem('isLightTheme', String(isLightTheme));
}

/* istanbul ignore next line */
export function getThemeFromStorage(): boolean | null {
  const value = window.localStorage && localStorage.getItem('isLightTheme');
  return value ? value === 'true' : null;
}

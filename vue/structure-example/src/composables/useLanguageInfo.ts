export interface LanguageInfo {
  language: string;
  languages: readonly string[];
  languageBase: string;
  languageVariant: string | undefined;
}

const LANGUAGE_PATTERN = /^\s*(?<base>[A-Za-z]{2})(?:-(?<variant>[A-Za-z]{2}))?\s*$/u;

export const useLanguageInfo = (): LanguageInfo => {
  const match = LANGUAGE_PATTERN.exec(window.navigator.language);
  const languageBase = match?.groups?.base?.toLowerCase() ?? '';
  const languageVariant = match?.groups?.variant?.toUpperCase();

  return {
    language: window.navigator.language,
    languages: window.navigator.languages,
    languageBase,
    languageVariant
  };
};

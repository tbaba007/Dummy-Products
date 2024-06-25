import {createContext} from 'react';
export const languageList=['de','en','fr'] as const;

export type LanguageProps=(typeof languageList[number])
export const languageContext = createContext<
  | {
      language: LanguageProps;
      setState?: React.Dispatch<React.SetStateAction<LanguageProps>>;
    }
  | undefined
>(undefined);

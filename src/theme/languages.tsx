import logoFR from '../theme/FR.png';
import logoDE from '../theme/DE.png';
import logoEN from '../theme/EN.png';
import logoES from '../theme/ES.png';
import logoIT from '../theme/IT.png';
import logoJP from '../theme/JP.png';
import logoNL from '../theme/NL.png';
import logoPL from '../theme/PL.png';
import logoPT from '../theme/PT.png';
import logoRU from '../theme/RU.png';
import logoZH from '../theme/ZH.png';

export const sourceLang = [
  {
    id: 0,
    lang: "German",
    tag: "DE",
    img: logoDE,
    sound: '*piep piep*',
  },
  {
    id: 1,
    lang: "English",
    tag: "EN",
    img: logoEN,
    sound: '*tweet tweet*',
  },
  {
    id: 2,
    lang: "French",
    tag: "FR",
    img: logoFR,
    sound: '*cui cui*',
  },
  {
    id: 3,
    lang: "Italian",
    tag: "IT",
    img: logoIT,
    sound: '*cip cip*',
  },
  {
    id: 4,
    lang: "Japanese",
    tag: "JP",
    img: logoJP,
    sound: '*チュンチュン*',
  },
  {
    id: 5,
    lang: "Spanish",
    tag: "ES",
    img: logoES,
    sound: '*pío pío*',
  },
  {
    id: 6,
    lang: "Dutch",
    tag: "NL",
    img: logoNL,
    sound: '*twiet twiet*',
  },
  {
    id: 7,
    lang: "Polish",
    tag: "PL",
    img: logoPL,
    sound: '*ćwir ćwir*',
  },
  {
    id: 8,
    lang: "Portuguese",
    tag: "PT",
    img: logoPT,
    sound: '*piu piu*',
  },
  {
    id: 9,
    lang: "Russian",
    tag: "RU",
    img: logoRU,
    sound: '*чирик-чирик*',
  },
  {
    id: 10,
    lang: "Chinese",
    tag: "ZH",
    img: logoZH,
    sound: '*啾啾*',
  },
]

export const targetLang = [
  {
    id: 0,
    lang: "German",
    tag: "DE",
    img: logoDE,
    sound: '*piep piep*',
  },
  {
    id: 1,
    lang: "English",
    tag: "EN",
    img: logoEN,
    sound: '*tweet tweet*',
  },
  {
    id: 2,
    lang: "French",
    tag: "FR",
    img: logoFR,
    sound: '*cui cui*',
  },
  {
    id: 3,
    lang: "Italian",
    tag: "IT",
    img: logoIT,
    sound: '*cip cip*',
  },
  {
    id: 4,
    lang: "Japanese",
    tag: "JP",
    img: logoJP,
    sound: '*チュンチュン*',
  },
  {
    id: 5,
    lang: "Spanish",
    tag: "ES",
    img: logoES,
    sound: '*pío pío*',
  },
  {
    id: 6,
    lang: "Dutch",
    tag: "NL",
    img: logoNL,
    sound: '*twiet twiet*',
  },
  {
    id: 7,
    lang: "Polish",
    tag: "PL",
    img: logoPL,
    sound: '*ćwir ćwir*',
  },
  {
    id: 8,
    lang: "Portuguese",
    tag: "PT",
    img: logoPT,
    sound: '*piu piu*',
  },
  {
    id: 9,
    lang: "Russian",
    tag: "RU",
    img: logoRU,
    sound: '*чирик-чирик*',
  },
  {
    id: 10,
    lang: "Chinese",
    tag: "ZH",
    img: logoZH,
    sound: '*啾啾*',
  },
]

type SourceLang = typeof sourceLang[number];
type TargetLang = typeof targetLang[number];

export const tagToLang = (tag: string | undefined) => {
  if (tag === "de")
    return (sourceLang[0]);
  else if (tag === "en")
    return (sourceLang[1]);
  else if (tag === "fr")
    return (sourceLang[2]);
  else if (tag === "it")
    return (sourceLang[3]);
  else if (tag === "jp")
    return (sourceLang[4]);
  else if (tag === "es")
    return (sourceLang[5]);
  else if (tag === "nl")
    return (sourceLang[6]);
  else if (tag === "pl")
    return (sourceLang[7]);
  else if (tag === "pt")
    return (sourceLang[8]);
  else if (tag === "ru")
    return (sourceLang[9]);
  else if (tag === "zh")
    return (sourceLang[10]);
  return (sourceLang[0]);
}
export const compareWith = (o1: SourceLang | TargetLang, o2: SourceLang | TargetLang) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

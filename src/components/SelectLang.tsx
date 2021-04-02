import React, { FC, useEffect, useState } from "react";
import { IonChip, IonImg, IonSelect, IonSelectOption } from "@ionic/react";

import { useTranslation } from "react-i18next";

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

export interface InputProps {
  selectedLang: LangInterface,
  setLang(lang: LangInterface): Promise<void>,
  appLang: LangInterface
};

export type LangInterface = {
  id: number,
  lang: string,
  tag: string,
  img: string,
  fullTag: string,
  sound: string
};

export const _langs: LangInterface[] = [
  {
    id: 0,
    lang: "German",
    tag: "DE",
    img: logoDE,
    fullTag: "de-DE",
    sound: '*piep piep*',
  },
  {
    id: 1,
    lang: "English",
    tag: "EN",
    img: logoEN,
    fullTag: "en-GB",
    sound: '*tweet tweet*',
  },
  {
    id: 2,
    lang: "French",
    tag: "FR",
    img: logoFR,
    fullTag: "fr-FR",
    sound: '*cui cui*',
  },
  {
    id: 3,
    lang: "Italian",
    tag: "IT",
    img: logoIT,
    fullTag: "it-IT",
    sound: '*cip cip*',
  },
  {
    id: 4,
    lang: "Japanese",
    tag: "JP",
    fullTag: "jp-JP",
    img: logoJP,
    sound: '*チュンチュン*',
  },
  {
    id: 5,
    lang: "Spanish",
    tag: "ES",
    img: logoES,
    fullTag: "es-ES",
    sound: '*pío pío*',
  },
  {
    id: 6,
    lang: "Dutch",
    tag: "NL",
    img: logoNL,
    fullTag: "nl-NL",
    sound: '*twiet twiet*',
  },
  {
    id: 7,
    lang: "Polish",
    tag: "PL",
    fullTag: "pt-PT",
    img: logoPL,
    sound: '*ćwir ćwir*',
  },
  {
    id: 8,
    lang: "Portuguese",
    tag: "PT",
    img: logoPT,
    fullTag: "ru-RU",
    sound: '*piu piu*',
  },
  {
    id: 9,
    lang: "Russian",
    tag: "RU",
    fullTag: "ru-RU",
    img: logoRU,
    sound: '*чирик-чирик*',
  },
  {
    id: 10,
    lang: "Chinese",
    tag: "ZH",
    fullTag: "zh-CN",
    img: logoZH,
    sound: '*啾啾*',
  },
]

export const tagToLang = (tag: string | undefined) => {
  if (tag === "de")
    return (_langs[0]);
  else if (tag === "en")
    return (_langs[1]);
  else if (tag === "fr")
    return (_langs[2]);
  else if (tag === "it")
    return (_langs[3]);
  else if (tag === "jp")
    return (_langs[4]);
  else if (tag === "es")
    return (_langs[5]);
  else if (tag === "nl")
    return (_langs[6]);
  else if (tag === "pl")
    return (_langs[7]);
  else if (tag === "pt")
    return (_langs[8]);
  else if (tag === "ru")
    return (_langs[9]);
  else if (tag === "zh")
    return (_langs[10]);
  return (_langs[0]);
}

export const compareWith = (o1: LangInterface, o2: LangInterface) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const SelectLang: FC<InputProps> = ({ selectedLang, setLang, appLang}) => {
  const { t, i18n } = useTranslation(['translate']);
  const [ langs, setLangs ] = React.useState<LangInterface[]>([]);

  useEffect(() => {
    setLangs([
      {
        id: 0,
        lang: t("translate:languages:German"),
        tag: "DE",
        img: logoDE,
        fullTag: "de-DE",
        sound: '*piep piep*',
      },
      {
        id: 1,
        lang: t("translate:languages:English"),
        tag: "EN",
        img: logoEN,
        fullTag: "en-GB",
        sound: '*tweet tweet*',
      },
      {
        id: 2,
        lang: t("translate:languages:French"),
        tag: "FR",
        img: logoFR,
        fullTag: "fr-FR",
        sound: '*cui cui*',
      },
      {
        id: 3,
        lang: t("translate:languages:Italian"),
        tag: "IT",
        img: logoIT,
        fullTag: "it-IT",
        sound: '*cip cip*',
      },
      {
        id: 4,
        lang: t("translate:languages:Japanese"),
        tag: "JP",
        img: logoJP,
        fullTag: "jp-JP",
        sound: '*チュンチュン*',
      },
      {
        id: 5,
        lang: t("translate:languages:Spanish"),
        tag: "ES",
        img: logoES,
        fullTag: "es-ES",
        sound: '*pío pío*',
      },
      {
        id: 6,
        lang: t("translate:languages:Dutch"),
        tag: "NL",
        img: logoNL,
        fullTag: "nl-NL",
        sound: '*twiet twiet*',
      },
      {
        id: 7,
        lang: t("translate:languages:Polish"),
        tag: "PL",
        fullTag: "pl-PL",
        img: logoPL,
        sound: '*ćwir ćwir*',
      },
      {
        id: 8,
        lang: t("translate:languages:Portuguese"),
        tag: "PT",
        fullTag: "pt-PT",
        img: logoPT,
        sound: '*piu piu*',
      },
      {
        id: 9,
        lang: t("translate:languages:Russian"),
        tag: "RU",
        fullTag: "ru-RU",
        img: logoRU,
        sound: '*чирик-чирик*',
      },
      {
        id: 10,
        lang: t("translate:languages:Chinese"),
        tag: "ZH",
        img: logoZH,
        fullTag: "zh-CN",
        sound: '*啾啾*',
      },
    ])
  }, [t, i18n.language])

  return (
    <>
      <IonChip color="primary">
        <IonImg src={selectedLang.img} style={{ "width": "30px" }} />
        <IonSelect compareWith={compareWith} value={selectedLang}
          onIonChange={e => setLang(e.detail.value)}>
          {langs.map(lang => (
            <IonSelectOption key={lang.id} value={lang}>
              {/* {t(`translate:${lang.lang}`)} */}
              {lang.lang}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonChip>
    </>
  );
};

export default SelectLang;
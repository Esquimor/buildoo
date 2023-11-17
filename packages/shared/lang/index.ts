import translationEN from "./en";
import translationFR from "./fr";

export enum Languages {
  EN = "EN",
  FR = "FR",
}

// the translations
const resources = {
  [Languages.EN]: {
    translation: translationEN,
  },
  [Languages.FR]: {
    translation: translationFR,
  },
};

export default resources;
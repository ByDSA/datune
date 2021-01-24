import { lang as CUSTOM } from "./CUSTOM";
import { lang as ENG } from "./ENG";
import { lang as ESP } from "./ESP";
import { LanguageInterface } from './LanguageInterface';

export class Language {
    static all(): LanguageInterface[] {
        return [
            ENG,
            ESP
        ];
    }

    static get ENG(): LanguageInterface {
        return ENG;
    }

    static get ESP(): LanguageInterface {
        return ESP;
    }

    static get CUSTOM(): LanguageInterface {
        return CUSTOM;
    }
}
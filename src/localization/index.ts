//다국어 관리

import az from "./az";
import en from "./en";
import ko from "./ko";

//지원 언어
export type language = "en" | "ko" | "az";

//언어별 번역

export const translations = {
    en,
    ko,
    az
};

//기본 언어
export const DEFAULT_LANGAUGE: language = "en";
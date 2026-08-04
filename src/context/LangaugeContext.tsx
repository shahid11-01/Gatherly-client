import { DEFAULT_LANGAUGE, language, translations } from "@/src/localization";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const LANG_KEY = "app_language";

interface LanguageContextType {
    language: language;
    t: (typeof translations)["en"];
    setLanguage: (lang: language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLang] = useState<language>(DEFAULT_LANGAUGE);

    // load saved language on app start
    useEffect(() => {
        (async () => {
            const saved = await SecureStore.getItemAsync(LANG_KEY);
            if (saved === "en" || saved === "ko" || saved === "az") {
                setLang(saved);
            }
        })();
    }, []);

    const setLanguage = async (lang: language) => {
        setLang(lang);
        await SecureStore.setItemAsync(LANG_KEY, lang);   // persist
    };

    return (
        <LanguageContext.Provider value={{ language, t: translations[language], setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
}
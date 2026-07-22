import { DEFAULT_LANGAUGE, language, translations } from "@/src/localization";
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

//언어 저장
const LANGUAGE_KEY = "language";

//context에서 사용하는 데이터 타입

interface LangaugeContextType {
    //현재 언어
    language: language;

    //언어 변경 함수
    setLanguage: (language: language) => Promise<void>;
    //현재 언어 변역
    t: typeof translations.en;
    //로딩 상태
    loading: boolean;
    
}
//Context 생성
const LanguageContext = 
        createContext<LangaugeContextType | null>(null);

interface Props {
    children: ReactNode;
}

//Provider
export function LanguageProvider({
    children,
}:Props) {
    //현재 언어
    const [language, setLanguage] = useState<language>(DEFAULT_LANGAUGE);
    //초기 로딩
    const [loading, setLoading] = useState(true);

    //저장된 언어 불러오기
    const loadLanguage = async () => {
        try {
            const savedLanguage = 
                await SecureStore.getItemAsync(LANGUAGE_KEY);
                if(savedLanguage=== "en" ||
                    savedLanguage==="ko" ||
                    savedLanguage==="az"
                ) {
                    setLanguage(savedLanguage as language);
                }
        } catch (error) {
            console.log("Langauge Load Error", error);
        }finally{
            setLoading(false);
        }
    };
    //언어 변경 및 저장
    const changeLanguage = async (
        newLanguage: language
    )=> {
        try {
            setLanguage(newLanguage);
            await SecureStore.setItemAsync(
                LANGUAGE_KEY,
                newLanguage
            );
        } catch(error) {
            console.log ("Language Save Error", error);
        }
    };
    //앱 시작 저장된 언어 불로오기
    useEffect(() =>{
        loadLanguage();
    }, []);
    return (
        <LanguageContext.Provider
            value={{
                language,
                loading,
                setLanguage: changeLanguage,
                t: translations[language],
            }}
            >
                {children}

            </LanguageContext.Provider>
    );
}
//Context Hook
export function useLanguage() {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider;"
        )
    }
    return context;
}


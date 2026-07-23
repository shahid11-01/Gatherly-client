import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LangaugeContext";
import RootNavigator from "./src/navigation/RootNavigator";

//앱의 시작 컴포넌트
export default function App() {

    return (

        <LanguageProvider>

            <AuthProvider>

                <RootNavigator />

            </AuthProvider>

        </LanguageProvider>

    );

}
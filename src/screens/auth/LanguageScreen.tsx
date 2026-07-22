import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import LanguageCard from "@/src/components/common/LanguageCard";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { AuthStackParamList } from "../../types/navigation";

import { useLanguage } from "@/src/context/LangaugeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/font";
import { Spacing } from "../../theme/spacing";




type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function LanguageScreen() {
   // navigation 객체 생성
   // 다른 화면으로 이동할 때 사용한다.
   
   const navigation = useNavigation<NavigationProp>();

   const {language, setLanguage, t} = useLanguage();
   
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.title}>
               {t.chooseLanguage}
            </Text>
            <Text style={styles.subtitle}>
               {t.languageSubtitle}
            </Text>

            <LanguageCard
                  code="GB"
                  title="English"
                  subtitle="English"
                  selected= {language === "en"}
                  onPress={() => setLanguage("en")}
            />
            <LanguageCard
                  code="KR"
                  title="한국어"
                  subtitle="Korean"
                  selected={language === "ko"}
                  onPress={() => setLanguage("ko")}
            />
            <LanguageCard
                  code="AZ"
                  title="Azərbaycan dili"
                  subtitle="Azerbaijani"
                  selected={language === "az"}
                  onPress={() => setLanguage("az")}
            />
         </View>
         <View style={styles.buttonContainer}>
            <PrimaryButton
               title={t.continue}
               //onPress={() => {}}  ->>
               onPress={() => navigation.navigate("Login")}
               //Continue 버튼 누르면 로그인 화면으로 이동한다
               />
         </View>
      </SafeAreaView>
    );

}

const styles = StyleSheet.create ({
   //화면에 전체 컨테이너

   container: {
    flex:1,
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
   },
   //메인 콘텐츠
   content: {
      padding: Spacing.lg,
   },

   //제못
   title: {
    fontSize: Fonts.title,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Spacing.sm,
   },
   subtitle: {
      fontSize: Fonts.body,
      color: Colors.light.textSecondary,
      marginBottom: Spacing.xl,
   },

   //버튼 영역
   buttonContainer: {
      padding: Spacing.lg,
   }

})
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import LanguageCard from "@/src/components/common/LanguageCard";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { AuthStackParamList } from "../../types/navigation";

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
   
   const [selectedLanguage, setSelectedLanguage] = useState("en");
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.title}>
               Choose Your Language
            </Text>
            <Text style={styles.subtitle}>
               언어를 선택하세요: Dil Seçin
            </Text>

            <LanguageCard
                  code="GB"
                  title="English"
                  subtitle="English"
                  selected= {selectedLanguage === "en"}
                  onPress={() => setSelectedLanguage("en")}
            />
            <LanguageCard
                  code="KR"
                  title="한국어"
                  subtitle="Korean"
                  selected={selectedLanguage === "ko"}
                  onPress={() => setSelectedLanguage("ko")}
            />
            <LanguageCard
                  code="AZ"
                  title="Azərbaycan dili"
                  subtitle="Azerbaijani"
                  selected={selectedLanguage === "az"}
                  onPress={() => setSelectedLanguage("az")}
            />
         </View>
         <View style={styles.buttonContainer}>
            <PrimaryButton
               title="Continue/ 계속하기/ Davam edin"
               onPress={() => {}}
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
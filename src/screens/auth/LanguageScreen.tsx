import { StyleSheet, Text, View } from "react-native";

export default function LanguageScreen() {
    return (
      <View style= {styles.container}>
         <Text style = {styles.title}>
            Choose Language
         </Text>
      </View>
    );

}

const styles = StyleSheet.create ({
   //화면에 전체 컨테이너

   container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
   },
   //제못
   title: {
    fontSize: 24
   }
})
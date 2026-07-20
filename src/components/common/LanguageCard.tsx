import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//// LanguageCard 스타일 정의
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

        padding: 20,

        borderWidth: 1,
        borderColor: "#E5E7EB",

        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
    },
    selectedContainer: {
        borderColor: "#3F6EF7",
        backgroundColor: "#EEF2FF",
    },
    code: {
        fontSize: 30,
        fontWeight: "700",
        width: 55,
    },
    textContainer: {
        flex: 1,
        marginLeft: 18,
    },
    title: {
        fontSize: 19,
        fontWeight: "700",
        color: "#111827",
    },
      subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: "#6B7280",
  },

  circle: {
    width: 28,
    height: 28,

    borderRadius: 14,

    borderWidth: 2,
    borderColor: "#D1D5DB",

    justifyContent: "center",
    alignItems: "center",
  },

  selectedCircle: {
    backgroundColor: "#4F6EF7",
    borderColor: "#4F6EF7",
  },

  check: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});

interface LanguageCardProps {
    code: string;
    title: string;
    subtitle: string;
    selected: boolean;
    onPress: () => void;
}

// 언어 선택 카드 컴포넌트
export default function LanguageCard({
    code,
    title,
    subtitle,
    selected,
    onPress,}:LanguageCardProps) {
        return (
            //카드를 누르면 onPress 함수 실행
            <TouchableOpacity style={[
                styles.container,
                selected && styles.selectedContainer
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            >
             {/* 언어 코드 */}
             <Text style={styles.code}>{code}</Text>

             {/* 언어 정보 */}
             <View  style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
             </View>
             {/* 선택된 언어 표시 */}
             <View
                style={[
                    styles.circle,
                    selected && styles.selectedCircle
                ]}
                >
                    {selected && <Text style={styles.check}>✓</Text>}
                </View>
            </TouchableOpacity>
        );
}
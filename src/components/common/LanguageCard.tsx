import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Spacing } from "@/src/theme/spacing";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/font";

interface LangaugeCardProps {
    code: string;
    title: string;
    subtitle: string;
    selected: string;
    onPress: () => void;
}


//// LanguageCard 스타일 정의
const styles = StyleSheet.create({
     // 카드 전체
    container: {

        width: "100%",

        height: 86,

        borderRadius: 18,

        borderWidth: 1,

        borderColor: Colors.light.border,

        backgroundColor: Colors.light.surface,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        paddingHorizontal: Spacing.lg,

        marginBottom: Spacing.md,

    },

    // 선택된 카드
    selectedContainer: {

        borderColor: Colors.light.primary,

    },

    // 왼쪽 영역
    leftContainer: {

        flexDirection: "row",

        alignItems: "center",

    },

    // 국가 코드
    code: {

        fontSize: 28,

        fontWeight: "700",

        marginRight: Spacing.lg,

    },

    // 제목
    title: {

        fontSize: Fonts.body,

        fontWeight: "700",

        color: Colors.light.text,

    },

    // 부제목
    subtitle: {

        fontSize: 14,

        color: Colors.light.textSecondary,

        marginTop: 4,

    },

    // 선택 원
    radio: {

        width: 22,

        height: 22,

        borderRadius: 11,

        borderWidth: 2,

        borderColor: Colors.light.border,

    },

    // 선택 상태
    selectedRadio: {

        backgroundColor: Colors.light.primary,

        borderColor: Colors.light.primary,

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
            >

            <View style={styles.leftContainer}>
                <Text style={styles.code}>
                    {code}
                </Text>

                <View>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.subtitle}>
                        {subtitle}
                    </Text>

                </View>

            </View>
            <View
              style={[
                styles.radio,
                selected && styles.selectedRadio,
              ]}
            />
            
            </TouchableOpacity>
        );
}
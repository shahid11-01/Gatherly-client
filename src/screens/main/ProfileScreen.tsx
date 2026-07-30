import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EventCard from "@/src/components/common/EventCard";
import { useAuth } from "@/src/context/AuthContext";
import * as eventService from "@/src/services/eventService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventResponse } from "@/src/types/event";
import { AppStackParamList } from "@/src/types/navigation";

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const [hosted, setHosted] = useState<EventResponse[]>([]);
    const [hostedCount, setHostedCount] = useState(0);
    const [joinedCount, setJoinedCount] = useState(0);

    useEffect(() => {
        (async () => {
            const h = await eventService.getHosted(0);
            setHosted(h.events);
            setHostedCount(h.total);
            const j = await eventService.getJoined(0);
            setJoinedCount(j.total);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Profile</Text>
                    <TouchableOpacity onPress={logout}>
                        <Ionicons name="log-out-outline" size={22} color="#334155" />
                    </TouchableOpacity>
                </View>

                <View style={styles.userRow}>
                    <View style={styles.avatar}><Ionicons name="person" size={28} color="#94a3b8" /></View>
                    <View>
                        <Text style={styles.name}>{user?.userName}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                    </View>
                </View>

                <View style={styles.stats}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>{hostedCount}</Text>
                        <Text style={styles.statLabel}>Hosted</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>{joinedCount}</Text>
                        <Text style={styles.statLabel}>Joined</Text>
                    </View>
                </View>

                <Text style={styles.section}>Hosted Events</Text>
                {hosted.length === 0
                    ? <Text style={styles.empty}>No hosted events yet</Text>
                    : hosted.map((ev) => (
                        <EventCard key={ev.eventId} event={ev}
                            onPress={() => navigation.navigate("MyEventDetailScreen", { eventId: ev.eventId })} />
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    header: { fontSize: 24, fontWeight: "800" },
    userRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: Spacing.lg },
    avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#e2e8f0", justifyContent: "center", alignItems: "center" },
    name: { fontSize: 20, fontWeight: "800" },
    email: { color: "#64748b" },
    stats: { flexDirection: "row", gap: 12, marginTop: Spacing.lg },
    statBox: { flex: 1, backgroundColor: "#f8fafc", borderRadius: 12, padding: 16, alignItems: "center" },
    statNum: { fontSize: 22, fontWeight: "800", color: Colors.light.primary },
    statLabel: { color: "#64748b", marginTop: 2 },
    section: { fontSize: 18, fontWeight: "700", marginTop: Spacing.xl, marginBottom: 10 },
    empty: { color: "#94a3b8", textAlign: "center", marginTop: 20 },
});
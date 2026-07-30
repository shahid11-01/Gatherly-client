import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as eventService from "@/src/services/eventService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventResponse } from "@/src/types/event";
import { AppStackParamList } from "@/src/types/navigation";

export default function MyEventScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "MyEventScreen">>();
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const { eventId } = route.params;
    const [event, setEvent] = useState<EventResponse | null>(null);

    useEffect(() => {
        (async () => setEvent(await eventService.getEvent(eventId)))();
    }, [eventId]);

    if (!event) return null;

    const filled = event.participantCount ?? 0;
    const max = event.maxParticipants;
    const pct = max ? Math.min(100, (filled / max) * 100) : 0;
    const left = Math.max(0, max - filled);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <ScrollView>
                <View>
                    {event.imageUrls?.[0]
                        ? <Image source={{ uri: event.imageUrls[0] }} style={styles.hero} />
                        : <View style={[styles.hero, { backgroundColor: "#e2e8f0" }]} />}
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={{ padding: Spacing.lg }}>
                    <Text style={styles.category}>{event.category}</Text>
                    <Text style={styles.title}>{event.title}</Text>

                    <Text style={styles.hostLabel}>HOSTED BY</Text>
                    <Text style={styles.hostName}>{event.hostName} (You)</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>START DATE</Text>
                            <Text style={styles.infoValue}>{new Date(event.startDate).toLocaleString()}</Text>
                            <Text style={styles.infoLabel}>END DATE</Text>
                            <Text style={styles.infoValue}>{new Date(event.endDate).toLocaleString()}</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{event.description}</Text>

                    <View style={styles.participantsBox}>
                        <Text style={styles.infoLabel}>PARTICIPANTS</Text>
                        <Text style={styles.spots}>{filled} / {max} spots filled</Text>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${pct}%` }]} />
                        </View>
                        <Text style={styles.left}>{left} left</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Host actions instead of Join */}
            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.editBtn]}
                    onPress={() => navigation.navigate("EditEvent", { eventId })}
                >
                    <Ionicons name="create-outline" size={18} color={Colors.light.primary} />
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.manageBtn]}
                    onPress={() => navigation.navigate("ManageParticipants", { eventId })}
                >
                    <Ionicons name="people-outline" size={18} color="#fff" />
                    <Text style={styles.manageText}>Participants</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: { width: "100%", height: 240 },
    back: { position: "absolute", top: 40, left: 16, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 8 },
    category: { color: Colors.light.primary, fontWeight: "700" },
    title: { fontSize: 24, fontWeight: "800", marginVertical: 6 },
    hostLabel: { color: "#94a3b8", fontSize: 11, marginTop: 12 },
    hostName: { fontSize: 16, fontWeight: "700" },
    infoRow: { flexDirection: "row", marginTop: 16, gap: 12 },
    infoBox: { flex: 1, backgroundColor: "#f8fafc", borderRadius: 12, padding: 12 },
    infoLabel: { color: "#325687", fontSize: 14 },
    infoValue: { fontWeight: "700", marginTop: 4 },
    description: { color: "#334155", marginTop: 16, lineHeight: 20 },
    participantsBox: { backgroundColor: "#f8fafc", borderRadius: 12, padding: 14, marginTop: 16 },
    spots: { fontWeight: "700", marginTop: 4 },
    progressTrack: { height: 8, backgroundColor: "#e2e8f0", borderRadius: 4, marginTop: 8, overflow: "hidden" },
    progressFill: { height: "100%", backgroundColor: Colors.light.primary },
    left: { color: Colors.light.primary, fontSize: 12, marginTop: 6, textAlign: "right" },

    actionRow: { flexDirection: "row", gap: 12, margin: Spacing.lg },
    actionBtn: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, borderRadius: 14, padding: 16 },
    editBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: Colors.light.primary },
    editText: { color: Colors.light.primary, fontWeight: "700" },
    manageBtn: { backgroundColor: Colors.light.primary },
    manageText: { color: "#fff", fontWeight: "700" },
});
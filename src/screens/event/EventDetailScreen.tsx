import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as eventService from "@/src/services/eventService";
import * as participantService from "@/src/services/participantService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventResponse } from "@/src/types/event";
import { AppStackParamList } from "@/src/types/navigation";

export default function EventDetailScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "EventDetail">>();
    const navigation = useNavigation();
    const {eventId} = route.params;
    const [event, setEvent] = useState<EventResponse | null>(null);
    const[justRequested, setJustRequested] = useState(false);
    const status = justRequested? "PENDING" : event?.myStatus;

    useEffect(() => {
        (async () => setEvent(await eventService.getEvent(eventId)))();
    }, [eventId]);

    const handleJoin = async () => {
        try { 
            await participantService.joinRequest(eventId);
            setJustRequested(true);
            alert("참가 요청을 보냈습니다");
        }catch (e: any) {
            const msg = e?.response?.data?.message ?? "참가 요청에 실패했습니다";
            console.log(e); 
            alert(msg);
        }
    };
    if(!event) return null;
    const filled = event.participantCount ?? 0;
    const max = event.maxParticipants;
    const pct = max ? Math.min(100, (filled / max) * 100) : 0;
    const left = Math.max(0, max - filled);

    return (
        <View style={{flex:1, backgroundColor: Colors.light.background}}>
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
                    <Text style={styles.hostName}>{event.hostName}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>START DATE</Text>
                            <Text style={styles.infoValue}>{new Date(event.startDate).toLocaleString()}</Text>

                            <Text style={styles.infoLabel}>END DATE</Text>
                            <Text style={styles.infoValue}>{new Date(event.endDate).toLocaleString()}</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{event.description}</Text>

                    {/* Participants */}
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
            {status === "APPROVED" ? (
                <View style={[styles.joinBtn, styles.joinedBtn]}>
                    <Text style={styles.joinText}>✓ Joined</Text>
                </View>
            ) : status === "PENDING" ? (
                <View style={[styles.joinBtn, styles.pendingBtn]}>
                    <Text style={styles.pendingText}>Requested</Text>
                </View>
            ) : (
                <TouchableOpacity style={styles.joinBtn} onPress={handleJoin}>
                    <Text style={styles.joinText}>Request to Join</Text>
                </TouchableOpacity>
            )}
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
    joinBtn: { backgroundColor: Colors.light.primary, margin: Spacing.lg, borderRadius: 14, padding: 16, alignItems: "center" },
    joinText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    joinedBtn: { backgroundColor: "#22c55e" },
    pendingBtn: { backgroundColor: "#e2e8f0" },
    pendingText: { color: "#64748b", fontWeight: "700", fontSize: 16 },
});
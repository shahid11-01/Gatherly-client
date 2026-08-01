import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as participantService from "@/src/services/participantService";
import { ParticipantResponse } from "@/src/services/participantService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { AppStackParamList } from "@/src/types/navigation";

type Status = "PENDING" | "APPROVED" | "REJECTED";

const TABS : {label: string; value: Status} [] = [
    {label: "Pending", value: "PENDING"},
    {label: "Approved", value: "APPROVED"},
    {label: "Declined", value: "REJECTED"}
];

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `Requested ${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `Requested ${h}h ago`;
    return `Requested ${Math.floor(h / 24)}d ago`;
}

export default function ManageParticipantsScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "ManageParticipantsScreen">>();
    const navigation = useNavigation();
    const {eventId} = route.params;

    const [all, setAll] = useState<ParticipantResponse[]>([]);
    const[tab, setTab] = useState<Status>("PENDING");
        const load = useCallback(async () => {
        try {
            const data = await participantService.getParticipants(eventId);
            setAll(data);
        } catch (e) { console.log("participants error", e); }
    }, [eventId]);

    useEffect(() => { load(); }, [load]);

    const approve = async (userId: number) => {
        try { await participantService.approveRequest(userId, eventId); await load(); }
        catch (e) { console.log(e); alert("승인 실패"); }
    };
    const decline = async (userId: number) => {
        try { await participantService.rejectRequest(userId, eventId); await load(); }
        catch (e) { console.log(e); alert("거절 실패"); }
    };

    const remove = async(userId:number) => {
        try {await participantService.deleteParticipant(userId,eventId); await load();}
        catch(e) {console.log(e); alert("삭제 실패");}
    };

    const list = all.filter((p) => p.status === tab);
    const countBy = (s: Status) => all.filter((p) => p.status === s).length;

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Participants</Text>
                <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>{countBy("PENDING")}</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                {TABS.map((t) => {
                    const active = tab === t.value;
                    return (
                        <TouchableOpacity key={t.value} style={styles.tab} onPress={() => setTab(t.value)}>
                            <Text style={[styles.tabText, active && styles.tabTextActive]}>
                                {t.label} ({countBy(t.value)})
                            </Text>
                            {active && <View style={styles.tabUnderline} />}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
                {list.length === 0 ? (
                    <Text style={styles.empty}>No {tab.toLowerCase()} requests</Text>
                ) : (
                    list.map((p) => (
                        <View key={p.participantId} style={styles.card}>
                            <View style={styles.row}>
                                <View style={styles.avatar}>
                                    <Ionicons name="person" size={20} color="#94a3b8" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{p.userName}</Text>
                                    <Text style={styles.meta}>{timeAgo(p.requestedAt)}</Text>
                                </View>
                            </View>

                            {/* Actions differ per tab */}
                            {tab === "PENDING" && (
                                <View style={styles.actions}>
                                    <TouchableOpacity style={[styles.btn, styles.declineBtn]} onPress={() => decline(p.userId)}>
                                        <Text style={styles.declineText}>Decline</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btn, styles.approveBtn]} onPress={() => approve(p.userId)}>
                                        <Text style={styles.approveText}>Approve</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {tab === "APPROVED" && (
                                <TouchableOpacity style={styles.iconBtn} onPress={() => remove(p.userId)}>
                                    <Ionicons name="person-remove-outline" size={18} color="#ef4444" />
                                </TouchableOpacity>
                            )}
                            {tab === "REJECTED" && (
                                <TouchableOpacity style={[styles.btn, styles.approveInstead]} onPress={() => approve(p.userId)}>
                                    <Text style={styles.approveInsteadText}>Approve Instead</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    header: { flexDirection: "row", alignItems: "center", padding: Spacing.lg, gap: 12 },
    headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "800" },
    headerBadge: { backgroundColor: "#e0e7ff", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2 },
    headerBadgeText: { color: Colors.light.primary, fontWeight: "700" },
    tabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
    tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
    tabText: { color: "#94a3b8", fontWeight: "600" },
    tabTextActive: { color: Colors.light.primary },
    tabUnderline: { height: 2, backgroundColor: Colors.light.primary, width: "80%", marginTop: 8 },
    empty: { color: "#94a3b8", textAlign: "center", marginTop: 30 },
    card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#f1f5f9", justifyContent: "center", alignItems: "center" },
    name: { fontSize: 15, fontWeight: "700" },
    meta: { color: "#94a3b8", fontSize: 12, marginTop: 2 },
    actions: { flexDirection: "row", gap: 10, marginTop: 12 },
    btn: { flex: 1, borderRadius: 12, padding: 12, alignItems: "center" },
    declineBtn: { backgroundColor: "#fef2f2", borderWidth: 1, borderColor: "#fecaca" },
    declineText: { color: "#ef4444", fontWeight: "700" },
    approveBtn: { backgroundColor: Colors.light.primary },
    approveText: { color: "#fff", fontWeight: "700" },
    iconBtn: { alignSelf: "flex-end", backgroundColor: "#fef2f2", borderRadius: 20, padding: 8, marginTop: -32 },
    approveInstead: { marginTop: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: Colors.light.primary },
    approveInsteadText: { color: Colors.light.primary, fontWeight: "700" },
});

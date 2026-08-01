import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EventCard from "@/src/components/common/EventCard";
import * as eventService from "@/src/services/eventService";
import * as participantService from "@/src/services/participantService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventResponse } from "@/src/types/event";
import { AppStackParamList } from "@/src/types/navigation";
import { Alert } from "react-native";


type Tab = "HOSTED" | "JOINED" | "PENDING";

export default function MyEventsScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
   const[tab, setTab] = useState<Tab>("HOSTED");
   const[hosted, setHosted] = useState<EventResponse[]>([]);
   const[joined, setJoined] = useState<EventResponse[]>([]);
   const[pending, setPending] = useState<EventResponse[]>([]);

   const load = useCallback(async () =>  {
    try { setHosted((await eventService.getHosted(0)).events);} catch(e) {
        console.log("hosted",e);
    }

    try {setJoined((await eventService.getJoined(0)).events);} catch (e) {
        console.log("joined", e);
    }

    try {setPending((await eventService.getPending(0)).events);} catch(e) {
        console.log("pending", e);
    }

   }, []);

   const leave = (eventId:number, label: string) => {
    Alert.alert(label, "정말 하세겠습니까?", [
        {text: "취소", style: "cancel"},
        {
            text:label,
            style:"destructive",
            onPress: async () => {
                try { await participantService.leaveEvent(eventId); await load();}
                catch(e) {console.log(e); alert("실패");}
            },
        },
    ]);
   };
   const cancel = (eventId:number, label: string) => {
    Alert.alert(label, "정말 취소하겠습니다?", [
        {text: "취소", style: "cancel"},
        {
            text: label,
            style: "destructive",
            onPress: async () => {
                try {await participantService.cancelRequest(eventId); await load();}
                catch(e) {console.log(e); alert("실패");}
            },
        },
    ]);
   };

   const handleDelete = (eventId:number) => {
    Alert.alert("Delete Event", "정말 이 이벤트를 삭제하시겠습니까?", [
        {text: "취소", style:"cancel"},
        {
            text: "삭제",
            style: "destructive",
            onPress: async() => {
                try {
                    await eventService.deleteEvent(eventId);
                    await load();
                }catch(e) {
                    console.log("delete error",e);
                    alert("삭제 실패");
                }
            }
        }
    ])

   }



       useFocusEffect(useCallback(() => { load(); }, [load]));
       const list = tab === "HOSTED" ? hosted: tab ==="JOINED" ? joined: pending;

       const TABS: {key: Tab; label: string; count?: number}[] = [
            {key: "HOSTED", label: "Hosted"},
            {key: "JOINED", label: "Joined"},
            {key: "PENDING", label: "Pending", count:pending.length},
       ];

       return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Text style={styles.header}>My Events</Text>
              <View style={styles.tabs}>
                {TABS.map((t) => {
                    const active = tab === t.key;
                    return (
                        <TouchableOpacity key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                <Text style={[styles.tabText, active && styles.tabActive]}>{t.label}</Text>
                                {t.count ? (
                                    <View style={styles.badge}><Text style={styles.badgeText}>{t.count}</Text></View>
                                ) : null}
                            </View>
                            {active && <View style={styles.underline} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
            <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
                {list.length === 0 ? (
                    <Text style={styles.empty}>No events</Text>
                ) : list.map((ev) => (
                    <View key={ev.eventId} style={{ marginBottom: 8 }}>
                        <EventCard
                            event={ev}
                            onPress={() => navigation.navigate("MyEventsScreen", { eventId: ev.eventId })}
                        />
                        {tab === "HOSTED" && (
                            <View style={styles.actions}>
                                <TouchableOpacity style={[styles.btn, styles.editBtn]}
                                    onPress={() => navigation.navigate("EditEvent", { eventId: ev.eventId })}>
                                    <Ionicons name="create-outline" size={16} color={Colors.light.primary} />
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, styles.manageBtn]}
                                    onPress={() => navigation.navigate("ManageParticipantsScreen", { eventId: ev.eventId })}>
                                    <Ionicons name="people-outline" size={16} color={Colors.light.primary} />
                                    <Text style={styles.manageText}>Participants</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, styles.deleteBtn]}
                                    onPress={() => handleDelete(ev.eventId)}>
                                        <Ionicons name="trash-outline" size={16} color="#ef4444" />
                                    </TouchableOpacity>
                            </View>
                        )}
                        {tab === "JOINED" && (
                            <TouchableOpacity style={styles.leaveBtn} onPress={() => leave(ev.eventId, "Leave Event")}>
                                <Text style={styles.leaveText}>Leave Event</Text>
                            </TouchableOpacity>
                        )}
                        {tab=== "PENDING" && (
                            <TouchableOpacity style={styles.leaveBtn} onPress={() => cancel(ev.eventId, "Cancel Request")}>
                                <Text style={styles.leaveText}>Cancel Request</Text>

                            </TouchableOpacity>
                        )}
                        
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
       );

}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: Colors.light.background },
    header: { fontSize: 24, fontWeight: "800", paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
    tabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e2e8f0", marginTop: 8 },
    tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
    tabText: { color: "#94a3b8", fontWeight: "600" },
    tabActive: { color: Colors.light.primary },
    underline: { height: 2, backgroundColor: Colors.light.primary, width: "70%", marginTop: 8 },
    badge: { backgroundColor: Colors.light.primary, borderRadius: 10, paddingHorizontal: 6, minWidth: 18, alignItems: "center" },
    badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
    empty: { color: "#94a3b8", textAlign: "center", marginTop: 30 },
    actions: { flexDirection: "row", gap: 10, marginTop: 8, marginBottom: 8 },
    btn: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, borderRadius: 12, padding: 12 },
    editBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0" },
    editText: { color: Colors.light.primary, fontWeight: "700" },
    manageBtn: { backgroundColor: "#e8edff" },
    manageText: { color: Colors.light.primary, fontWeight: "700" },
    leaveBtn: { marginTop: 8, marginBottom: 8, borderRadius: 12, padding: 12, alignItems: "center",
    backgroundColor: "#fef2f2", borderWidth: 1, borderColor: "#fecaca" },
    leaveText: { color: "#ef4444", fontWeight: "700" },
    deleteBtn: {flex:0, paddingHorizontal: 14, backgroundColor: "#fef2f2", borderWidth:1, borderColor:"#fecaca",},
});
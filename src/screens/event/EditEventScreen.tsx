import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as eventService from "@/src/services/eventService";
import {Colors} from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { AppStackParamList } from "@/src/types/navigation";
import { EventCategory } from "@/src/types/event";
import {CreateEventRequest} from "@/src/types/event";

const CATEGORIES = [
    { label: "Tech", value: "TECH" }, { label: "Outdoors", value: "OUTDOOR" },
    { label: "Music", value: "MUSIC" }, { label: "Food", value: "FOOD_AND_DRINK" },
    { label: "Art", value: "ARTS" }, { label: "Sports", value: "SPORTS" },
    { label: "Gaming", value: "GAMING" }, { label: "Cooking", value: "COOKING" },
    { label: "Education", value: "EDUCATION" }, { label: "Other", value: "OTHER" },
] as const;

export default function EditEventScreen() {
    const route = useRoute<RouteProp<AppStackParamList, "EditEvent">>();
    const navigation = useNavigation();
    const {eventId} = route.params;

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[category, setCategory] = useState<EventCategory | null>(null);
    const[startDate, setStartDate] = useState(new Date());
    const[request, setCreateEventRequest] = useState("");
    const[endDate, setEndDate] = useState(new Date());
    const [maxParticipants, setMaxParticipants] = useState(20);
    const[picker, setPicker] = useState<null | "start" | "end">(null);

    useEffect(() => {
        (async() =>{
            const ev = await eventService.getEvent(eventId);
            setTitle(ev.title);
            setDescription(ev.description);
            setCategory(ev.category);
            setStartDate(new Date(ev.startDate));
            setEndDate(new Date(ev.endDate));
            setMaxParticipants(ev.maxParticipants);
        })();
    }, [eventId]);

    const handleSave = async () => {
        if (!category) {
            alert("카테고리를 선택해주세요");
            return;
        }

        try {
            await eventService.updateEvent(
                {
                    title,
                    description,
                    category,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    maxParticipants,
                },
                eventId,
            );
            alert("이벤트 정보가 수정되었습니다");
            navigation.goBack();
        } catch (e) {
            console.log(e);
            alert("수정 실패");
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.lg }}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                multiline value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Category</Text>
            <View style={styles.chips}>
                {CATEGORIES.map((c) => {
                    const sel = category === c.value;
                    return (
                        <TouchableOpacity key={c.value}
                            style={[styles.chip, sel && styles.chipActive]}
                            onPress={() => setCategory(c.value)}>
                            <Text style={sel ? styles.chipTextActive : styles.chipText}>{c.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Text style={styles.label}>Start</Text>
            <TouchableOpacity style={styles.input} onPress={() => setPicker("start")}>
                <Text>{startDate.toLocaleString()}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>End</Text>
            <TouchableOpacity style={styles.input} onPress={() => setPicker("end")}>
                <Text>{endDate.toLocaleString()}</Text>
            </TouchableOpacity>
            {picker && (
                <DateTimePicker value={picker === "start" ? startDate : endDate} mode="datetime"
                    onChange={(_, d) => { if (d) picker === "start" ? setStartDate(d) : setEndDate(d); setPicker(null); }} />
            )}

            <Text style={styles.label}>Max Participants</Text>
            <View style={styles.stepper}>
                <TouchableOpacity onPress={() => setMaxParticipants((n) => Math.max(1, n - 1))}><Ionicons name="remove" size={24} /></TouchableOpacity>
                <Text style={{ fontWeight: "700" }}>{maxParticipants} people</Text>
                <TouchableOpacity onPress={() => setMaxParticipants((n) => n + 1)}><Ionicons name="add" size={24} /></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submit} onPress={handleSave}>
                <Text style={styles.submitText}>✓ Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    label: { fontWeight: "700", marginTop: Spacing.md, marginBottom: 6 },
    input: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, padding: 12, backgroundColor: "#f8fafc" },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#e2e8f0" },
    chipActive: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
    chipText: { color: "#334155" }, chipTextActive: { color: "#fff", fontWeight: "600" },
    stepper: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, padding: 12 },
    submit: { backgroundColor: Colors.light.primary, borderRadius: 12, padding: 16, alignItems: "center", marginTop: Spacing.xl },
    submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

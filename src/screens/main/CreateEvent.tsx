import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";

import * as eventService from "@/src/services/eventService";
import * as imageService from "@/src/services/imageService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventCategory } from "@/src/types/event";

//label shown in UI
const CATEGORIES : Array<{label: string; value:EventCategory}> = [
    {label: "Tech", value: "TECH"},
    {label:"Outdoor", value: "OUTDOOR"},
    {label: "Music", value: "MUSIC"},
    {label: "Food", value:"FOOD_AND_DRINK"},
    {label:"Art", value: "ARTS"},
    { label: "Sports", value: "SPORTS" },
    { label: "Gaming", value: "GAMING" },
    { label: "Cooking", value: "COOKING" },
    { label: "Education", value: "EDUCATION" },
    { label: "Other", value: "OTHER" },
];

export default function CreateEvent() {
    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<EventCategory | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[maxParticipants, setMaxParticipants] = useState(1);
    const[picker, setPicker] = useState<null | "start" | "end">(null);
    const [submitting, setSubmitting] = useState(false);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5,
            quality:0.8,
        });
        if(!result.canceled) {
            setImages(result.assets.map((a) => a.uri).slice(0,5));
        }
    };
    const handleCreate = async () => {
        if(!title || !category) {
            alert("제목 및 카테고리가 필수입니다");
            return;
        }
        if(endDate < startDate) {
            alert("종료일은 시작일보다 빠를 수 없습니다");
            return;
        }
        try {
            setSubmitting(true);

            const createdEvent = await eventService.createEvent({
                title,
                description,
                category,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                maxParticipants,
            });
            if (images.length > 0) {
                await imageService.uploadEventImages(createdEvent.eventId,images);
            }
            alert("이벤트가 생성되었습니다");

            
        }catch(e) {
            console.log("이벤트 생성될 때 오류", e);
            alert("이벤트 생성 실패");
        }finally {
            setSubmitting(false);
        }

    };
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.lg }}>
            <TouchableOpacity style={styles.photoBox} onPress={pickImages}>
                {images.length > 0 ? (
                    <ScrollView horizontal>
                        {images.map((uri) => (
                            <Image key={uri} source={{ uri }} style={styles.thumb} />
                        ))}
                    </ScrollView>
                ) : (
                      <>
                        <Ionicons name="image-outline" size={32} color={Colors.light.primary} />
                        <Text style={styles.photoTitle}>Add Event Photos</Text>
                        <Text style={styles.photoSub}>Upload up to 5 images</Text>
                    </>
                )
                }
            </TouchableOpacity>
<Text style={styles.label}>Event Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Give your event a great name"
                value={title}
                onChangeText={setTitle}
            />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                placeholder="Describe what to expect..."
                multiline
                value={description}
                onChangeText={setDescription}
            />

          
            <Text style={styles.label}>Category</Text>
            <View style={styles.chips}>
                {CATEGORIES.map((c) => {
                    const selected = category === c.value;
                    return (
                        <TouchableOpacity
                            key={c.value}
                            style={[styles.chip, selected && styles.chipActive]}
                            onPress={() => setCategory(c.value)}
                        >
                            <Text style={selected ? styles.chipTextActive : styles.chipText}>
                                {c.label}
                            </Text>
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
                <DateTimePicker
                    value={picker === "start" ? startDate : endDate}
                    mode="datetime"
                    onChange={(_, date) => {
                        if (date) picker === "start" ? setStartDate(date) : setEndDate(date);
                        setPicker(null);
                    }}
                />
            )}

            
            <Text style={styles.label}>Max Participants</Text>
            <View style={styles.stepper}>
                <TouchableOpacity onPress={() => setMaxParticipants((n) => Math.max(1, n - 1))}>
                    <Ionicons name="remove" size={24} />
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{maxParticipants} people</Text>
                <TouchableOpacity onPress={() => setMaxParticipants((n) => n + 1)}>
                    <Ionicons name="add" size={24} />
                </TouchableOpacity>
            </View>

            {/* Submit */}
            <TouchableOpacity
                style={styles.submit}
                onPress={handleCreate}
                disabled={submitting}
            >
                <Text style={styles.submitText}>
                    {submitting ? "Creating..." : "⚡ Create Event"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    photoBox: {
        borderWidth: 1, borderStyle: "dashed", borderColor: "#cbd5e1",
        borderRadius: 12, padding: Spacing.lg, alignItems: "center", marginBottom: Spacing.lg,
    },
    thumb: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
    photoTitle: { fontWeight: "700", marginTop: 8 },
    photoSub: { color: "#94a3b8", fontSize: 12 },
    label: { fontWeight: "700", marginTop: Spacing.md, marginBottom: 6 },
    input: {
        borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10,
        padding: 12, backgroundColor: "#f8fafc",
    },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: {
        paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
        borderWidth: 1, borderColor: "#e2e8f0",
    },
    chipActive: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
    chipText: { color: "#334155" },
    chipTextActive: { color: "#fff", fontWeight: "600" },
    stepper: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, padding: 12,
    },
    stepperValue: { fontWeight: "700" },
    submit: {
        backgroundColor: Colors.light.primary, borderRadius: 12,
        padding: 16, alignItems: "center", marginTop: Spacing.xl,
    },
    submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
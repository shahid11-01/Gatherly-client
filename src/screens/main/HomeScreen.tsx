import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
    ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EventCard from "@/src/components/common/EventCard";
import { useAuth } from "@/src/context/AuthContext";
import * as eventService from "@/src/services/eventService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { EventCategory, EventResponse } from "@/src/types/event";
import { AppStackParamList } from "@/src/types/navigation";

const CATEGORIES: { label: string; value: EventCategory | null }[] = [
    { label: "All", value: null },
    { label: "Tech", value: "TECH" },
    { label: "Outdoors", value: "OUTDOOR" },
    { label: "Music", value: "MUSIC" },
    { label: "Food", value: "FOOD_AND_DRINK" },
    { label: "Art", value: "ARTS" },
    { label: "Sports", value: "SPORTS" },
    { label: "Gaming", value: "GAMING" },
];

export default function HomeScreen() {
    const { user } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const [featured, setFeatured] = useState<EventResponse[]>([]);
    const [nearby, setNearby] = useState<EventResponse[]>([]);
    const [selected, setSelected] = useState<EventCategory | null>(null);
    const [loading, setLoading] = useState(true);

    // search
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<EventResponse[]>([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => { loadFeatured(); }, []);
    useEffect(() => { loadNearby(selected); }, [selected]);

    // debounced search: runs 400ms after the user stops typing
    useEffect(() => {
        if (!query.trim()) { setResults([]); return; }
        const timer = setTimeout(async () => {
            try {
                setSearching(true);
                const res = await eventService.searchEvents(query.trim(), 0);
                setResults(res.events);
            } catch (e) { console.log("search error", e); }
            finally { setSearching(false); }
        }, 400);
        return () => clearTimeout(timer);
    }, [query]);

    const loadFeatured = async () => {
        try {
            const res = await eventService.getFeatured(0);
            setFeatured(res.events);
        } catch (e) { console.log("featured error", e); }
    };

    const loadNearby = async (cat: EventCategory | null) => {
        try {
            setLoading(true);
            const res = cat
                ? await eventService.getEvents(0, cat)
                : await eventService.getNearby(0);
            setNearby(res.events);
        } catch (e) { console.log("nearby error", e); }
        finally { setLoading(false); }
    };

    const openEvent = (eventId: number) => navigation.navigate("EventDetail", { eventId });

    const isSearching = query.trim().length > 0;

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Spacing.lg }}>
                <Text style={styles.greeting}>Good morning 👋</Text>
                <Text style={styles.name}>{user?.userName ?? "there"}</Text>

                {/* Search */}
                <View style={styles.search}>
                    <Ionicons name="search" size={18} color="#94a3b8" />
                    <TextInput
                        placeholder="Search events..."
                        style={{ flex: 1 }}
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                    />
                    {isSearching && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons name="close-circle" size={18} color="#94a3b8" />
                        </TouchableOpacity>
                    )}
                </View>

                {isSearching ? (
                    /* ---- Search results ---- */
                    <>
                        <Text style={styles.section}>Search Results</Text>
                        {searching ? (
                            <ActivityIndicator color={Colors.light.primary} style={{ marginTop: 20 }} />
                        ) : results.length === 0 ? (
                            <Text style={styles.empty}>No results for “{query}”</Text>
                        ) : (
                            results.map((ev) => (
                                <EventCard key={ev.eventId} event={ev} onPress={() => openEvent(ev.eventId)} />
                            ))
                        )}
                    </>
                ) : (
                    /* ---- Normal home ---- */
                    <>
                        <Text style={styles.section}>Categories</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }}>
                            {CATEGORIES.map((c) => {
                                const active = selected === c.value;
                                return (
                                    <TouchableOpacity
                                        key={c.label}
                                        style={[styles.chip, active && styles.chipActive]}
                                        onPress={() => setSelected(c.value)}
                                    >
                                        <Text style={active ? styles.chipTextActive : styles.chipText}>{c.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        <Text style={styles.section}>Featured Events</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }}>
                            {featured.map((ev) => (
                                <EventCard key={ev.eventId} event={ev} variant="featured" onPress={() => openEvent(ev.eventId)} />
                            ))}
                        </ScrollView>

                        <Text style={styles.section}>{selected ? "Events" : "Nearby Events"}</Text>
                        {loading ? (
                            <ActivityIndicator color={Colors.light.primary} style={{ marginTop: 20 }} />
                        ) : nearby.length === 0 ? (
                            <Text style={styles.empty}>No events found</Text>
                        ) : (
                            nearby.map((ev) => (
                                <EventCard key={ev.eventId} event={ev} onPress={() => openEvent(ev.eventId)} />
                            ))
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    greeting: { color: "#64748b", fontSize: 14 },
    name: { fontSize: 24, fontWeight: "800", marginBottom: Spacing.md },
    search: {
        flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f1f5f9",
        borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: Spacing.lg,
    },
    section: { fontSize: 18, fontWeight: "700", marginBottom: 10, marginTop: 6 },
    chip: {
        paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8,
        borderWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#fff",
    },
    chipActive: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
    chipText: { color: "#334155" },
    chipTextActive: { color: "#fff", fontWeight: "600" },
    empty: { color: "#94a3b8", textAlign: "center", marginTop: 20 },
});
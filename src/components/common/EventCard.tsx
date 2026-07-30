import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/src/theme/colors";
import { EventCategory, EventResponse } from "@/src/types/event";

const CATEGORY_LABELS: Record<EventCategory, string> = {
    MUSIC: "Music", SPORTS: "Sports", OUTDOOR: "Outdoors", TECH: "Tech",
    FOOD_AND_DRINK: "Food", ARTS: "Art", GAMING: "Gaming", COOKING: "Cooking",
    EDUCATION: "Education", OTHER: "Other",
};

function formatDate(iso: string) {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return `${date} · ${time}`;
}

type Props = {
    event: EventResponse;
    variant?: "featured" | "list";
    onPress?: () => void;
};

export default function EventCard({ event, variant = "list", onPress }: Props) {
    const image = event.imageUrls?.[0];

    if (variant === "featured") {
        return (
            <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9} onPress={onPress}>
                {image
                    ? <Image source={{ uri: image }} style={styles.featuredImage} />
                    : <View style={[styles.featuredImage, styles.placeholder]} />}
                <View style={styles.overlay}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{CATEGORY_LABELS[event.category]}</Text>
                    </View>
                    <Text style={styles.featuredTitle}>{event.title}</Text>
                    <Text style={styles.featuredMeta}>{formatDate(event.startDate)}</Text>
                    <Text style={styles.featuredMeta}>
                        {event.participantCount}/{event.maxParticipants} going
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.listCard} activeOpacity={0.9} onPress={onPress}>
            {image
                ? <Image source={{ uri: image }} style={styles.listImage} />
                : <View style={[styles.listImage, styles.placeholder]} />}
            <View style={{ flex: 1 }}>
                <Text style={styles.listCategory}>{CATEGORY_LABELS[event.category]}</Text>
                <Text style={styles.listTitle} numberOfLines={1}>{event.title}</Text>
                <Text style={styles.listMeta}>{formatDate(event.startDate)}</Text>
            </View>
            <View style={styles.countBox}>
                <Ionicons name="people-outline" size={14} color="#64748b" />
                <Text style={styles.countText}>{event.participantCount}/{event.maxParticipants}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Featured (big image with overlay)
    featuredCard: { width: 300, height: 180, borderRadius: 16, overflow: "hidden", marginRight: 14 },
    featuredImage: { width: "100%", height: "100%" },
    overlay: {
        position: "absolute", bottom: 0, left: 0, right: 0, padding: 14,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    badge: {
        alignSelf: "flex-start", backgroundColor: Colors.light.primary,
        paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 6,
    },
    badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
    featuredTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
    featuredMeta: { color: "#e2e8f0", fontSize: 12, marginTop: 2 },

    // List row
    listCard: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
        borderRadius: 14, padding: 10, marginBottom: 12, gap: 12,
        shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
    },
    listImage: { width: 64, height: 64, borderRadius: 10 },
    listCategory: { color: Colors.light.primary, fontSize: 12, fontWeight: "600" },
    listTitle: { fontSize: 15, fontWeight: "700", marginVertical: 2 },
    listMeta: { color: "#64748b", fontSize: 12 },
    countBox: { flexDirection: "row", alignItems: "center", gap: 4 },
    countText: { color: "#64748b", fontSize: 12 },

    placeholder: { backgroundColor: "#e2e8f0" },
});
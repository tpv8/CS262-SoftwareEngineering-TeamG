import { useState } from "react";
import { Text, View, Pressable, ScrollView, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

const ACCENT = "#208AEF";
const INK = "#101828";
const SUBTLE = "#5B6472";
const CARD_BG = "#FFFFFF";
const BORDER = "#E6EAF0";
const MAP_BG = "#E7F0FE";

export const LOCATIONS = [
  { name: "Hekman Library", top: "22%", left: "38%" },
  { name: "Covenant Fine Arts Center", top: "32%", left: "18%" },
  { name: "Spoelhof Center", top: "44%", left: "50%" },
  { name: "Fieldhouse", top: "78%", left: "68%" },
  { name: "Hiemenga Hall", top: "56%", left: "28%" },
  { name: "Devos Communication Building", top: "36%", left: "64%" },
  { name: "Science Building", top: "50%", left: "16%" },
  { name: "DeVries Hall", top: "64%", left: "52%" },
  { name: "North Hall", top: "14%", left: "60%" },
  { name: "Chapel", top: "46%", left: "36%" },
  { name: "Commons Annex", top: "70%", left: "24%" },
  { name: "Commons", top: "60%", left: "72%" },
] as const;

type LocationName = (typeof LOCATIONS)[number]["name"];

export const POINTS_OF_INTEREST = [
  "Restrooms",
  "Printers",
  "Water Fountains",
  "Vending Machines",
] as const;

type PointOfInterest = (typeof POINTS_OF_INTEREST)[number];

export default function Finder() {
  const router = useRouter();
  const [selected, setSelected] = useState<LocationName>(LOCATIONS[0].name);
  const [open, setOpen] = useState(false);
  const [activePois, setActivePois] = useState<Set<PointOfInterest>>(
    () => new Set(),
  );

  const togglePoi = (poi: PointOfInterest) => {
    setActivePois((prev) => {
      const next = new Set(prev);
      if (next.has(poi)) {
        next.delete(poi);
      } else {
        next.add(poi);
      }
      return next;
    });
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.container} testID="finder-loading" />;
  }

  const activeLocation = LOCATIONS.find((l) => l.name === selected);

  return (
    <View style={styles.container} testID="finder-screen">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          testID="back-button"
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>{"‹"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Calvin Finder</Text>
      </View>

      {/* Points of interest navbar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.poiNav}
        contentContainerStyle={styles.poiNavContent}
      >
        {POINTS_OF_INTEREST.map((poi) => {
          const isActive = activePois.has(poi);
          return (
            <Pressable
              key={poi}
              testID={`poi-${poi}`}
              style={styles.poiItem}
              onPress={() => togglePoi(poi)}
            >
              <View style={[styles.checkbox, isActive && styles.checkboxActive]}>
                {isActive && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.poiLabel}>{poi}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.mapContainer}>
        {/* Map */}
        <View style={styles.mapArea}>
          {LOCATIONS.map((loc) => (
            <View
              key={loc.name}
              style={[
                styles.pin,
                loc.name === selected && styles.pinActive,
                { top: loc.top, left: loc.left },
              ]}
            />
          ))}
        </View>

        {/* Dropdown */}
        <View style={styles.dropdownWrap}>
          <Pressable
            testID="location-dropdown-trigger"
            style={styles.dropdownTrigger}
            onPress={() => setOpen((v) => !v)}
          >
            <Text style={styles.dropdownTriggerText} numberOfLines={1}>
              {selected}
            </Text>
            <Text style={styles.dropdownChevron}>{open ? "▲" : "▼"}</Text>
          </Pressable>

          {open && (
            <View style={styles.dropdownList} testID="location-dropdown-list">
              {LOCATIONS.map((loc) => (
                <Pressable
                  key={loc.name}
                  testID={`location-option-${loc.name}`}
                  style={({ pressed }) => [
                    styles.dropdownItem,
                    pressed && styles.dropdownItemPressed,
                  ]}
                  onPress={() => {
                    setSelected(loc.name);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      loc.name === selected && styles.dropdownItemTextActive,
                    ]}
                  >
                    {loc.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {open && (
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        )}

        {/* Selected location card */}
        {activeLocation && (
          <View style={styles.resultCard} testID="result-card">
            <Text style={styles.resultTitle}>{activeLocation.name}</Text>
            <Text style={styles.resultSubtitle}>Showing on the map</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CARD_BG,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  backButton: {
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: INK,
    lineHeight: 26,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: INK,
  },
  poiNav: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  poiNavContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 20,
    alignItems: "center",
  },
  poiItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    flexShrink: 0,
  },
  checkboxActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  checkboxMark: {
    color: "#FFFFFF",
    fontSize: 8,
    lineHeight: 8,
    fontFamily: "Inter_700Bold",
  },
  poiLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    lineHeight: 16,
    color: INK,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: MAP_BG,
    overflow: "hidden",
  },
  mapArea: {
    ...StyleSheet.absoluteFill,
  },
  pin: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#A9C6EF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  pinActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ACCENT,
    borderWidth: 3,
  },

  // Dropdown
  dropdownWrap: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#0F1B2E",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dropdownTriggerText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: INK,
    flex: 1,
    marginRight: 8,
  },
  dropdownChevron: {
    fontSize: 11,
    color: SUBTLE,
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingVertical: 6,
    maxHeight: 320,
    overflow: "hidden",
    shadowColor: "#0F1B2E",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemPressed: {
    backgroundColor: "#F1F4F9",
  },
  dropdownItemText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14.5,
    color: INK,
  },
  dropdownItemTextActive: {
    fontFamily: "Inter_600SemiBold",
    color: ACCENT,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 5,
  },

  // Result card
  resultCard: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 32,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0F1B2E",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  resultTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: INK,
  },
  resultSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: SUBTLE,
    marginTop: 2,
  },
});

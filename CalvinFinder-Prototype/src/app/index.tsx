import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

const ACCENT = "#208AEF";
const ACCENT_DARK = "#1668BD";
const INK = "#101828";
const SUBTLE = "#5B6472";
const BG = "#F6F8FB";
const CARD_BG = "#FFFFFF";
const BORDER = "#E6EAF0";

const PROBLEM_BEATS = [
  {
    icon: "🗺️",
    title: "Static PDF maps",
    body: "Zoom, pinch, get lost. A campus map that can't tell you where you are isn't really a map.",
  },
  {
    icon: "🚪",
    title: "Room numbers are a mystery",
    body: "Which building is 301 even in? Floor directories don't help when you're already running late.",
  },
  {
    icon: "⏰",
    title: "First week is chaos",
    body: "New and transfer students lose real time every week one just trying to find the right door.",
  },
];

const FEATURES = [
  {
    icon: "🔍",
    title: "Classroom & Room Search",
    body: "Type a room or building name, get walking directions instantly.",
  },
  {
    icon: "🧭",
    title: "Points of Interest",
    body: "Restrooms, vending machines, water fountains, and printers — all mapped.",
  },
  {
    icon: "📍",
    title: "Live Campus Map",
    body: "An interactive map that actually knows where you're headed.",
  },
  {
    icon: "🎓",
    title: "Built for Students",
    body: "Designed around the real questions new students ask in week one.",
  },
];

const STEPS = [
  { number: "1", title: "Search", body: "Type a room, building, or POI." },
  { number: "2", title: "See it on the map", body: "Get pinned live on campus." },
  { number: "3", title: "Walk there", body: "Follow the route, arrive on time." },
];

const BUILT_WITH = ["Expo", "React Native", "Expo Router", "TypeScript"];

export default function Index() {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.pageInner}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CS262 · Software Engineering</Text>
        </View>

        <Text style={styles.heroTitle}>
          Calvin <Text style={{ color: ACCENT }}>Finder</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Find any classroom on campus in seconds.
        </Text>

        <PhoneMockup />

        <View style={styles.expoNote}>
          <View style={styles.expoDot} />
          <Text style={styles.expoNoteText}>
            Runs live right now on Expo Go — real software, not a mockup.
          </Text>
        </View>
      </View>

      {/* Problem / story */}
      <Section eyebrow="The Problem" title="Campus navigation is stuck in 2005.">
        <View style={{ gap: 16 }}>
          {PROBLEM_BEATS.map((beat) => (
            <View key={beat.title} style={styles.beatRow}>
              <Text style={styles.beatIcon}>{beat.icon}</Text>
              <View style={styles.beatTextWrap}>
                <Text style={styles.beatTitle}>{beat.title}</Text>
                <Text style={styles.beatBody}>{beat.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* Features */}
      <Section eyebrow="Features" title="Everything you need to get there.">
        <View style={[styles.grid, isWide && styles.gridWide]}>
          {FEATURES.map((f) => (
            <View
              key={f.title}
              style={[styles.card, isWide && styles.cardWide]}
            >
              <View style={styles.cardIconWrap}>
                <Text style={styles.cardIcon}>{f.icon}</Text>
              </View>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardBody}>{f.body}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* How it works */}
      <Section eyebrow="How It Works" title="Three steps. That's it.">
        <View style={[styles.steps, isWide && styles.stepsWide]}>
          {STEPS.map((s, i) => (
            <View key={s.number} style={styles.stepRow}>
              <View style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{s.number}</Text>
                </View>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepBody}>{s.body}</Text>
              </View>
              {i < STEPS.length - 1 && (
                <Text style={styles.stepArrow}>{isWide ? "→" : "↓"}</Text>
              )}
            </View>
          ))}
        </View>
      </Section>

      {/* Built with */}
      <View style={styles.builtWithWrap}>
        <Text style={styles.builtWithLabel}>Built with</Text>
        <View style={styles.builtWithRow}>
          {BUILT_WITH.map((tech) => (
            <View key={tech} style={styles.techPill}>
              <Text style={styles.techPillText}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer / CTA */}
      <View style={styles.footer}>
        <View style={styles.qrBox}>
          <Text style={styles.qrCorner}>◤</Text>
          <Text style={styles.qrLabel}>QR CODE</Text>
          <Text style={styles.qrCornerBottom}>◢</Text>
        </View>
        <Text style={styles.footerTitle}>Try it on Expo Go</Text>
        <Text style={styles.footerLink}>expo.dev/@calvinfinder/preview</Text>
        <Text style={styles.footerNote}>
          A student-built project for CS262 · Software Engineering.
        </Text>
      </View>
      </View>
    </ScrollView>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 20 }}>{children}</View>
    </View>
  );
}

function PhoneMockup() {
  return (
    <View style={styles.phoneFrame}>
      <View style={styles.phoneNotch} />
      <View style={styles.phoneScreen}>
        <View style={styles.phoneSearchBar}>
          <Text style={styles.phoneSearchIcon}>🔍</Text>
          <Text style={styles.phoneSearchPlaceholder}>Hiemenga 301</Text>
        </View>
        <View style={styles.phoneMapArea}>
          <View style={[styles.phonePin, { top: "35%", left: "28%" }]} />
          <View
            style={[
              styles.phonePin,
              styles.phonePinActive,
              { top: "55%", left: "58%" },
            ]}
          />
          <View style={[styles.phonePin, { top: "22%", left: "68%" }]} />
        </View>
        <View style={styles.phoneResultCard}>
          <Text style={styles.phoneResultTitle}>Hiemenga Hall · 301</Text>
          <Text style={styles.phoneResultSubtitle}>3 min walk · this way →</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingBottom: 64,
  },
  pageInner: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },

  // Hero
  hero: {
    alignItems: "center",
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  badge: {
    backgroundColor: "#EAF3FE",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 20,
  },
  badgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: ACCENT_DARK,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 40,
    color: INK,
    textAlign: "center",
  },
  heroSubtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 17,
    color: SUBTLE,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 320,
  },
  expoNote: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  expoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },
  expoNoteText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: SUBTLE,
  },

  // Phone mockup
  phoneFrame: {
    marginTop: 32,
    width: 240,
    height: 480,
    borderRadius: 36,
    backgroundColor: INK,
    padding: 10,
    shadowColor: "#0F1B2E",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  phoneNotch: {
    position: "absolute",
    top: 10,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 18,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: INK,
    zIndex: 2,
  },
  phoneScreen: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    paddingTop: 26,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  phoneSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F4F9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 6,
  },
  phoneSearchIcon: {
    fontSize: 12,
  },
  phoneSearchPlaceholder: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: INK,
  },
  phoneMapArea: {
    flex: 1,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#E7F0FE",
    overflow: "hidden",
  },
  phonePin: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#A9C6EF",
  },
  phonePinActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: ACCENT,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  phoneResultCard: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  phoneResultTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: INK,
  },
  phoneResultSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: SUBTLE,
    marginTop: 2,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  eyebrow: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: ACCENT,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: INK,
    marginTop: 8,
    maxWidth: 340,
  },

  // Problem beats
  beatRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
  },
  beatIcon: {
    fontSize: 22,
  },
  beatTextWrap: {
    flex: 1,
  },
  beatTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: INK,
  },
  beatBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    color: SUBTLE,
    marginTop: 4,
    lineHeight: 19,
  },

  // Features grid
  grid: {
    gap: 14,
  },
  gridWide: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 18,
    shadowColor: "#0F1B2E",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardWide: {
    width: "48%",
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF3FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 18,
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: INK,
  },
  cardBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13.5,
    color: SUBTLE,
    marginTop: 6,
    lineHeight: 19,
  },

  // Steps
  steps: {
    gap: 4,
  },
  stepsWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepItem: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 18,
    alignItems: "flex-start",
    minWidth: 0,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  stepNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  stepTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: INK,
  },
  stepBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: SUBTLE,
    marginTop: 4,
    lineHeight: 18,
  },
  stepArrow: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#C4CDD9",
    marginHorizontal: 8,
    marginVertical: 8,
    alignSelf: "center",
  },

  // Built with
  builtWithWrap: {
    alignItems: "center",
    marginTop: 64,
    paddingHorizontal: 24,
  },
  builtWithLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#9AA4B2",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  builtWithRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  techPill: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  techPillText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: SUBTLE,
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 56,
    paddingHorizontal: 24,
  },
  qrBox: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#C4CDD9",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CARD_BG,
  },
  qrCorner: {
    position: "absolute",
    top: 6,
    left: 8,
    fontSize: 12,
    color: "#C4CDD9",
  },
  qrCornerBottom: {
    position: "absolute",
    bottom: 6,
    right: 8,
    fontSize: 12,
    color: "#C4CDD9",
  },
  qrLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#9AA4B2",
    letterSpacing: 0.5,
  },
  footerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: INK,
    marginTop: 16,
  },
  footerLink: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: ACCENT,
    marginTop: 4,
  },
  footerNote: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    color: "#9AA4B2",
    marginTop: 18,
    textAlign: "center",
  },
});

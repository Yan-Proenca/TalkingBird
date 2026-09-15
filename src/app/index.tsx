import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Microfone & Áudio</Text>
        <Text style={styles.subtitle}>React Native + Expo</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Demonstração de Áudio</Text>

        <Text style={styles.cardText}>
          Este aplicativo demonstra como utilizar o microfone e a reprodução de
          áudio em um aplicativo React Native.
        </Text>
      </View>

      <Link href="/gravacao" style={styles.button}>
        Gravar Áudio
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101014",
    padding: 24,
    justifyContent: "center",
  },

  header: {
    marginBottom: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#A1A1AA",
    fontSize: 16,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#18181B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardText: {
    color: "#A1A1AA",
    fontSize: 15,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "rgb(220, 38, 38)",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  buttonSecondary: {
    backgroundColor: "#27272A",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 12,
  },
});

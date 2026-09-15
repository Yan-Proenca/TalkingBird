import { StyleSheet, Text, View } from "react-native";

interface RecordingStatusProps {
  isRecording: boolean;
}

export default function RecordingStatus({ isRecording }: RecordingStatusProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicator,
          isRecording ? styles.recording : styles.ready,
        ]}
      />

      <View>
        <Text style={styles.title}>
          {isRecording ? "Gravando..." : "Pronto para gravar"}
        </Text>

        <Text style={styles.subtitle}>
          {isRecording
            ? "O microfone está ativo"
            : "Clique em gravar para começar"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },

  indicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 14,
  },

  recording: {
    backgroundColor: "#EF4444",
  },

  ready: {
    backgroundColor: "#22C55E",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  subtitle: {
    color: "#71717A",
    fontSize: 13,
    marginTop: 3,
  },
});

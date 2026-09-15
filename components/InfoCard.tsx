import { StyleSheet, Text, View } from "react-native";

interface InfoCardProps {
  number: string;
  title: string;
  description: string;
}

export default function InfoCard({
  number,
  title,
  description,
}: InfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.number}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },

  number: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgb(220, 38, 38)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  numberText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  content: {
    flex: 1,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  description: {
    color: "#A1A1AA",
    lineHeight: 20,
    fontSize: 14,
  },
});

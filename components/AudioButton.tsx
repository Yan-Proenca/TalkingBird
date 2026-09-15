import { Pressable, StyleSheet, Text } from "react-native";

interface AudioButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "secondary";
  disabled?: boolean;
}

export default function AudioButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: AudioButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  primary: {
    backgroundColor: "rgb(220, 38, 38)",
  },

  danger: {
    backgroundColor: "rgb(220, 38, 38)",
  },

  secondary: {
    backgroundColor: "#27272A",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  disabled: {
    opacity: 0.4,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});

import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "body"
    | "caption";
  weight?:
    | "ultralight"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  weight,
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <RNText
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "body" ? styles.body : undefined,
        type === "caption" ? styles.caption : undefined,
        weight === "ultralight" ? styles.ultralight : undefined,
        weight === "thin" ? styles.thin : undefined,
        weight === "light" ? styles.light : undefined,
        weight === "normal" ? styles.normal : undefined,
        weight === "medium" ? styles.medium : undefined,
        weight === "semibold" ? styles.semibold : undefined,
        weight === "bold" ? styles.bold : undefined,
        weight === "heavy" ? styles.heavy : undefined,
        weight === "black" ? styles.black : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  // Weight variants
  ultralight: {
    fontWeight: "100",
  },
  thin: {
    fontWeight: "200",
  },
  light: {
    fontWeight: "300",
  },
  normal: {
    fontWeight: "400",
  },
  medium: {
    fontWeight: "500",
  },
  semibold: {
    fontWeight: "600",
  },
  bold: {
    fontWeight: "700",
  },
  heavy: {
    fontWeight: "800",
  },
  black: {
    fontWeight: "900",
  },
});

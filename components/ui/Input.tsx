import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

type InputSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
  size?: InputSize;
};

export const Input = forwardRef<TextInput, ThemedInputProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      lightBorderColor,
      darkBorderColor,
      lightPlaceholderColor,
      darkPlaceholderColor,
      placeholderTextColor,
      size = "md",
      ...rest
    },
    ref
  ) => {
    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");

    const borderColor = useThemeColor(
      {
        light: lightBorderColor || "#E5E5E5",
        dark: darkBorderColor || "#404040",
      },
      "icon"
    );

    const defaultPlaceholderColor = useThemeColor(
      {
        light: lightPlaceholderColor || "#9CA3AF",
        dark: darkPlaceholderColor || "#6B7280",
      },
      "icon"
    );

    const backgroundColor = useThemeColor({}, "background");

    return (
      <TextInput
        ref={ref}
        style={[
          styles.input,
          SIZE_STYLES[size],
          {
            backgroundColor: backgroundColor + "60",
            color: textColor,
            borderColor: borderColor,
            fontSize: FONT_SIZE_STYLES[size].fontSize,
          },
          style,
        ]}
        placeholderTextColor={placeholderTextColor || defaultPlaceholderColor}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  xs: {
    height: 28,
  },
  sm: {
    height: 36,
  },
  md: {
    height: 48,
  },
  lg: {
    height: 56,
  },
  xl: {
    height: 64,
  },
  xxl: {
    height: 72,
  },
});

const SIZE_STYLES = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  "2xl": styles.xxl,
} as const;

const FONT_SIZE_STYLES = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 22 },
} as const;

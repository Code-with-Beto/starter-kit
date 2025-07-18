import { useColorScheme } from "@/hooks/useColorScheme";
import {
  InputColorConfig,
  RADIUS_VALUES,
  UIColor,
  UIRadius,
  UISize,
  getColorValue,
} from "@/types/ui";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

type InputVariant = "solid" | "outline" | "soft" | "subtle";

const generateVariantConfig = (
  color: UIColor,
  colorScheme: "light" | "dark"
): Record<InputVariant, InputColorConfig> => {
  const isDark = colorScheme === "dark";

  if (color === "black") {
    const bgColor = getColorValue("black", 50);
    const textColor = getColorValue("black", 950);
    const borderColor = getColorValue("black", 200);
    const placeholderColor = getColorValue("black", 400);

    return {
      solid: {
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: `${borderColor}${isDark ? "40" : "30"}`,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
    };
  }

  if (color === "white") {
    const bgColor = getColorValue("white", 950);
    const textColor = getColorValue("white", 50);
    const borderColor = getColorValue("white", 800);
    const placeholderColor = getColorValue("white", 600);

    return {
      solid: {
        backgroundColor: bgColor,
        borderColor: borderColor,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: `${borderColor}${isDark ? "40" : "30"}`,
        textColor: textColor,
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
    };
  }

  return {
    solid: {
      backgroundColor: getColorValue(color, isDark ? 100 : 50),
      borderColor: getColorValue(color, isDark ? 400 : 300),
      textColor: getColorValue(color, isDark ? 50 : 950),
      placeholderColor: getColorValue(color, isDark ? 300 : 500),
      borderWidth: 1,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: getColorValue(color, isDark ? 400 : 300),
      textColor: getColorValue(color, isDark ? 50 : 950),
      placeholderColor: getColorValue(color, isDark ? 300 : 500),
      borderWidth: 1,
    },
    soft: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 100)}${
        isDark ? "20" : "30"
      }`,
      borderColor: "transparent",
      textColor: getColorValue(color, isDark ? 50 : 950),
      placeholderColor: getColorValue(color, isDark ? 300 : 500),
      borderWidth: 0,
    },
    subtle: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 100)}${
        isDark ? "20" : "30"
      }`,
      borderColor: `${getColorValue(color, isDark ? 400 : 300)}${
        isDark ? "40" : "50"
      }`,
      textColor: getColorValue(color, isDark ? 50 : 950),
      placeholderColor: getColorValue(color, isDark ? 300 : 500),
      borderWidth: 1,
    },
  };
};

export type ThemedInputProps = TextInputProps & {
  size?: UISize;
  variant?: InputVariant;
  color?: UIColor;
  radius?: UIRadius;
};

export const Input = forwardRef<TextInput, ThemedInputProps>(
  (
    {
      style,
      placeholderTextColor,
      size = "md",
      variant = "outline",
      color = "gray",
      radius = "default",
      ...rest
    },
    ref
  ) => {
    const colorScheme = useColorScheme();

    const variantConfig = useMemo(() => {
      const variants = generateVariantConfig(color, colorScheme ?? "light");
      return variants[variant];
    }, [color, colorScheme, variant]);

    const inputStyles = useMemo(() => {
      return [
        styles.input,
        SIZE_STYLES[size],
        {
          backgroundColor: variantConfig.backgroundColor,
          color: variantConfig.textColor,
          borderColor: variantConfig.borderColor,
          borderWidth: variantConfig.borderWidth,
          borderRadius: RADIUS_VALUES[radius],
          fontSize: FONT_SIZE_STYLES[size].fontSize,
        },
        style,
      ];
    }, [size, variantConfig, radius, style]);

    return (
      <TextInput
        ref={ref}
        style={inputStyles}
        placeholderTextColor={
          placeholderTextColor || variantConfig.placeholderColor
        }
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: { paddingHorizontal: 16 },
  xs: { height: 28 },
  sm: { height: 36 },
  md: { height: 48 },
  lg: { height: 56 },
  xl: { height: 64 },
  xxl: { height: 72 },
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

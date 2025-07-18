import { SFSymbol, SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface IconProps {
  symbol: SFSymbol;
  size?: IconSize | number;
  color?: string;
  style?: ViewStyle;
  type?: "monochrome" | "hierarchical" | "palette" | "multicolor";
}

const sizeMap: Record<IconSize, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 30,
  "2xl": 34,
};

export const Icon: React.FC<IconProps> = ({
  symbol,
  size = "md",
  color,
  style,
  type = "hierarchical",
}) => {
  const iconSize = typeof size === "string" ? sizeMap[size] : size;

  return (
    <SymbolView
      name={symbol}
      style={[styles.symbol, { width: iconSize, height: iconSize }, style]}
      tintColor={color}
      type={type}
    />
  );
};

const styles = StyleSheet.create({
  symbol: {
    width: 24,
    height: 24,
  },
});

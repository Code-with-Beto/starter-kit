import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UISize } from "@/types/ui";
import * as Haptics from "expo-haptics";
import { SFSymbol } from "expo-symbols";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Icon } from "./Icon";
import { Text } from "./Text";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface MinimalButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: "default" | "sm" | "lg" | "icon";
  symbol?: string;
  style?: ViewStyle;
  animateOnPress?: boolean;
  haptic?: boolean;
  hapticStyle?: Haptics.ImpactFeedbackStyle;
}

export function MinimalButton({
  children,
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "default",
  size = "default",
  symbol,
  style,
  animateOnPress = true,
  haptic = true,
  hapticStyle = Haptics.ImpactFeedbackStyle.Light,
}: MinimalButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scale = useSharedValue(1);

  // Theme colors
  const primaryColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");

  // Accent colors (lighter backgrounds)
  const accentBg = isDark ? "#18181b" : "#f4f4f5";
  const accentHoverBg = isDark ? "#27272a" : "#e4e4e7";

  // Secondary colors
  const secondaryBg = isDark ? "#27272a" : "#f4f4f5";

  // Destructive colors
  const destructiveBg = isDark ? "#dc262680" : "#ef4444";
  const destructiveText = "#ffffff";

  // Input background for dark mode outline
  const inputBg = isDark ? "#ffffff0a" : backgroundColor;
  const inputHoverBg = isDark ? "#ffffff14" : accentBg;

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: primaryColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };
      case "destructive":
        return {
          backgroundColor: destructiveBg,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };
      case "outline":
        return {
          backgroundColor: inputBg,
          borderWidth: 1,
          borderColor: isDark ? "#3f3f46" : borderColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };
      case "secondary":
        return {
          backgroundColor: secondaryBg,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
        };
      case "link":
        return {
          backgroundColor: "transparent",
        };
      default:
        return {};
    }
  };

  const getHoverStyles = (): ViewStyle => {
    switch (variant) {
      case "default":
        return { opacity: 0.9 };
      case "destructive":
        return { opacity: 0.9 };
      case "outline":
        return { backgroundColor: inputHoverBg };
      case "secondary":
        return { opacity: 0.8 };
      case "ghost":
        return { backgroundColor: isDark ? accentHoverBg : accentBg };
      case "link":
        return {};
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "default":
        return isDark ? "#09090b" : "#fafafa";
      case "destructive":
        return destructiveText;
      case "outline":
      case "secondary":
        return isDark ? "#fafafa" : "#09090b";
      case "ghost":
      case "link":
        return primaryColor;
      default:
        return textColor;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "sm":
        return {
          height: 32,
          paddingHorizontal: symbol && !title ? 10 : 12,
          borderRadius: 6,
          gap: 6,
        };
      case "lg":
        return {
          height: 40,
          paddingHorizontal: symbol && !title ? 16 : 24,
          borderRadius: 6,
          gap: 8,
        };
      case "icon":
        return {
          height: 36,
          width: 36,
          paddingHorizontal: 0,
          borderRadius: 6,
        };
      default:
        return {
          height: 36,
          paddingHorizontal: symbol && !title ? 12 : 16,
          borderRadius: 6,
          gap: 8,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case "sm":
        return { fontSize: 14, lineHeight: 20 };
      case "lg":
        return { fontSize: 16, lineHeight: 24 };
      default:
        return { fontSize: 14, lineHeight: 20 };
    }
  };

  const getIconSize = (): UISize => {
    switch (size) {
      case "sm":
        return "sm";
      case "lg":
        return "md";
      default:
        return "sm";
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const textStyles = getTextSize();
  const textColorValue = getTextColor();
  const hoverStyles = getHoverStyles();

  const isDisabled = disabled || loading;

  // Reset scale when loading state changes
  useEffect(() => {
    if (loading && scale.value !== 1) {
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 600,
        mass: 0.5,
      });
    }
  }, [loading, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!isDisabled) {
      // Haptic feedback on press down
      if (haptic) {
        Haptics.impactAsync(hapticStyle);
      }

      // Animation
      if (animateOnPress) {
        scale.value = withSpring(0.98, {
          damping: 20,
          stiffness: 600,
          mass: 0.5,
        });
      }
    }
  };

  const handlePressOut = () => {
    if (animateOnPress) {
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 600,
        mass: 0.5,
      });
    }
  };

  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator size="small" color={textColorValue} />
      ) : symbol ? (
        <Icon
          symbol={symbol as SFSymbol}
          size={getIconSize()}
          color={textColorValue}
        />
      ) : null}
      {title && !loading ? (
        <Text
          style={[
            styles.text,
            textStyles,
            { color: textColorValue },
            variant === "link" && styles.link,
          ]}
          weight="medium"
        >
          {title}
        </Text>
      ) : !title && !loading ? (
        children
      ) : null}
    </>
  );

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  if (animateOnPress) {
    return (
      <AnimatedPressable
        style={[
          animatedStyle,
          styles.button,
          variantStyles,
          sizeStyles,
          isDisabled && styles.disabled,
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isDisabled}
      >
        {buttonContent}
      </AnimatedPressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyles,
        sizeStyles,
        pressed && !isDisabled && hoverStyles,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      {buttonContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  disabled: {
    opacity: 0.5,
  },
});

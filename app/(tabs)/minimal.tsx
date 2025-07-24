import { MinimalButton } from "@/components/ui/MinimalButton";
import { Text } from "@/components/ui/Text";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function MinimalScreen() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAsyncAction = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: bottomTabBarHeight,
      }}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Variants</Text>
        <MinimalButton
          title="Default"
          onPress={() => console.log("Default pressed")}
        />
        <MinimalButton
          variant="secondary"
          title="Secondary"
          onPress={() => console.log("Secondary pressed")}
        />
        <MinimalButton
          variant="destructive"
          title="Destructive"
          onPress={() => console.log("Destructive pressed")}
        />
        <MinimalButton
          variant="outline"
          title="Outline"
          onPress={() => console.log("Outline pressed")}
        />
        <MinimalButton
          variant="ghost"
          title="Ghost"
          onPress={() => console.log("Ghost pressed")}
        />
        <MinimalButton
          variant="link"
          title="Link"
          onPress={() => console.log("Link pressed")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Sizes</Text>
        <View style={styles.row}>
          <MinimalButton
            size="sm"
            title="Small"
            onPress={() => console.log("Small pressed")}
          />
          <MinimalButton
            size="default"
            title="Default"
            onPress={() => console.log("Default pressed")}
          />
          <MinimalButton
            size="lg"
            title="Large"
            onPress={() => console.log("Large pressed")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Icons</Text>
        <View style={styles.row}>
          <MinimalButton
            symbol="envelope"
            title="Email"
            onPress={() => console.log("Email pressed")}
          />
          <MinimalButton
            variant="secondary"
            symbol="cloud"
            title="Cloud"
            onPress={() => console.log("Cloud pressed")}
          />
          <MinimalButton
            variant="outline"
            symbol="star"
            title="Star"
            onPress={() => console.log("Star pressed")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icon Only</Text>
        <View style={styles.row}>
          <MinimalButton
            size="icon"
            symbol="square.and.arrow.up"
            onPress={() => console.log("Share pressed")}
          />
          <MinimalButton
            size="icon"
            variant="outline"
            symbol="heart"
            onPress={() => console.log("Heart pressed")}
          />
          <MinimalButton
            size="icon"
            variant="ghost"
            symbol="gear"
            onPress={() => console.log("Settings pressed")}
          />
          <MinimalButton
            size="icon"
            variant="destructive"
            symbol="trash"
            onPress={() => console.log("Delete pressed")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <View style={styles.row}>
          <MinimalButton
            title="Disabled"
            disabled
            onPress={() => console.log("This won't fire")}
          />
          <MinimalButton
            variant="secondary"
            title="Disabled"
            disabled
            onPress={() => console.log("This won't fire")}
          />
          <MinimalButton
            variant="outline"
            title="Disabled"
            disabled
            onPress={() => console.log("This won't fire")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading States</Text>
        <View style={styles.row}>
          <MinimalButton
            loading
            title="Loading"
            onPress={() => console.log("Loading pressed")}
          />
          <MinimalButton
            loading
            variant="secondary"
            title="Loading"
            onPress={() => console.log("Loading pressed")}
          />
          <MinimalButton
            loading
            variant="outline"
            title="Loading"
            onPress={() => console.log("Loading pressed")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation & Haptics</Text>
        <MinimalButton
          title="With Animation (Default)"
          onPress={() => console.log("Animated pressed")}
        />
        <MinimalButton
          animateOnPress={false}
          title="Without Animation"
          onPress={() => console.log("No animation pressed")}
        />
        <MinimalButton
          haptic={false}
          title="Without Haptics"
          onPress={() => console.log("No haptics pressed")}
        />
        <MinimalButton
          hapticStyle={Haptics.ImpactFeedbackStyle.Heavy}
          title="Heavy Haptic"
          onPress={() => console.log("Heavy haptic pressed")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Async Loading Example</Text>
        <MinimalButton
          loading={isLoading}
          title={isLoading ? "Processing..." : "Start Async Task"}
          onPress={handleAsyncAction}
          symbol={isLoading ? undefined : "arrow.clockwise"}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Confirmation Alerts</Text>
        <MinimalButton
          variant="destructive"
          title="Delete Account"
          symbol="trash"
          onPress={() => console.log("Account deleted!")}
          confirmationAlert={{
            title: "Delete Account",
            message: "Are you sure you want to delete your account? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
            onCancel: () => console.log("Deletion cancelled"),
          }}
        />
        <MinimalButton
          variant="outline"
          title="Sign Out"
          symbol="arrow.right.square"
          onPress={() => console.log("Signed out!")}
          confirmationAlert={{
            title: "Sign Out",
            message: "Are you sure you want to sign out?",
          }}
        />
        <MinimalButton
          variant="secondary"
          title="Reset Settings"
          symbol="arrow.clockwise"
          onPress={() => console.log("Settings reset!")}
          confirmationAlert={{
            title: "Reset Settings",
            message: "This will restore all settings to their default values.",
            confirmText: "Reset",
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mixed Examples</Text>
        <MinimalButton
          variant="default"
          symbol="arrow.up.circle.fill"
          title="Upload File"
          onPress={() => console.log("Upload pressed")}
        />
        <MinimalButton
          variant="secondary"
          size="sm"
          symbol="doc.text"
          title="View Document"
          onPress={() => console.log("Document pressed")}
        />
        <MinimalButton
          variant="destructive"
          symbol="xmark.circle"
          title="Cancel Operation"
          onPress={() => console.log("Cancel pressed")}
        />
        <MinimalButton
          variant="outline"
          size="lg"
          symbol="checkmark.circle"
          title="Confirm Changes"
          onPress={() => console.log("Confirm pressed")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
});

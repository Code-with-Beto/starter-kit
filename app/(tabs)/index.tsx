import { Button } from "@/components/ui/Button";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Button
        title="Click me"
        variant="solid"
        color="black"
        radius="full"
        onPress={() => {}}
      />
      <Button
        title="Click me"
        variant="outline"
        color="indigo"
        size="xs"
        radius="none"
        onPress={() => {}}
      />
      <Button
        title="Click me"
        radius="sm"
        size="xl"
        variant="soft"
        color="red"
        onPress={() => {}}
        symbol="arrow.right"
      />
      <Button
        title="Click me"
        variant="subtle"
        color="violet"
        onPress={() => {}}
      />

      <Button
        title="Click me"
        variant="link"
        color="yellow"
        onPress={() => {}}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

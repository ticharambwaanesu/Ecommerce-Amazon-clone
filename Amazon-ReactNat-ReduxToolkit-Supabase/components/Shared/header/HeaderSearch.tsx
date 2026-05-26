import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import Icon from "@expo/vector-icons/Ionicons";
import { router, useSegments } from "expo-router";
import { useRef, useState } from "react";
import type { TextInput as TextInputType } from "react-native";
import { Pressable, TextInput, View } from "react-native";

export default function HeaderSearch() {
  const segments = useSegments();
  const ref = useRef<TextInputType>(null);
  const [query, setQuery] = useState("");
  const onPressIn = () => {
    if (segments[0] !== "(search)") router.push("/(search)");
  };
  const onGoBack = () => {
    setQuery("");
    router.dismissAll();
  };
  useDebouncedCallback(
    () => {
      if (query) router.setParams({ query });
      if (segments.length === 1 && segments[0] === "(search)") {
        ref.current?.focus();
      }
    },
    [query],
    500
  );
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {segments[0] === "(search)" && (
        <Pressable onPress={onGoBack}>
          <Icon name="arrow-back" color={"black"} size={24} />
        </Pressable>
      )}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          flex: 9,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#a4a5a6",
          borderRadius: 8,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Icon name="search" color={"black"} size={24} />
        <TextInput
          ref={ref}
          value={query}
          onPressIn={onPressIn}
          onChangeText={setQuery}
          editable={segments[0] === "(search)"}
          placeholder="Search Amazon"
          style={{
            width: "75%",
            backgroundColor: "white",
            fontWeight: "800",
            fontSize: 20,
            borderWidth: 0,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        />
        <Icon name="scan" color={"black"} size={24} />
      </View>
    </View>
  );
}

import { AmazonEmberBold } from "@/utils/Constant";
import { Text, View } from "react-native";

export interface HeaderTabsProps {
  tabs:
    | {
        title: string;
        onPress: VoidFunction;
        active?: boolean;
      }[]
    | null;
}

export function HeaderTabs({ tabs }: HeaderTabsProps) {
  if (!tabs?.length) return null;

  return (
    <View style={{ flexDirection: "row", gap: 40, paddingHorizontal: 20 }}>
      {tabs.map((tab) => (
        <Text
          style={{
            fontSize: 16,
            fontFamily: AmazonEmberBold,
            borderBottomColor: tab.active ? "black" : "transparent",
            borderBottomWidth: tab.active ? 2.5 : 0,
            paddingBottom: 10,
            marginBottom: -10,
          }}
          key={tab.title}
          onPress={tab.onPress}
        >
          {tab.title}
        </Text>
      ))}
    </View>
  );
}

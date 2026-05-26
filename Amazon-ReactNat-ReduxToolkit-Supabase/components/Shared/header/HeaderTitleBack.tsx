import { AmazonEmberBold, AmazonEmberLight } from "@/utils/Constant";
import { Pressable, Text } from "react-native";

export function HeaderTitle() {
  return (
    <Text style={{ fontSize: 18, fontFamily: AmazonEmberBold }}>Amazon.in</Text>
  );
}
export function HeaderLeftBack({ onPress }: { onPress: VoidFunction }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ fontSize: 18, fontFamily: AmazonEmberLight }}>Back</Text>
    </Pressable>
  );
}

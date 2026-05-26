import { AmazonEmber } from "@/utils/Constant";
import { Dimensions, Image, Text, View } from "react-native";

const items = {
  box: {
    id: 1,
    icon: require("@/assets/images/amazon-images/box.png"),
    text: "Check order status and track, change or return items.",
  },
  bag: {
    id: 2,
    icon: require("@/assets/images/amazon-images/bag.png"),
    text: "Shop past purchases and everyday essentials",
  },
  receipt: {
    id: 3,
    icon: require("@/assets/images/amazon-images/receipt.png"),
    text: "Create lists with items you want now or later",
  },
};

export default function ProfileUnauthoredBanner() {
  return (
    <View style={{ marginHorizontal: 24, gap: 60, alignItems: "center" }}>
      {Object.entries(items).map(([_, { id, icon, text }]) => (
        <View key={id} style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={icon}
            style={{ width: 60, height: 60, alignSelf: "center" }}
          />
          <Text
            style={{
              maxWidth: Dimensions.get("window").width - 100,
              fontSize: 20,
              fontFamily: AmazonEmber,
            }}
          >
            {text}
          </Text>
        </View>
      ))}
    </View>
  );
}

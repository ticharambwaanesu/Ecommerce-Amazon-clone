import { AmazonEmberBold } from "@/utils/Constant";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const IMG_SUG_1 = require("@/assets/images/amazon-images/sug-1.png");
const IMG_SUG_2 = require("@/assets/images/amazon-images/sug-2.png");
const IMG_SUG_3 = require("@/assets/images/amazon-images/sug-3.png");
const IMG_SUG_4 = require("@/assets/images/amazon-images/sug-4.png");
const IMG_SUG_5 = require("@/assets/images/amazon-images/sug-5.png");
const IMG_SUG_6 = require("@/assets/images/amazon-images/sug-6.png");
const IMG_SUG_7 = require("@/assets/images/amazon-images/sug-7.png");
const IMG_SUG_8 = require("@/assets/images/amazon-images/sug-8.png");

const images = [
  IMG_SUG_1,
  IMG_SUG_2,
  IMG_SUG_3,
  IMG_SUG_4,
  IMG_SUG_5,
  IMG_SUG_6,
  IMG_SUG_7,
  IMG_SUG_8,
];

export default function HomeSuggestions() {
  return (
    <View
      style={{
        height: 210,
        width: Dimensions.get("window").width,
        position: "absolute",
        top: 279,
      }}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              width: 150,
              height: 200,
              borderRadius: 4,
              marginLeft: 20,
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
              ...Platform.select({
                android: {
                  elevation: 6,
                },
              }),
            }}
          >
            <Text
              style={{
                fontFamily: AmazonEmberBold,
                paddingHorizontal: 10,
                paddingBottom: 25,
                paddingTop: 10,
              }}
            >
              New Arrivals
            </Text>
            <Image
              source={image}
              style={{
                width: "100%",
                height: 150,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

const IMG_CS_01 = require("@/assets/images/amazon-images/slide-1.webp");
const IMG_CS_02 = require("@/assets/images/amazon-images/slide-2.webp");
const IMG_CS_03 = require("@/assets/images/amazon-images/slide-4.png");
const IMG_CS_04 = require("@/assets/images/amazon-images/slide-3.webp");
const IMG_CS_05 = require("@/assets/images/amazon-images/slide-5.jpg");
const IMG_CS_06 = require("@/assets/images/amazon-images/slide-6.png");
const IMG_CS_07 = require("@/assets/images/amazon-images/slide-7.jpg");

const images = [
  IMG_CS_01,
  IMG_CS_02,
  IMG_CS_03,
  IMG_CS_04,
  IMG_CS_05,
  IMG_CS_06,
  IMG_CS_07,
];
const { width } = Dimensions.get("window");
export default function HomeCarousel() {
  const ref = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % images.length;
      ref.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    currentIndex.current = index;
    setActiveIndex(index);
  };
  return (
    <View>
      <FlatList
        ref={ref}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image
              source={item}
              style={{ width: "100%", height: 280 }}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          ></View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dotsContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#0774d4ff",
    width: 10,
    height: 10,
  },
  inactiveDot: {
    backgroundColor: "white",
    borderColor: "#0774d4ff",
    borderWidth: 1,
    width: 10,
    height: 10,
  },
});

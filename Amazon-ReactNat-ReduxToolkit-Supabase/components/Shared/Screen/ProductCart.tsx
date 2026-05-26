import { persistor } from "@/store";
import { addItem, removeItem } from "@/store/slices/cartSlice";
import { Product } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
interface Props {
  product: Product;
  quantity: number;
}

export default function ProductCart({ product, quantity }: Props) {
  const dispatch = useDispatch();
  const handleItemAdd = (product: Product, quantity: number) => {
    persistor.purge().then(() => {
      dispatch(addItem({ product, quantity }));
    });
  };
  const handleItemRemove = (product: Product, quantity: number) => {
    persistor.purge().then(() => {
      dispatch(removeItem({ product, quantity }));
    });
  };
  return (
    <View style={{ gap: 10, marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f1f1f1",
          minHeight: 200,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: product.imageUrl ?? "" }}
          style={{
            width: "35%",
            height: "100%",
            backgroundColor: "#ccc",
            padding: 10,
          }}
        />
        <View
          style={{ width: "65%", padding: 20, justifyContent: "space-between" }}
        >
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={{ fontSize: 16, marginBottom: 5 }}
          >
            {product.name}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            ₹{product.currentPrice}
          </Text>
          {product.isAmazonChoice && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={{ width: 70, height: 30, marginVertical: 5 }}
            />
          )}
          <Text style={{ fontSize: 14, color: "#333" }}>
            {product.deliveryPrice === 0 ? "FREE" : `₹${product.deliveryPrice}`}{" "}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#f1b023",
            paddingVertical: 8,
            paddingHorizontal: 16,
            gap: 8,
          }}
          onPress={() => handleItemAdd(product, 1)}
        >
          <Text style={{ fontWeight: "bold", marginRight: "auto" }}>
            {quantity}
          </Text>
          <MaterialCommunityIcons name="plus" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleItemRemove(product, 1)}
          style={{
            flexDirection: "row",
            alignItems: "center",

            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#999",
            backgroundColor: "#fff",
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import DefaultButton from "@/components/Shared/DefaultButton";
import { addItem } from "@/store/slices/cartSlice";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { deliveryDate } from "@/utils/deliveryDate";
import { OffPercentage } from "@/utils/offPercentage";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const fetchProducts = useCallback(async () => {
    try {
      const { data = null } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!data) router.back();
      setProduct(data);
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);
  const onViewType = (viewType: "3D" | "AR") => {
    router.push(`/product/[id]/${viewType}?modelUrl=${product?.model3DUrl}`);
  };
  const onSelectQuantity = (num: number) => {
    setQuantity(num);
    setSelectOpen(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  if (!product) return null;
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "white",
          gap: 20,
        }}
      >
        <Text style={{ color: "#4B5563" }}>{product.name}</Text>
        <Image
          source={{
            uri: product.imageUrl ?? "",
          }}
          style={{
            height: 300,
            resizeMode: "contain",
            width: "100%",
            backgroundColor: "#f8f8f8",
          }}
        />
        {product.model3DUrl && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            {["3D", "AR"].map((viewType) => (
              <TouchableOpacity
                key={viewType}
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  borderColor: "#0e4db3",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
                onPress={() => onViewType(viewType as "3D" | "AR")}
              >
                <MCIcon name="arrow-u-left-bottom" size={20} color="#0e4db3" />
                <Text style={{ color: "#0e4db3", fontSize: 13 }}>
                  {viewType === "3D" ? "VIEW IN 3D" : "VIEW IN YOUR ROOM"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {product.previousPrice > product.currentPrice && (
            <Text style={{ color: "#dc2626", fontSize: 30 }}>
              -{OffPercentage(product.currentPrice, product.previousPrice)}
            </Text>
          )}
          <Text style={{ fontSize: 30 }}>
            <Text style={{ fontSize: 20 }}>₹</Text>
            {product.currentPrice}
          </Text>
        </View>
        <Text
          style={{
            textDecorationLine: "line-through",
            color: "gray",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          RRP: ₹{product.previousPrice}
        </Text>
        {product.isAmazonChoice && (
          <Image
            source={require("@/assets/images/amazon-images/prime-label.png")}
            style={{ height: 30, width: 70 }}
          />
        )}
        <Text>
          The prices of products sold on Amazon include GST. Depending on your
          delivery address, GST may vary at the checkout.
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text>
            {product.deliveryPrice === 0 ? "FREE" : `₹${product.deliveryPrice}`}{" "}
            Delivery{" "}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            {deliveryDate(product.deliveryInDays)}
          </Text>
        </View>
        <View style={{ gap: 20, marginBottom: 30 }}>
          {product.amountInStock > 20 ? (
            <Text style={{ fontSize: 20, color: "green" }}>In Stock</Text>
          ) : (
            <Text style={{ fontSize: 20, color: "red" }}>
              {product.amountInStock} In Stock
            </Text>
          )}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              backgroundColor: "#eee",
              borderRadius: 8,
            }}
            onPress={() => setSelectOpen((prev) => !prev)}
          >
            <Text> Quantity: {quantity}</Text>
            <MCIcon name="chevron-down" />
          </TouchableOpacity>
          <DefaultButton
            onPress={() => dispatch(addItem({ product, quantity }))}
          >
            Add To basket
          </DefaultButton>
          <DefaultButton
            style={{ backgroundColor: "#f97316" }}
            onPress={() => {
              router.push({
                pathname: "/(buyer_zone)/buy_here",
                params: {
                  name: product.name,
                  quantity: quantity,
                  deliveryInDays: product.deliveryInDays,
                  productImage: product.imageUrl,
                  deliveryCharge: product.deliveryPrice - product.currentPrice,
                  currentPrice: product.currentPrice,
                  achoice: String(product.isAmazonChoice),
                  deliveryPrice: product.deliveryPrice,
                  sellerId: product.user_id,
                },
              });
            }}
          >
            Buy Now
          </DefaultButton>
        </View>
      </ScrollView>
      <Modal visible={selectOpen} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setSelectOpen(false)}
        >
          <View
            style={{
              width: "25%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <FlatList
              data={[1, 2, 3, 4, 5]}
              keyExtractor={(item) => item.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelectQuantity(item)}>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

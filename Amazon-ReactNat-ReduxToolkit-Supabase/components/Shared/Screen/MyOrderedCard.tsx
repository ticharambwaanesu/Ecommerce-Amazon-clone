import { RootState } from "@/store";
import { setShippedCount } from "@/store/slices/shippedCountSlice";
import { supabase } from "@/supabase";
import { Order } from "@/types/order";
import { AmazonEmber, AmazonEmberBold } from "@/utils/Constant";
import { getUnshippedCount } from "@/utils/getUnshippedCount";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MyOrderedCard({ order }: { order: Order }) {
  const [shipped, setShipped] = useState(order.is_shipped);
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();
  const checkShipped = async (newValue: boolean) => {
    setShipped(newValue);
    const { data, error } = await supabase
      .from("orders")
      .update({ is_shipped: newValue })
      .eq("id", order.id)
      .eq("seller_id", session?.user.id)
      .select();
    if (error) {
      console.error("Update failed: ", error);
    } else {
      const count = await getUnshippedCount(session?.user.id);
      if (count !== null) {
        dispatch(setShippedCount(count));
      }
    }
  };
  return (
    <View
      style={{
        marginBottom: 10,
        height: 110,
        backgroundClip: "#d8d8d8ff",
        paddingVertical: 14,
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: order.image ?? "" }}
        style={{
          objectFit: "contain",
          height: 80,
          width: 80,
          alignSelf: "center",
          borderRadius: 10,
          marginLeft: 10,
        }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            width: "84%",
          }}
        >
          <View style={{ width: "60%", gap: 6 }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontSize: 20,
                alignSelf: "flex-start",
                fontFamily: AmazonEmberBold,
              }}
            >
              {order.product_name.split(" ").length > 8
                ? order.product_name.split(" ").slice(0, 8).join(" ") + "..."
                : order.product_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "flex-start",
                fontFamily: AmazonEmber,
              }}
            >{`Current Price: ₹${order.current_price}`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              value={shipped}
              onValueChange={checkShipped}
              style={{ alignSelf: "flex-start" }}
              color={shipped ? "#f1b023ff" : undefined}
            />
            <Text
              style={{
                marginLeft: 6,
                fontFamily: AmazonEmberBold,
                fontSize: 16,
              }}
            >
              Shipped
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            marginTop: 6,
            fontFamily: AmazonEmber,
          }}
        >{`Address: ${order.delivery_address}`}</Text>
      </View>
    </View>
  );
}

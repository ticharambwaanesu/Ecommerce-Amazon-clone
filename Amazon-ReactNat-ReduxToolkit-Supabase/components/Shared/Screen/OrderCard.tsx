import { Order } from "@/types/order";
import { AmazonEmberBold } from "@/utils/Constant";
import { Image, Text, View } from "react-native";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <>
      <View
        style={{
          height: 100,
          width: "100%",
          flexDirection: "row",
          gap: 10,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: order.image ?? "" }}
          style={{
            objectFit: "contain",
            height: 100,
            width: 100,
            alignSelf: "center",
            borderRadius: 20,
          }}
        />
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: AmazonEmberBold }}>
            {order.product_name.split(" ").length > 4
              ? order.product_name.split(" ").slice(0, 4).join(" ") + "..."
              : order.product_name}
          </Text>
          <Text>{`Sub Total ₹ ${order.total}`}</Text>
          <Text>{`Quantity ₹ ${order.quantity}`}</Text>
          <Text>{order.delivery_date}</Text>
          {order.is_shipped ? (
            <Text style={{ color: "green" }}>Product Shipped</Text>
          ) : (
            <Text>Oreder pending..</Text>
          )}
        </View>
      </View>
    </>
  );
}

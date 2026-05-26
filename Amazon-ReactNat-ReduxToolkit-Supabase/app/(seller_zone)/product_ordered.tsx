import MyOrderedCard from "@/components/Shared/Screen/MyOrderedCard";
import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function ProductOrder() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [ordered, setOrder] = useState<Order[]>([]);
  const getMyOrders = async () => {
    const { data = [] } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", session?.user.id)
      .order("created_at", { ascending: false });
    setOrder(data as Order[]);
  };
  useEffect(() => {
    getMyOrders();
  }, [ordered]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      {ordered.map((order) => (
        <MyOrderedCard key={order.id} order={order} />
      ))}
    </View>
  );
}

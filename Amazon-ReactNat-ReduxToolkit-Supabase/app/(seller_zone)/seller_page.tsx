import DefaultButton from "@/components/Shared/DefaultButton";
import MyProductCard from "@/components/Shared/Screen/MyProductCard";
import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function SellerPage() {
  const goCreateProduct = () => router.push("/create_product");
  const session = useSelector((state: RootState) => state.auth.session);
  const [myProduct, setMyProduct] = useState<Product[]>([]);
  const getMyProduct = async () => {
    const { data = [] } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });
    setMyProduct(data as Product[]);
  };
  useEffect(() => {
    getMyProduct();
  }, [myProduct]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      <DefaultButton style={{ width: "100%" }} onPress={goCreateProduct}>
        Create Product
      </DefaultButton>
      {myProduct.map((product) => (
        <MyProductCard key={product.id} product={product} />
      ))}
    </View>
  );
}

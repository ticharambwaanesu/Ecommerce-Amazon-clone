import ProductDealCard from "@/components/Shared/Screen/ProductDealCard";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { AmazonEmber } from "@/utils/Constant";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Search() {
  const { query } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = useCallback(async () => {
    if (!query) return setProducts([]);
    try {
      const { data = [] } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);
      setProducts(data as Product[]);
    } catch (error) {
      console.log(error);
    }
  }, [query]);
  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}`);
  };
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={products}
        style={{ padding: 20 }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 20,
              fontFamily: AmazonEmber,
              alignSelf: "center",
            }}
          >
            No Products found
          </Text>
        }
        renderItem={({ item: product }) => (
          <ProductDealCard
            product={product}
            onPress={() => onProductPress(product)}
          />
        )}
      />
    </View>
  );
}

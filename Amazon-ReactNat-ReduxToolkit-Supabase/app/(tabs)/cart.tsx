import DefaultButton from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import ProductCart from "@/components/Shared/Screen/ProductCart";
import { persistor, RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { supabase } from "@/supabase";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subTotal);
  const session = useSelector((state: RootState) => state.auth.session);
  const [addressData, setAddressData] = useState<any | null>(null);
  const onClickSignIn = () => router.push("/(auth)");
  const onClickSignUp = () => router.push("/(auth)/signup");
  const getUserAddress = async () => {
    const { data: address, error: err } = await supabase
      .from("profiles")
      .select("full_name, location")
      .eq("id", session?.user.id)
      .single();
    setAddressData(address);
  };

  const hendleClearCart = async () => {
    const formattedOrders = items.map((item) => {
      const { product, quantity } = item;
      return {
        product_name: product.name,
        delivery_address: `${addressData?.full_name} ${addressData.location}`,
        image: product.imageUrl,
        buyer_id: session?.user.id,
        current_price: product.currentPrice,
        delivery_date: deliveryDate(Number(product.deliveryInDays)),
        delivery_price: product.deliveryPrice,
        seller_id: product.user_id,
        quantity,
        total: Number(product.deliveryPrice) * Number(quantity),
      };
    });
    const { data, error } = await supabase
      .from("orders")
      .insert(formattedOrders);
    if (error) {
      console.error("Error placing order:", error.message);
    }
    persistor.purge().then(() => {
      console.log("Persisted cart cleared!");
      dispatch(clearCart());
    });
    router.push("/(buyer_zone)/thanks_buying");
  };
  const navigation = useNavigation();
  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Basket",
      onPress: () => Alert.alert("Basket"),
    },
  ];
  useEffect(() => {
    getUserAddress();
  }, [addressData]);
  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, [navigation]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <DeliveryLocation />
      <View style={styles.innerContainer}>
        {items.length ? (
          <>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal:</Text>
              <Text style={styles.subtotalLabel}>₹{subtotal}</Text>
            </View>
            {session && (
              <DefaultButton
                onPress={hendleClearCart}
              >{`Process to checkout (${items.length}) items`}</DefaultButton>
            )}
            {items.map((item) => (
              <ProductCart key={item.product.id} {...item} />
            ))}
          </>
        ) : (
          <>
            <Image
              source={require("@/assets/images/amazon-images/empty-cart.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>Your Amazon cart is empty</Text>
            <Text style={styles.emptySubtitle}>Good stuff goes here</Text>
          </>
        )}
        {!session && (
          <View style={styles.authButtons}>
            <DefaultButton onPress={onClickSignIn}>Sign In</DefaultButton>
            <DefaultButton onPress={onClickSignUp} variant="secondary">
              Create Account
            </DefaultButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  subtotalRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  subtotalLabel: {
    marginRight: 10,
    fontSize: 26,
  },
  emptyImage: {
    width: 300,
    height: 200,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  emptySubtitle: {
    fontSize: 18,
    color: "#666",
  },
  authButtons: {
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
});

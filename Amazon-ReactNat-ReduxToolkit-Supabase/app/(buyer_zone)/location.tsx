import { RootState } from "@/store";
import { supabase } from "@/supabase";
import { AmazonEmber } from "@/utils/Constant";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

export default function Location() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchText = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("location, full_name")
      .eq("id", session?.user.id)
      .single();
    if (data) {
      setLocation(data.location);
      setName(data.full_name);
    }
    if (error) {
      console.log("Fetxh error:", error);
    }
  };
  useEffect(() => {
    fetchText();
  }, []);
  const handleNameChange = async (value: string) => {
    setLoading(true);
    setName(value);

    const { error } = await supabase.from("profiles").upsert({
      id: session?.user.id,
      full_name: value,
    });
    setLoading(false);
    if (error) console.log("Save error:", error);
  };
  const handleLocationChange = async (value: string) => {
    setLoading(true);
    setLocation(value);
    const { error } = await supabase.from("profiles").upsert({
      id: session?.user.id,
      location: value,
    });
    setLoading(false);
    if (error) console.log("Save error:", error);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 20,
        gap: 14,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: AmazonEmber }}>Name</Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        style={{
          borderColor: "black",
          padding: 8,
          fontFamily: AmazonEmber,
          borderWidth: 1,
          borderRadius: 8,
          minHeight: 50,
          textAlignVertical: "top",
          fontSize: 16,
        }}
        placeholder="Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={{ fontSize: 20, fontFamily: AmazonEmber }}>
        Give Delivery Address
      </Text>
      <TextInput
        value={location}
        onChangeText={handleLocationChange}
        multiline
        style={{
          borderColor: "black",
          padding: 8,
          fontFamily: AmazonEmber,
          borderWidth: 1,
          borderRadius: 8,
          minHeight: 100,
          textAlignVertical: "top",
          fontSize: 16,
        }}
        placeholder="Enter Delivery Location"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AntDesign
        name="checkcircle"
        size={18}
        color={loading ? "#747775ff" : "green"}
        style={{
          position: "absolute",
          right: 25,
          top: 65,
        }}
      />
      <AntDesign
        name="checkcircle"
        size={18}
        color={loading ? "#747775ff" : "green"}
        style={{
          position: "absolute",
          right: 25,
          top: 218,
        }}
      />
    </View>
  );
}

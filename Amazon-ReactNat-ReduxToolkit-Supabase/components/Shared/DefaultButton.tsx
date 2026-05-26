import { AmazonEmber } from "@/utils/Constant";
import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props
  extends Omit<ComponentProps<typeof TouchableOpacity>, "variant"> {
  onPress: VoidFunction;
  variant?: "primary" | "secondary";
}

export default function DefaultButton({
  onPress,
  variant = "primary",
  children,
  style,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 20,
          height: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: variant === "primary" ? "#f8ab05ff" : "white",
          borderColor: variant === "primary" ? "#f8ab05ff" : "gray",
          borderWidth: variant === "primary" ? 0 : 1,
          opacity: props.disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: variant === "primary" ? "white" : "black",
          fontFamily: AmazonEmber,
          fontSize: 18,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

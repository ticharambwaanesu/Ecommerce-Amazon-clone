import { TextInputProps, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

interface Props extends TextInputProps {
  onTextChange: (value: string) => void;
}

export default function OtpNumInput({ onTextChange }: Props) {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <OtpInput
        focusColor={"#f1b023ff"}
        type="numeric"
        numberOfDigits={6}
        onTextChange={onTextChange}
        autoFocus={true}
        theme={{
          containerStyle: {
            justifyContent: "center",
            gap: 8,
            alignItems: "center",
            height: 1,
            width: 10,
            marginVertical: 30,
          },
          pinCodeTextStyle: { color: "black" },
          focusStickStyle: { borderColor: "#f1b023ff" },
          pinCodeContainerStyle: { backgroundColor: "white" },
        }}
      />
    </View>
  );
}

import { supabase } from "@/supabase";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import DefaultButton from "../DefaultButton";
export default function BottomSheetComponent({ bottomSheetRef }: any) {
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const onClickSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/(tabs)");
  };
  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChange}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "white" }}
      handleIndicatorStyle={{ backgroundColor: "black" }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
      )}
    >
      <BottomSheetView>
        <TouchableOpacity
          onPress={handleClosePress}
          style={{
            alignSelf: "flex-end",
            marginRight: 20,
          }}
        >
          <FontAwesome name="close" size={20} color={"black"} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            gap: 8,
            marginTop: 18,
            justifyContent: "flex-start",
            paddingHorizontal: 16,
          }}
        >
          <DefaultButton onPress={onClickSignOut}>Sign Out</DefaultButton>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

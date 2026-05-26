import {
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "./GradientBackground";
import HeaderSearch from "./HeaderSearch";
import { HeaderTabs, HeaderTabsProps } from "./HeaderTabs";

export interface CustomHeaderProps {
  headerSearchShown?: boolean;
  headerTabsProps?: HeaderTabsProps;
}
export interface StackHeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & CustomHeaderProps;
}

export interface TabsHeaderProps extends BottomTabHeaderProps {
  options: BottomTabNavigationOptions & CustomHeaderProps;
}

export default function Header({
  options,
}: StackHeaderProps | TabsHeaderProps) {
  const edgeInsets = useSafeAreaInsets();
  const hasCustomHeader =
    options.headerLeft || options.headerRight || options.headerTitle;
  if (hasCustomHeader) {
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: edgeInsets.top,
          }}
        >
          <View style={{ flex: 1 }}>
            {/* @ts-ignore */}
            {options.headerLeft && options.headerLeft()}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* @ts-ignore */}
            {options.headerTitle && options.headerTitle()}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* @ts-ignore */}
            {options.headerRight && options.headerRight()}
          </View>
        </View>
        <GradientBackground />
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={{
          backgroundColor: "transparent",
          gap: 20,
          paddingBottom: 10,
          marginTop: edgeInsets.top,
        }}
      >
        {options.headerSearchShown && <HeaderSearch />}
        {options.headerTabsProps && <HeaderTabs {...options.headerTabsProps} />}
      </View>
      <GradientBackground />
    </View>
  );
}

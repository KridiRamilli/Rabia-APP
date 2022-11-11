import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import { ICONS } from "../constants";
import { Dhikr, Settings } from "../screens";
import { COLORS, FONTS, SIZES } from "../theme/theme";
const Stack = createNativeStackNavigator();

const SettingsStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{
					title: "Settings",
					headerRight: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate("PrayerTimes")}
						>
							<Image
								source={ICONS.close_icon}
								style={{
									width: 25,
									height: 25,
									marginLeft: 10,
								}}
							/>
						</TouchableOpacity>
					),
					headerTitleStyle: {
						...FONTS.h4,
						fontSize: SIZES.font + 4,
					},
				}}
			/>
			<Stack.Screen
				name="Notifications"
				component={Dhikr}
				options={{
					title: "Notifications",
					headerStyle: {
						backgroundColor: COLORS.transparent,
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						...FONTS.h4,
						fontSize: SIZES.font + 4,
					},
				}}
			/>
		</Stack.Navigator>
	);
};

export default SettingsStack;

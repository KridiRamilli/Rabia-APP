import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const getLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	//TODO Case if location denied
	// if (status !== "granted") {
	// 	alert("");
	// }
	return status;
};

export const getLocationAddress = async () => {
	let status = await getLocationPermission();
	let result = "";
	if (status === "granted") {
		const location = await Location.getCurrentPositionAsync({
			// measured in meters
			accuracy: 200,
			distanceInterval: 200,
		});
		//returns array with address obj
		const [address] = await Location.reverseGeocodeAsync(location.coords);
		const { district, city } = address;

		if (district && city) {
			result = `${district}, ${city}`;
			return result;
		}
		result = `${city || ""}`;
	}
	return result;
};

const getLocationHeading = async () => {
	// data["location"] = await Location.getHeadingAsync();
	// data["heading"] = await Location.watchHeadingAsync((heading) => {
	// 	console.log(heading);
	// });
};

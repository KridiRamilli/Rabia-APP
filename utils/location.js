import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const getLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		alert("Permission to access location was denied");
	}
	return status;
};

const getLocationData = async () => {
	let status = await getLocationPermission();
	const data = {
		location: {},
		heading: {},
		address: {},
	};
	if (status === "granted") {
		let location = await Location.getCurrentPositionAsync({});
		data["location"] = await Location.getHeadingAsync();
		data["heading"] = await Location.watchHeadingAsync((heading) => {
			console.log(heading);
		});
		data["address"] = await Location.reverseGeocodeAsync(location.coords);
	}
};

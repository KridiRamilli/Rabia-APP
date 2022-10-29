import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const requestLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	return status;
};
export const getLocationPermission = async () => {
	let { granted } = await Location.getForegroundPermissionsAsync();
	return granted;
};

export const getLocationCoords = async () => {
	let granted = await getLocationPermission();
	if (!granted) {
		//TODO handle error
		return;
	}
	const location = await Location.getCurrentPositionAsync({
		// measured in meters
		accuracy: 100,
		distanceInterval: 100,
	});
	return location;
};

export const getLocationAddress = async () => {
	//TODO handle error when locatation !granted
	let result = "";
	const location = await getLocationCoords();
	//returns array with address obj
	const [address] = await Location.reverseGeocodeAsync(location.coords);
	const { region, city } = address;

	if (region && city) {
		result = `${city}, ${region}`;
		return result;

		result = `${region || ""}`;
	}
	return result;
};

export const getLocationHeading = async (handleHeadingChange) => {
	const subscription = await Location.watchHeadingAsync(handleHeadingChange);
	return subscription;
};

export const degree = (magHeading) => {
	return magHeading >= 0 ? magHeading - 90 : magHeading + 271;
};

export const calculateQiblaAngle = (lat, lon) => {
	let PI = Math.PI;
	if (typeof lat !== "number" || typeof lon !== "number") {
		throw new Error("Non-numeric entry/entries");
	}
	if (lat > 90.0 || lat < -90.0) {
		throw new Error("Latitude must be between -90 and 90 degrees");
	}
	if (lon > 180.0 || lon < -180.0) {
		throw new Error("Longitude must be between -180 and 180 degrees");
	}

	//Dont have a clue what is this!
	if (
		Math.abs(lat - 21.4) < Math.abs(0.0 - 0.01) &&
		Math.abs(lon - 39.8) < Math.abs(0.0 - 0.01)
	) {
		return ""; //Mecca
	}
	let phiK = (21.4 * PI) / 180.0;
	let lambdaK = (39.8 * PI) / 180.0;
	let phi = (lat * PI) / 180.0;
	let lambda = (lon * PI) / 180.0;
	let psi =
		(180.0 / PI) *
		Math.atan2(
			Math.sin(lambdaK - lambda),
			Math.cos(phi) * Math.tan(phiK) -
				Math.sin(phi) * Math.cos(lambdaK - lambda)
		);
	return Math.round(psi);
};

import { IMAGES } from "./images";
import { ICONS } from "./icons";

export const SLIDES = [
	{
		key: "r1",
		content: [
			{
				text: "Simple and easy to use Dhikr counter which saves your history by day.",
				icon: ICONS.dhikr_icon,
			},
			{
				text: "Get prayer times  daily and in advance, also notification when it’s time to pray.",
				icon: ICONS.prayer_times_icon,
			},
			{
				text: "Find your Qibla direction wherever you want to pray by using your location.",
				icon: ICONS.qibla_icon,
			},
		],
		title: "Welcome to Rabia",
		logo: IMAGES.logo,
		image: IMAGES.intro_image_1,
	},
	{
		key: "r2",
		title: "Get prayer time alerts",
		content: [
			{
				text: "Enable notification services to  get alerts for each prayer daily or by choosing specific prayers.",
			},
		],
		image: IMAGES.intro_image_2,
		infoIcon: ICONS.intro_notification,
	},
	{
		key: "r3",
		title: "Find qibla direction",
		content: [
			{
				text: "Enable location services to calculate prayer times and qibla direction based on your location.",
			},
		],
		image: IMAGES.intro_image_3,
		infoIcon: ICONS.intro_location,
	},
];

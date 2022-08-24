import { useFonts } from "expo-font";
import RootTab from "./navigation/RootTab";

import { FONT_FILES } from "./constants";

export default function App() {
  const [fontsLoaded] = useFonts(FONT_FILES);
  if (!fontsLoaded) {
    return null;
  }
  return <RootTab />;
}

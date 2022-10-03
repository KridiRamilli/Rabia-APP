import { useRef, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { DhikrItem } from "../components/DhikrItem";
import { COLORS } from "../theme/theme";

const dhikrJSON = require("../assets/dhikr.json");

export const Morning = () => {
  const [dhikrData, setDhikrData] = useState(() => dhikrJSON.morning);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const flatListRef = useRef();

  const renderItem = ({ item }) => {
    return (
      <DhikrItem
        dhikrArab={item.arabic}
        dhikrAlbanian={item.alb}
        repeat={item.repeat}
        handlePress={handlePress}
        id={item.id}
      />
    );
  };

  const handlePress = (id) => {
    const updatedDhikrData = dhikrData.map((el) =>
      el.id !== id ? el : el.repeat > 0 ? { ...el, repeat: el.repeat - 1 } : el
    );
    setDhikrData(updatedDhikrData);
    if (el.repeat == 0) {
      flatListRef.current.scrollToIndex(id + 1);
    }
    // setShouldUpdate(!shouldUpdate);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dhikrData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary95,
  },
});

import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const DetailView: React.FC = () => {
  const route = useRoute<any>();

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: route.params?.url }}
        style={styles.webview}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

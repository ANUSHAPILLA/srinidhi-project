import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
export default class BioDataScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>BIO DATA</Text>
      </View>
    );
  }
}

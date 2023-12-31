import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import BioDataCard from "./BioDataCard";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase/compat/app";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  CherryBombOne: require("../assets/fonts/CherryBombOne-Regular.ttf"),
};


import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
var uid = "";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      biodatas:[]
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchbiodata();
    this.fetchUser();
  }

  fetchbiodata = () => {
    const db = getDatabase();
    const starCountRef = ref(db, "/posts/");
    onValue(starCountRef, (snapshot) => {
      let bio = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach(function (key) {
          bio.push({
            key: key,
            value: snapshot.val()[key],
          });
        });
      }
      this.setState({ biodatas: bio });
      console.log(this.state.biodatas)
      this.props.setUpdateToFalse();
    });
   
        
  };
  

  fetchUser = () => {
    let theme;
    const db = getDatabase();
const starCountRef = ref(db, "/users/" + uid);
      onValue(starCountRef, (snapshot) => {
        theme = snapshot.val().current_theme;
         this.setState({ light_theme: theme === "light" });
      });
   
  };

  renderItem = ({ item: bio }) => {
    console.log(bio)
     return <BioDataCard bio={bio} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/10.webp")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Music App
              </Text>
            </View>
          </View>
          {!this.state.biodatas[0] ? (
            <View style={styles.noBioDatas}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.noBioDatasTextLight
                    : styles.noBioDatasText
                }
              >
                No Biodatas are Available
              </Text>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.biod}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "CherryBombOne",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "CherryBombOne",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "CherryBombOne",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "CherryBombOne",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "CherryBombOne",
  },
});

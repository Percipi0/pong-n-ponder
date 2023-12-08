import { Stack } from "expo-router";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Themes } from "../assets/Themes/index.js";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default function about() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      <Text style={styles.header}>Regarding Pong 'n Ponder</Text>
      <View style={styles.textWrapper}>
        <Text style={styles.about}>
          {"  "}
          <Text style={styles.span1}>Philosophers</Text> are tortured souls. The
          intense contemplation required to answer life's most profound
          philosophical questions, such as
          <Text style={styles.span2}> "what is a chair?"</Text> or{" "}
          <Text style={styles.span2}>"is a hotdog a sandwich?"</Text> can
          quickly drive even the shrewdest of philosophers into utter madness.
          Nor are philosophers known to be particularly stable to begin with. As
          the French egghead
          <Text style={styles.span1}> René Descartes</Text> famously said,
          "cogito, ergo bibo" - I think, therefore I drink.
        </Text>
        <Text style={styles.about}>
          {"  "}Fortunately for would-be alcoholic thinkers everywhere, the
          unstoppable force of innovation has marched on into the future, and
          has brought unto humanity something truly brilliant - a perfect fusion
          of rumination and recreation! The marvelous{" "}
          <Text style={styles.span3}>Pong 'n Ponder</Text> has burst onto the
          global scene, and stands as the most sophisticated (and least
          pretentious) of platforms for the facilitation of thought and play.
        </Text>
        <Text style={styles.about}>
          {"  "}We all know
          <Text style={styles.span1}> Friedrich Nietzsche</Text> would have
          loved Pong. So what took civilization so long to bind Pong with
          Pondering? As we contemplated this very question, we grew tired of
          twiddling our thumbs, waiting for this most extraordinary of ideas to
          be realized; thus we went to work, toiling away at our computers until
          Pong 'n Ponder was well and truly alive. Just as Atlas held up the
          heavens, so too did we bear a tremendous burden for the benefit of all
          humanity. And now, we wish to share it with the world, completely free
          of charge, and available on iOS and Android devices everywhere.
        </Text>
        <Text style={styles.about}>
          {"  "}Rejoice, citizens! Don the mantle of philosopher, and pick up
          your paddle!
          <Text style={styles.span3}> The time of your life awaits!</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    height: height,
  },
  about: {
    color: Themes.colors.text,
    marginLeft: width / 35,
    marginRight: width / 35,
    marginTop: height / 70,
    marginBottom: height / 70,
    textAlign: "left",
    lineHeight: height / 40,
    fontFamily: Themes.fonts.primary,
    fontSize: height / 75,
  },
  textWrapper: {
    marginTop: height / 120,
  },
  header: {
    marginTop: height / 20,
    fontWeight: "bold",
    fontSize: height / 50,
    color: Themes.colors.VSGreen,
    textAlign: "center",
    fontFamily: Themes.fonts.primary,
  },
  span1: {
    color: Themes.colors.VSOrange,
  },
  span2: {
    fontStyle: "italic",
  },
  span3: {
    fontWeight: "bold",
    color: Themes.colors.VSGreen,
  },
});

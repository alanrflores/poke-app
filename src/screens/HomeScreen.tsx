import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";
import PokemonCard from "../components/PokemonCard";
import usePokemonData from "../hooks/usePokemonData";
import Spinner from "react-native-loading-spinner-overlay";
import { Image } from "expo-image";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}
const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const { state } = usePokemonData();

  if (state.isLoading) {
    return (
      <View style={styles.containerState}>
        <Spinner
          color="white"
          animation="fade"
          visible
          textContent={"Cargando..."}
          textStyle={{ color: "white" }}
          size="large"
        />
      </View>
    );
  }

  if (state.isError) {
    return (
      <View style={styles.containerState}>
        <Text>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Lista de Pokemones</Text>
        <Image
          source={require("../../assets/pokeapi_256.png")}
          style={{ width: 100, height: 40 }}
          contentFit="contain"
        />
      </View>
      <FlatList
        data={state.data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          return (
            <PokemonCard
              item={item}
              onPress={() =>
                navigation.navigate("Details", {
                  name: item.name,
                  id: item.id,
                })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  containerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

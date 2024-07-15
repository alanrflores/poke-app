import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import PokemonDetailsCard from "../components/PokemonDetailsCard";
import usePokemonData from "../hooks/usePokemonData";
import Spinner from "react-native-loading-spinner-overlay";

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Details"
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type DetailScreenProps = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const { name, id } = route.params;
  const { state, fetchPokemonDetails } = usePokemonData();

  useEffect(() => {
    fetchPokemonDetails(id);
  }, []);

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
      <PokemonDetailsCard pokemon={state.selectedPokemon} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

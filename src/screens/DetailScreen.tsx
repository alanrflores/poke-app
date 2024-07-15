import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PokemonDetails } from "../core/entities/pokemon.entities";
import PokemonDetailsCard from "../components/PokemonDetailsCard";
import usePokemonData from "../hooks/usePokemonData";

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
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (state.isError) {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
});

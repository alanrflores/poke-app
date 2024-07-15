import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";
import PokemonCard from "../components/PokemonCard";
import { Pokemon, PokemonDetailsHome } from "../core/entities/pokemon.entities";
import usePokemonData from "../hooks/usePokemonData";

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
      <Text style={styles.title}>Lista de Pokemones</Text>
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

  title: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
});

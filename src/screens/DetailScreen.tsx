import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

interface Pokemon {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  weight: number;
}
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
  const { name, url } = route.params;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  //   console.log(name, url);

  const getPokemonDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);
  console.log(pokemon?.sprites?.other?.dream_world?.front_default);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Image
            style={styles.image}
            source={pokemon?.sprites?.other?.dream_world?.front_default}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <View style={{
            paddingVertical: 10
          }}>
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              borderColor: "gray",
            }}
          >
            <Text style={styles.font}>Nombre: {pokemon?.name}</Text>
            <Text style={styles.font}>
              Tipo: {pokemon?.types?.map((type, index) => type.type.name).join(", ")}
            </Text>
          <Text style={styles.font}>Peso: {pokemon?.weight}</Text>
          </View>
          </View>
        </>
      )}
    </View>
  );
};

const width = Dimensions.get("window").width;
const aspectRatio = 1;
const imageHeight = width / aspectRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: width,
    height: imageHeight,
    backgroundColor: "#0553",
  },
  font: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    textTransform: "capitalize",
  },
});

export default DetailScreen;

import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../Navigation";

type Pokemon = {
  name: string;
  url: string;
};
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const getPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=50&limit=50"
      );
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Lista de Pokemones
      </Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={({ url }) => url}
          renderItem={({ item }) => {
            const { name, url } = item;
            return (
              <View style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 10,

              }}>
                <Pressable
                style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 6,

                }}
                  onPress={() =>
                    navigation.navigate("Details", { name: name, url: url })
                  }
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      marginVertical: 6,
                      textTransform: "capitalize",
                    }}
                  >
                    {name}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;

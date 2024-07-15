import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PokemonDetails } from "../core/entities/pokemon.entities";

interface PokemonDetailsCardProps {
  pokemon: PokemonDetails | undefined;
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={pokemon?.sprites?.other?.dream_world?.front_default}
        placeholder={pokemon?.sprites?.other?.dream_world?.front_default}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.font}>Nombre: {pokemon?.name}</Text>
        <Text style={styles.font}>
          Tipo:{" "}
          {pokemon?.types?.map((type, index) => type.type.name).join(", ")}
        </Text>
        <Text style={styles.font}>Peso: {pokemon?.weight} Kg</Text>
      </View>
    </View>
  );
};

export default PokemonDetailsCard;


const width = Dimensions.get("window").width;
const aspectRatio = 1;
const imageHeight = width / aspectRatio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: width,
    height: imageHeight,
    backgroundColor: "#0553",
    borderRadius: 8,
    objectFit: "cover",
    marginBottom: 10,
  },
  infoContainer: {
     width: '100%',
    flexDirection: "column",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1
  },
  font: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    textTransform: "capitalize",
  },
});

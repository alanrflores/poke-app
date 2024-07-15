import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PokemonDetails } from "../core/types/pokemon.entities";

const { width: screenWidth, height } = Dimensions.get("window");
interface PokemonDetailsCardProps {
  pokemon: PokemonDetails | undefined;
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  return (
    <View style={styles.container}>
      
      <Image
        style={styles.image}
        source={pokemon?.sprites?.other?.dream_world?.front_default}
        contentFit="contain"
        transition={1000}
      />
       
      <View style={styles.infoContainer}>
        <Text style={styles.font}>Nombre: {pokemon?.name}</Text>
        <Text style={styles.font}>
          Tipo: {pokemon?.types?.map((type, index) => type.type.name).join(", ")}
        </Text>
        <Text style={styles.font}>Peso: {pokemon?.weight} Kg</Text>
      </View>
    </View>
  );
};

export default PokemonDetailsCard;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    flex: 1,
    width: screenWidth,
    height: height / 2,
    backgroundColor: "#0553",
    borderRadius: 4,
    overflow: 'hidden'
  },
  infoContainer: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  font: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    textTransform: "capitalize",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { PokemonDetailsHome } from "../core/types/pokemon.entities";

interface ItemProps  {
  item: PokemonDetailsHome;
  onPress?: () => void;
};

const PokemonCard = ({ item, onPress }: ItemProps) => {
  return (
    <View style={styles.containerCard}>
      <Pressable style={styles.infoContainerCard} onPress={onPress}>
        <Text style={styles.infoTextCard}>{item.name}</Text>
        <Image
          source={item?.image}
          style={styles.imageCard}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
    containerCard: {
      borderWidth: 1,
      borderColor: "#ccc",
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderRadius: 6,
      marginBottom: 8,
    },
    imageCard: {
      width: 80,
      height: 80,
      objectFit: "cover",
    },
    infoContainerCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 6,
    },
    infoTextCard: {
      fontSize: 16,
      marginVertical: 6,
      textTransform: "capitalize",
    },
  });
  

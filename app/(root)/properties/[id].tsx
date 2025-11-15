import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const PropertyDetails = () => {
    const { id } = useLocalSearchParams();


    return (
        <View>
            <Text>PropertyDetails</Text>
        </View>
    )
}

export default PropertyDetails
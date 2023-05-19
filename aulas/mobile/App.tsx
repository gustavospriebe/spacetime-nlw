import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-950">
            <Text className="text-5xl font-bold text-white">Gustavo</Text>
            <Text className="text-5xl font-bold text-white">Siqueira</Text>
            <Text className="text-5xl font-bold text-white">Priebe</Text>
            <StatusBar style="light" translucent />
        </View>
    );
}

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const App = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://10.123.98.71/api/get_data.php"); // Change URL if needed
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData({ error: "Failed to fetch data" });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.jsonText}>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    jsonText: {
        fontSize: 14,
        fontFamily: "monospace",
    },
});

export default App;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { getStatus } from '../api'; // Asegúrate de que esta función esté implementada

export default function ReportsScreen() {
    const [data, setData] = useState([]);

    // Función para obtener los datos desde el ESP32
    const fetchReports = async () => {
        try {
            const status = await getStatus();
            // Mapea los datos recibidos a un formato adecuado
            const mappedData = Object.entries(status).map(([key, value], index) => ({
                id: (index + 1).toString(),
                date: new Date().toLocaleString(), // Marca de tiempo
                device: key, // Nombre del dispositivo
                action: value === 1 ? 'Activo' : 'Inactivo', // Estado del dispositivo
            }));
            setData(mappedData);
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener los reportes del ESP32.');
        }
    };

    // Llamar a la función de obtención de reportes al cargar la pantalla
    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Smart Home Control</Text>
            </View>
            <Text style={styles.title}>Reportes</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.date}</Text>
                        <Text style={styles.text}>{item.device}</Text>
                        <Text style={styles.text}>{item.action}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay reportes disponibles</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#87CEEB',
        padding: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        flex: 1,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#aaa',
    },
});

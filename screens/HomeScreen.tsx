import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

// Importar las funciones de la API
import { turnOnLed, turnOffLed } from '../api'; // Asegúrate de que este archivo existe

// Tipo para las claves de los botones
type ButtonKeys = 'sala' | 'cuarto1' | 'cuarto2' | 'bano1' | 'bano2' | 'cochera';

export default function HomeScreen() {
    // Estado para manejar los colores de los botones
    const [buttonColors, setButtonColors] = useState<Record<ButtonKeys, string>>({
        sala: 'green',
        cuarto1: 'green',
        cuarto2: 'green',
        bano1: 'green',
        bano2: 'green',
        cochera: 'green',
    });

    // Mapeo de botones a LEDs (reemplaza los IDs según tu configuración en el ESP32)
    const buttonToLedMap: Record<ButtonKeys, number> = {
        sala: 1,
        cuarto1: 2,
        cuarto2: 3,
        bano1: 4,
        bano2: 5,
        cochera: 6,
    };

    // Función para alternar el color del botón y controlar el LED en el ESP32
    const toggleButtonColor = async (buttonKey: ButtonKeys) => {
        const ledId = buttonToLedMap[buttonKey];
        const isGreen = buttonColors[buttonKey] === 'green';

        try {
            // Enviar solicitud al ESP32
            if (isGreen) {
                await turnOnLed(ledId); // Encender el LED
            } else {
                await turnOffLed(ledId); // Apagar el LED
            }

            // Cambiar el estado del color del botón
            setButtonColors((prevColors) => ({
                ...prevColors,
                [buttonKey]: isGreen ? 'red' : 'green',
            }));
        } catch (error) {
            Alert.alert('Error', 'No se pudo comunicar con el ESP32');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Smart Home Control</Text>
            </View>
            <Text style={styles.title}>Luminarias</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.sala }]}
                    onPress={() => toggleButtonColor('sala')}
                >
                    <Text style={styles.buttonText}>Luz Sala</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.cuarto1 }]}
                    onPress={() => toggleButtonColor('cuarto1')}
                >
                    <Text style={styles.buttonText}>Luz Cuarto 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.cuarto2 }]}
                    onPress={() => toggleButtonColor('cuarto2')}
                >
                    <Text style={styles.buttonText}>Luz Cuarto 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.bano1 }]}
                    onPress={() => toggleButtonColor('bano1')}
                >
                    <Text style={styles.buttonText}>Luz Baño 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.bano2 }]}
                    onPress={() => toggleButtonColor('bano2')}
                >
                    <Text style={styles.buttonText}>Luz Baño 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: buttonColors.cochera }]}
                    onPress={() => toggleButtonColor('cochera')}
                >
                    <Text style={styles.buttonText}>Luz Cochera</Text>
                </TouchableOpacity>
            </View>
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
    buttonsContainer: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

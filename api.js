const ESP32_IP = "http://192.168.239.28"; // Reemplaza con la IP del ESP32

// Encender LED
export const turnOnLed = async (id) => {
  try {
    const response = await fetch(`${ESP32_IP}/led/${id}/on`);
    return await response.text();
  } catch (error) {
    console.error("Error encendiendo LED:", error);
  }
};

// Apagar LED
export const turnOffLed = async (id) => {
  try {
    const response = await fetch(`${ESP32_IP}/led/${id}/off`);
    return await response.text();
  } catch (error) {
    console.error("Error apagando LED:", error);
  }
};

// Obtener el estado de todos los dispositivos
export const getStatus = async () => {
    const response = await fetch(`${ESP32_IP}/status`);
    if (!response.ok) throw new Error("Error al obtener los reportes");
    return await response.json();
};

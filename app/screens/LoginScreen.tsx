import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, TouchableOpacity, Image, View, ScrollView } from "react-native";
import { useState } from "react";
import { login } from "../../services/apiService";
import { NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; 
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function LoginScreen({ navigation }: { navigation: NavigationProp<any> }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        let errors = {
            username: '',
            password: '',
        };
    
        if (!username) {
            errors.username = 'El usuario es requerido';
        }
    
        if (!password) {
            errors.password = 'La contraseña es requerida';
        }
    
        setErrors(errors);
        return Object.values(errors).every((error) => error === '');
    }

    const submitForm = () => {
        if (validateForm()) {
            console.log('Formulario válido');
            const result = login({ username, password });
            result.then((response:any) => {
                if (response.error) {
                    alert(response.error);
                } else {                    
                    navigation.navigate('Main'); // Redirigir a las pestañas
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.triangle}></View>
                <View style={styles.cube}></View>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.title}>Uassistance</ThemedText>
                    <Image
                        source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
                        style={styles.reactLogo}
                    />
                </ThemedView>
                <View style={styles.loginContainer}>
                    <FontAwesome name="user-circle" size={90} color="#2b5983" style={styles.icon} />
                    <TextInput
                        placeholder='Usuario'
                        style={styles.textInput}
                        onChangeText={text => setUsername(text)}
                        value={username}
                        placeholderTextColor="#888"
                    />
                    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
                    <TextInput
                        placeholder='Contraseña'
                        style={styles.textInput}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                        placeholderTextColor="#888"
                    />
                    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submitForm}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeftWidth: 500,
        borderLeftColor: 'transparent',
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderBottomWidth: 300,
        borderBottomColor: '#2b5983',
        top: 250,
        right: 0,
        zIndex: -3,
    },
    cube: {
        position: 'absolute',
        width: 500,
        height: 400,
        backgroundColor: '#2b5983',
        top: 500,
        right: 0,
        zIndex: -1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        width: '100%',
        position: 'absolute',
        top: 0,
        marginTop: -30,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    reactLogo: {
        width: 60,
        height: 60,
        marginLeft: 15,
        marginTop: -4,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#2b5983',
        paddingTop: 20
    },
    loginContainer: {
        width: '85%',
        height: '55%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,
    },
    icon: {
        marginBottom: 20,
    },
    textInput: {
        padding: 6,
        paddingStart: 20,
        width: '80%',
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        borderColor: 'gray',
        borderWidth: 0.1,
        color: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    error: {
        color: 'red',
        margin: 5
    },
    button: {
        backgroundColor: '#FFB820',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '60%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

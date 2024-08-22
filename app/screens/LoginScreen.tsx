import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { login } from "../../services/apiService";

import { NavigationProp } from "@react-navigation/native";

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
                    alert('Inicio de sesión exitoso');
                    navigation.navigate('Main'); // Redirigir a las pestañas
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
            <TextInput
                placeholder='Usuario'
                style={styles.textInput}
                onChangeText={text => setUsername(text)}
                value={username}
            />
            {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
            <TextInput
                placeholder='Contraseña'
                style={styles.textInput}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
            <TouchableOpacity
                style={styles.button}
                onPress={submitForm}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        
        width: '90%',
        height: '60%',
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '4%',
        marginTop: '32%',
        backgroundColor: '#fff',
        borderWidth: 2, 
        borderColor: '#ddd',
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5,
    },
    titulo: {
        fontSize: 70,
        color: '#000',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        color: 'gray',
        
    },
    textInput: {
        padding: 6,
        paddingStart: 20,
        width: '80%',
        height: 50,
        marginVertical: 10,
        borderRadius: 30,
        backgroundColor: '#dcdcdc',
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
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
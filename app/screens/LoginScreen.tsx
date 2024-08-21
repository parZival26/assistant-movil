import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, StyleSheet, Button } from "react-native";
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
        <SafeAreaView>
            <Text style={styles.titulo}>Hola</Text>
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
            <Button
                onPress={() => submitForm()}
                title='Iniciar Sesion'
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: '#fff'
    },
    error: {
        color: 'red',
        margin: 5
    }
});
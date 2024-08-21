import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';

export default function DetallesScreen() {
    const [project1Expanded, setProject1Expanded] = useState(false);
    const [project2Expanded, setProject2Expanded] = useState(false);

    return (
        <View style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText style={styles.title}>Uassistance</ThemedText>
                <Image
                    source={{ uri: 'https://sion.unac.edu.co/Content/Imagenes/Logo_UNAC/Logo.png' }}
                    style={styles.reactLogo}
                />
            </ThemedView>

            <View style={styles.projectContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon
                        icon={project1Expanded ? faCircleSolid : faCircleRegular}
                        size={40}
                        color="#2b5983"
                        style={styles.icon}
                    />
                </View>
                <TouchableOpacity onPress={() => setProject1Expanded(!project1Expanded)} style={styles.projectButton}>
                    <ThemedText type="subtitle" style={[styles.projectText, styles.projectTitle]}>Proyecto 1</ThemedText>
                </TouchableOpacity>
                {project1Expanded && (
                    <View style={styles.projectDescription}>
                        <ThemedText style={[styles.projectText, styles.descriptionText]}>Fecha:</ThemedText>
                        <ThemedText style={[styles.projectText, styles.descriptionText]}>Descripción:</ThemedText>
                    </View>
                )}
            </View>

            <View style={styles.projectContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon
                        icon={project2Expanded ? faCircleSolid : faCircleRegular}
                        size={40}
                        color="#2b5983"
                        style={styles.icon}
                    />
                </View>
                <TouchableOpacity onPress={() => setProject2Expanded(!project2Expanded)} style={styles.projectButton}>
                    <ThemedText type="subtitle" style={[styles.projectText, styles.projectTitle]}>Proyecto 2</ThemedText>
                </TouchableOpacity>
                {project2Expanded && (
                    <View style={styles.projectDescription}>
                        <ThemedText style={[styles.projectText, styles.descriptionText]}>Fecha:</ThemedText>
                        <ThemedText style={[styles.projectText, styles.descriptionText]}>
                            Descripción del Proyecto 2: Este proyecto está enfocado en...
                        </ThemedText>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        paddingBottom: 40,
        backgroundColor: 'white',
        
    },
    reactLogo: {
        width: 70,
        height: 70,
        marginLeft: 15,
        marginTop: -4,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#2b5983',
        paddingTop: 20
    },
    projectContainer: {
        marginBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#2b5983',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 25,
        marginLeft: 55,
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        left: -48,
        top: 2,
    },
    icon: {
        //opcional
    },
    projectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
    },
    projectText: {
        fontSize: 14,
        color: '#000000',  
        marginLeft: 0,
    },
    projectTitle: {
        color: '#ffffff',  
        fontSize: 18, 
        fontWeight: 'bold',
    },
    descriptionText: {
        color: '#FFFFFF',  
        fontSize: 16, 
    },
    projectDescription: {
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#ffffff',  
    },
});

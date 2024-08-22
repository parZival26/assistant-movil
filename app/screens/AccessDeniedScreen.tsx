import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationProp } from '@react-navigation/native'

const AccessDeniedScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
        <Text>Acceso denegado</Text>
        <TouchableOpacity
        onPress={handleGoBack}
        >
            <Text>Volver</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AccessDeniedScreen

import { useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth.provider';
import { MaterialIcons as Icon } from '@expo/vector-icons';

interface Properties {
    imageURL?: string
    fullName?: string
    department?: string
    returnOption: boolean
}

export function Header(properties: Properties) {
    const authContext = useContext(AuthContext)

    const handleSignOut = async () => {
        authContext.signOut()
    }

    return (
        <View style={styles.header}>
            <View style={properties.returnOption === false ? styles.container : styles.containerReturn}>
                <Image
                    source={properties.imageURL ? { uri: properties.imageURL } : require('../../../assets/no-user.png')}
                    style={styles.image} />
                <View>
                    <Text style={styles.fullName}>{properties.fullName}</Text>
                    <Text style={styles.department}>{properties.department ? properties.department : ""}</Text>
                </View>
                <Icon
                    name='logout'
                    size={24}
                    color='white'
                    onPress={handleSignOut}
                    style={{ marginLeft: 'auto' }} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 120,
        backgroundColor: '#1F2D5A'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: '10%',
    },
    containerReturn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: '10%',
        paddingLeft: '10%',
    },
    image: {
        width: 52,
        height: 52,
        borderRadius: 90,
        borderColor: 'white',
        borderWidth: 1,
        marginRight: 13
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    department: {
        fontSize: 13,
        color: 'white',
    }
})
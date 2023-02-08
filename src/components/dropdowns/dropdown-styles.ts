import { StyleSheet } from 'react-native'

export const DropdownStyles = StyleSheet.create({
    container: {
        marginVertical: '1.25%',
        paddingHorizontal: '5%',
        paddingVertical: '2.5%',
        borderTopStartRadius: 9,
        borderTopEndRadius: 9,
        justifyContent: 'center',
        backgroundColor: '#DFE1E6',
    },
    area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    children: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    subText: {
        fontSize: 13,
    },    
})
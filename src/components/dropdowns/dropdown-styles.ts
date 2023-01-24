import { StyleSheet } from 'react-native'

export const DropdownStyles = StyleSheet.create({
    container: {
        marginHorizontal: '5%',
        marginVertical: '1.25%',
        padding: '5%',
        borderTopStartRadius: 9,
        borderTopEndRadius: 9,
        justifyContent: 'center',
        backgroundColor: '#eeefef',
    },
    area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    children: {
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 24,
    },
    subText: {
        fontSize: 13,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '1.25%',
    },
})
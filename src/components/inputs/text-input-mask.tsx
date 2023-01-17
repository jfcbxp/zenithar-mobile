import React from 'react'
import { StyleSheet } from 'react-native';
import { TextInputMask as ReactNativeTextInputMask, TextInputMaskProps } from "react-native-masked-text"

interface Properties extends TextInputMaskProps { }

export function TextInputMask(properties: Properties) {
    return (
        <ReactNativeTextInputMask {...properties} style={styles.input} />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        color: '#123262',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 18,
        paddingHorizontal: 16,
        marginBottom: 16
    }
})
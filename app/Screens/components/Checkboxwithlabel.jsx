import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

const Checkboxwithlabel = ({ Label, onChange }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handlePress = () => {
        const newValue = !toggleCheckBox; // Toggle the checkbox state
        setToggleCheckBox(newValue);
        if (onChange) {
            onChange(newValue); // Call the onChange prop with the new value
        }
    };

    return (
        <TouchableOpacity activeOpacity={1} style={styles.checkboxwithlabel} onPress={handlePress}>
            <CheckBox
                value={toggleCheckBox}
                tintColors={{ true: '#fff', false: '#fff' }}
                onValueChange={handlePress} // Optional if you want the checkbox itself to manage the state as well
            />
            <Text style={styles.bottomSheettext}>{Label}</Text>
        </TouchableOpacity>
    );
};

export default Checkboxwithlabel;

const styles = StyleSheet.create({
    bottomSheettext: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    checkboxwithlabel: {
        backgroundColor: '#52C2FE',
        // maxWidth: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 4,
        paddingRight: 10,
    },
});

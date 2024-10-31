import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

const Checkboxwithlabel = ({ Label }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const handlePress = () => {
        setToggleCheckBox(!toggleCheckBox);
    };

    return (
        <TouchableOpacity activeOpacity={1} style={styles.checkboxwithlabel} onPress={handlePress}>
            <CheckBox
                disabled={true}
                value={toggleCheckBox}
                tintColors={{ true: '#fff', false: '#fff' }}
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
        maxWidth: '25%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 4,
        paddingRight: 10,
    },
});

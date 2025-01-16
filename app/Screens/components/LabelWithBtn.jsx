import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ChevronIcon from '../../assets/images/SVG/profilepage/chevron.svg'; // Chevron SVG
import Fifth from '../../assets/images/SVG/profilepage/profile.svg'; // Icon SVG

const LabelWithBtn = ({ text, onPress = () => { console.log('Button pressed'); }, IconsURL=Fifth, iconSize = { width: 16, height: 16 } }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.iconTextContainer}>
                <IconsURL width={iconSize.width} height={iconSize.height} />
                <Text style={styles.text}>{text}</Text>
            </View>
            <ChevronIcon width={14.77} height={14.77} />
        </TouchableOpacity>
    );
};

export default LabelWithBtn;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 4,
        justifyContent: 'space-between',
        width: '100%',

    
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        textAlign: 'left',
        textUnderlinePosition: 'from-font',
        textDecorationSkipInk: 'none',
        color: '#4c4c4c',
        marginLeft: 10,
    },
});

import { Text, View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={ item.image }
                style={[styles.image , {width , resizeMode: 'contain'}]} // Adjust height class as needed
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        flex: 0.5,
        justifyContent: 'center',
    },
    textContainer: {
        marginTop:40,
        flex: 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily:'OpenSans-Regular',
        fontWeight: '600',
        color:"#373737",
       
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        fontFamily:'Poppins-Regular',
        color:"#6c6c6c",
        fontWeight: '300',
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
        lineHeight:23,
        paddingHorizontal:"64"
    },
});

export default OnboardingItem;

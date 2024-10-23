import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import circle from '../../assets/images/circle.png';
import first from '../../assets/images/SVG/dashboardgrocery.svg';
import back from '../../assets/images/back-arrow.png';
import seconed from '../../assets/images/SVG/dashboardspiritualgoals.svg';
import third from '../../assets/images/SVG/dashboardpersonalgromming.svg';
import fourth from '../../assets/images/SVG/thingstodo.svg';
import fifth from '../../assets/images/SVG/recipe.svg';
import TextInput2 from './Input';

const Theme = ({ navigation }) => {

    const cardDataArray = [
        {
            title: 'Grocery List',
            description: 'Add needed items.',
            items: '200 Items',
            percentagetext: 'Bought 70%',
            percentage: 70,
            Picture: first,
            bgColor: '#9DF4F4',
            badgeColor: '#008B94',
        },
        {
            title: 'Spiritual Goals',
            description: 'Add your spiritual goals.',
            items: '10 Goals',
            percentagetext: 'Achieved 30%',
            percentage: 30,
            Picture: seconed,
            bgColor: '#98FBCB',
            badgeColor: '#4AA688',
        },
        {
            title: 'Personal Grooming',
            description: 'Add your grooming tasks in list.',
            items: '10 Tasks',
            percentagetext: 'Completed 80%',
            percentage: 80,
            Picture: third,
            bgColor: '#FEE5D7',
            badgeColor: '#C54B6C',
        },
        {
            title: 'Things To Do',
            description: 'Add needed items.',
            items: '15 Items',
            percentagetext: 'Bought 50%',
            percentage: 50,
            Picture: fourth,
            bgColor: '#FFCBA1CC',
            badgeColor: '#E36A4A',
        },
        {
            title: 'Kitchen Menu',
            description: 'Add needed items.',
            items: '500 Recipies',
            percentagetext: 'Cooked 70%',
            percentage: 70,
            Picture: fifth,
            bgColor: '#fddc8a',
            badgeColor: '#D88D1B',
        },
    ];
    return (
        <ScrollView styles={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.signInText}>Create New List </Text>
                <Text style={styles.signInText}> </Text>
            </View>
            <View style={styles.container2}>
                <TextInput2 label={'List Name:'} placeholder={'Write your list name'} />
                <TextInput2 label={'List Description:'} placeholder={'Write your list Description'} />
                <Text style={styles.signInText}>Please Select Theme </Text>
                {cardDataArray.map((data, index) => (
                    <TouchableOpacity key={index} activeOpacity={1} style={[styles.cardContainer, { backgroundColor: data.bgColor }]} >
                        <View style={[styles.contentContainer2]}>
                            <Image source={circle} style={[styles.image2]} />
                            <View style={styles.image}>
                                <data.Picture width={150} height={130} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default Theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        marginHorizontal: 10,
        marginBottom: 30,
        gap: 10,
    },
    headerContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '6%',
    },
    back: {
        width: 25,
        height: 20,
    },
    signInText: {
        color: '#0c0c0c',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'OpenSans-Bold',
    },
    cardContainer: {
        height: 148,
        width: '100%',
        borderRadius: 22,
        flex: 1,
        marginVertical: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
    },
    contentContainer2: {
        position: 'relative',
        flex: 1,
        padding: 10,
    },
    image2: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '60%',
        maxWidth: '100%',
        height: '105%',
    },
    image: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
});

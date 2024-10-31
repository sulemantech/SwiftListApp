import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TextInput2 from './Input';
import CheckBox from '@react-native-community/checkbox';
import Checkboxwithlabel from './Checkboxwithlabel';


const BottomSheetComponent = ({ selecteditem }) => {
    const snapPoints = useMemo(() => ['10%', '50%', '55%'], []);
    const ItemValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];

    return (
        <BottomSheet style={styles.bottomSheet} index={1} snapPoints={snapPoints}>
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomSheetHeader}>
                    <Text style={styles.bottomSheetHeadertext}>{selecteditem}</Text>
                    <Text style={styles.bottomSheetHeadertext}>Done</Text>
                </View>
                <View style={styles.TextInput2}>
                    <TextInput2 borderRadius={22} bgColor='#007AFF26' placeholder={'Enter Needed Quantity'} fontsize={16} />
                    <Text style={styles.buttonsLabeltext}>{`Item Details for ${selecteditem}`}</Text>
                </View>
                <View style={styles.contentContainer2}>
                    {ItemValues.map((item, index) => (
                        <View key={index} style={styles.bottomSheetview}>
                            <Text style={styles.bottomSheettext}>{item}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.CheckboxesContainer}>
                    <Checkboxwithlabel Label={'Kg'}/>
                    <Checkboxwithlabel Label={'Dozan'}/>
                    <Checkboxwithlabel Label={'Urgent'}/>

                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetComponent

const styles = StyleSheet.create({

    bottomSheet: {
        backgroundColor: '#fff',
        position: 'absolute',
        color: 'black',
        width: '95%',
        marginLeft: '2.5%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        zIndex: 99,
    },
    bottomSheetHeader: {
        display: 'flex',
        width: '95%',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    bottomSheetHeadertext: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        textAlign: 'center',

    },
    buttonsLabeltext: {
        width: '100%',
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 4,

    },
    TextInput2: {
        width: '94%',
    },
    contentContainer2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 10,
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    bottomSheetview: {
        width: 32,
        aspectRatio: 1,
        marginHorizontal: 6,
        backgroundColor: '#52c2fe',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheettext: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    CheckboxesContainer:{
        marginTop: 15,
        width: '96%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})
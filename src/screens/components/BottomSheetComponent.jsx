import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import TextInput2 from './Input';
import Checkboxwithlabel from './Checkboxwithlabel';
import { ProductContext } from '../../Context/CardContext';

const BottomSheetComponent = ({ selecteditem, ListName, setIsProductSelected , setSnapIndex , snapIndex }) => {
    const [itemsQuantity, setItemsQuantity] = useState({ Quantity: '', unit: '', urgency: false });
    const [selectedValue, setSelectedValue] = useState(null); 
    const SelectQuantity = (Quantity) => {
        setItemsQuantity((prevState) => ({
            ...prevState,
            Quantity: Quantity !== undefined ? Quantity : prevState.Quantity,
        }));
        setSelectedValue(Quantity); // Update selected item
    };

    useEffect(() => {
        if (itemsQuantity) {
            handleSelectedElementQuantity(ListName);
        }
    }, [itemsQuantity]);

    const snapPoints = useMemo(() => ['12%', '50%', '55%', '100%'], []);
    const ItemValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];
    const { selectedProducts, updateSelectedProductsQuantity } = useContext(ProductContext);

    const handleSelectedElementQuantity = async (ListNamee) => {
        if (selectedProducts[ListNamee] && selectedProducts[ListNamee].length > 0) {
            const updatedList = [...selectedProducts[ListNamee]];
            const lastElement = updatedList[updatedList.length - 1];

            const updatedLastElement = {
                ...lastElement,
                Quantity: itemsQuantity.Quantity,
                unit: itemsQuantity.unit,
                urgency: itemsQuantity.urgency,
            };

            try {
                await updateSelectedProductsQuantity(ListNamee, updatedLastElement);
            } catch (error) {
                console.error('Error handling product selection:', error);
            }
        } else {
            console.log('The list is empty or does not exist:', ListNamee);
        }
    };

    return (
        <BottomSheet style={styles.bottomSheet} index={snapIndex} onChange={index => setSnapIndex(index)} snapPoints={snapPoints}>
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomSheetHeader}>
                    <Text style={styles.bottomSheetHeadertext}>{selecteditem}</Text>
                    <Text onPress={() => setIsProductSelected(false)} style={styles.bottomSheetHeadertext}>Done</Text>
                </View>
                {snapIndex === 4 && (
                    <View style={styles.TextInput2}>
                        <TextInput2 borderRadius={22} value={itemsQuantity.Quantity} onChangeText={(value) => SelectQuantity(value)} bgColor='#007AFF26' placeholder={'Enter Needed Quantity'} fontsize={16} />
                        <Text style={styles.buttonsLabeltext}>{`Item Details for ${selecteditem}`}</Text>
                    </View>
                )}
                <View style={styles.contentContainer2}>
                    {ItemValues.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => SelectQuantity(item)}
                            style={[
                                styles.bottomSheetview,
                                item === selectedValue && styles.selectedItem, // Apply selected style conditionally
                            ]}
                        >
                            <Text style={styles.bottomSheettext}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.CheckboxesContainer}>
                    <Checkboxwithlabel
                        onChange={() => setItemsQuantity(prevState => ({
                            ...prevState,
                            unit: 'Kg'
                        }))}
                        Label={'Kg'}
                    />
                    <Checkboxwithlabel
                        onChange={() => {
                            setItemsQuantity(prevState => ({
                                ...prevState,
                                unit: 'Dozen'
                            }));
                        }}
                        Label={'Dozen'}
                    />
                    <Checkboxwithlabel
                        onChange={() => setItemsQuantity(prevState => ({
                            ...prevState,
                            urgency: !itemsQuantity.urgency
                        }))}
                        Label={'Urgency'}
                    />
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default BottomSheetComponent;

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
        marginTop: 0,
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
        marginTop: 2,
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
    CheckboxesContainer: {
        marginTop: 15,
        width: '96%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: '#E36A4A', // Highlight color for selected item
    },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const units = ['Kg', 'Grams', 'Lbs', 'Pieces'];

const QuantityUnitInput = () => {
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelectUnit = (selectedUnit: string) => {
    setUnit(selectedUnit);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Apple</Text> */}

      <View style={styles.row}>
        <TextInput
          placeholder="Qty"
          keyboardType="numeric"
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
        />

        <TouchableOpacity
          onPress={() => setDropdownVisible(true)}
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownText}>
            {unit ? unit : 'Select Unit'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Custom dropdown modal */}
      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownList}>
            {units.map((u) => (
              <TouchableOpacity
                key={u}
                style={styles.dropdownItem}
                onPress={() => handleSelectUnit(u)}
              >
                <Text>{u}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default QuantityUnitInput;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    width: 80,
    borderRadius: 6,
    marginRight: 12,
    textAlign: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  dropdownText: {
    marginRight: 6,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    width: 200,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

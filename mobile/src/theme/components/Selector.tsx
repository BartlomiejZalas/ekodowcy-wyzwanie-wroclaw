import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import { Colors } from '../Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from './Dialog';

interface Props {
  label: string;
  items: Array<{ value: string; label: string }>;
  value: string | null;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
}

export const Selector: React.FC<Props> = ({
  label,
  items,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedName = value
    ? items.find(i => i.value === value)?.label || ''
    : null;

  const filteredItems = items.filter(i =>
    i.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.spacing}>
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.content}>
              <Text style={styles.input}>{selectedName || placeholder}</Text>
              <Icon name="caret-down" size={20} color={Colors.darkGray} />
            </View>
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </TouchableOpacity>
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Wybierz szkołę">
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={setSearch}
            value={search}
            style={styles.search}
            placeholder="Wyszukaj..."
          />
        </View>
        <FlatList
          data={filteredItems}
          keyExtractor={i => i.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
                onChange(item.value);
              }}>
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
  },
  spacing: {
    marginVertical: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  input: {
    marginVertical: 0,
    paddingVertical: 0,
    fontSize: 16,
    color: Colors.black,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  itemText: {
    fontSize: 16,
  },
  searchContainer: {
    paddingVertical: 8,
  },
  search: {
    borderColor: Colors.darkGray,
    borderBottomWidth: 1,
    padding: 8,
  },
  error: {
    color: Colors.error,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

import React from 'react';
import { Modal, Pressable, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Colors';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  return (
    <Modal visible={isOpen} transparent={true}>
      <View style={styles.spacing}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <Icon name="close" size={28} color={Colors.darkGray} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: Colors.darkGray,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  spacing: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    paddingVertical: 32,
  },
  content: {
    width: '85%',
    backgroundColor: Colors.white,
    margin: 32,
    borderRadius: 16,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 12,
  },
});

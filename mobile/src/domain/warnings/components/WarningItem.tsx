import React, { useState } from 'react';
import { Warnings } from '../Warnings.model';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import { Colors } from '../../../theme/Colors';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from '../../../theme/components/Link';
import { Dialog } from '../../../theme/components/Dialog';
import { UpdateWarningDialog } from './UpdateWarningDialog';

interface Props {
  warning: Warnings.Warning;
}

export const WarningItem: React.FC<Props> = ({ warning }) => {
  const [isOpen, setOpen] = useState(false);
  const [isEdiModalOpen, setEditModalOpen] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setOpen(v => !v)}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{warning.category}</Text>
            <Text style={styles.date}>
              {format(warning.timestamp, 'HH:mm dd-MM-yyyy')}
            </Text>
            <Icon
              name={isOpen ? 'caret-up' : 'caret-down'}
              size={20}
              color={Colors.white}
            />
          </View>
        </Pressable>
        {isOpen && (
          <View style={styles.content}>
            {warning.description ? (
              <Text style={styles.description}>{warning.description}</Text>
            ) : (
              <Link
                title="Dodaj opis"
                description="Brak opisu. "
                onPress={() => setEditModalOpen(true)}
              />
            )}
          </View>
        )}
      </View>
      <UpdateWarningDialog
        warning={warning}
        isOpen={isEdiModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  titleContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 16,
  },
  date: {
    color: Colors.lightGray,
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 16,
  },
});

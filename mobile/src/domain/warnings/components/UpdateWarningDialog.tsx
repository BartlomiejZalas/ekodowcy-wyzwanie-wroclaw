import { Dialog } from '../../../theme/components/Dialog';
import React, { useContext, useState } from 'react';
import { Warnings } from '../Warnings.model';
import { StyledButton } from '../../../theme/components/Button';
import { WarningsContext } from '../WarningsContext';
import { Textarea } from '../../../theme/components/Textarea';

interface Props {
  warning: Warnings.Warning;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateWarningDialog: React.FC<Props> = ({
  warning,
  isOpen,
  onClose,
}) => {
  const [value, setValue] = useState(warning.description || '');
  const { updateWarningDescription } = useContext(WarningsContext);

  const save = () => {
    updateWarningDescription(warning.id, value);
    onClose();
  };

  return (
    <Dialog title="Dodaj opis" isOpen={isOpen} onClose={onClose}>
      <Textarea
        value={value}
        onChangeText={setValue}
        multiline
        placeholder="Dodaj opis zgłoszonego zagrożenia na trasie"
      />
      <StyledButton title="Zapisz" onPress={save} />
    </Dialog>
  );
};

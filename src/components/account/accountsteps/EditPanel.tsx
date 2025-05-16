import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import EditNameStep from './EditNameStep';
import { EditEmailStep } from './EditEmailStep';
import { ValidationCodeStep } from './ValidationCodeStep';

interface EditPanelProps {
  mode: 'name' | 'email';
  onClose: () => void;
  onSaveName?: (firstName: string, lastName: string) => void;
  onSaveEmail?: (email: string) => void;
  initialName?: string | { firstName: string; lastName: string };
  initialEmail?: string;
  onUpdate: () => void;
}

export const EditPanel: React.FC<EditPanelProps> = ({
  mode,
  onClose,
  onSaveName,
  onSaveEmail,
  initialName,
  initialEmail,
  onUpdate,
}) => {
  const [firstName, setFirstName] = useState(
    typeof initialName === 'string' 
      ? initialName.split(' ')[0] 
      : initialName?.firstName || ''
  );
  const [lastName, setLastName] = useState(
    typeof initialName === 'string'
      ? initialName.split(' ').slice(1).join(' ')
      : initialName?.lastName || ''
  );
  const [email, setEmail] = useState(initialEmail || '');
  const [code, setCode] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const handleSaveName = (name: string) => {
    if (onSaveName) {
      const [firstName, lastName] = name.split(' ');
      onSaveName(firstName, lastName);
    }
    onClose();
  };

  const handleSaveEmail = () => {
    if (onSaveEmail) {
      onSaveEmail(email);
    }
    onClose();
  };

  const handleUpdate = () => {
    setShowValidation(true);
  };

  const handleCodeNext = () => {
    handleSaveEmail();
  };

  return (
    <View style={styles.container}>
      {mode === 'name' && (
        <EditNameStep
          onClose={onClose}
          onSave={handleSaveName}
          initialName={`${firstName} ${lastName}`.trim()}
          onUpdateStart={() => {}}
          onUpdate={onUpdate}
        />
      )}
      {mode === 'email' && !showValidation && (
        <EditEmailStep
          email={email}
          onEmailChange={setEmail}
          onUpdate={handleUpdate}
        />
      )}
      {mode === 'email' && showValidation && (
        <ValidationCodeStep
          code={code}
          onCodeChange={setCode}
          onNext={handleCodeNext}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
}); 
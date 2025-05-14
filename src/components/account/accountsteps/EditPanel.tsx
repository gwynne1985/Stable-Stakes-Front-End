import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../../../utils/scale';
import { SimpleSlidingPanel, SimpleSlidingPanelRef } from '../../panels/SimpleSlidingPanel';
import EditNameStep from './EditNameStep';
import EditEmailStep from './EditEmailStep';
import EditYourClubStep from './EditYourClubStep';

interface EditPanelProps {
  isVisible: boolean;
  onClose: () => void;
  mode: 'name' | 'email' | 'club';
  initialName?: string;
  initialEmail?: string;
  initialClub?: string;
  onSaveName?: (name: string) => void;
  onSaveEmail?: (email: string) => void;
  onSaveClub?: (club: string) => void;
  onUpdate?: () => void;
}

const EditPanel: React.FC<EditPanelProps> = ({
  isVisible,
  onClose,
  mode,
  initialName,
  initialEmail,
  initialClub,
  onSaveName,
  onSaveEmail,
  onSaveClub,
  onUpdate,
}) => {
  const panelRef = useRef<SimpleSlidingPanelRef>(null);

  const getTitle = () => {
    switch (mode) {
      case 'name':
        return 'Edit Name';
      case 'email':
        return 'Edit Email';
      case 'club':
        return 'Edit Club';
      default:
        return '';
    }
  };

  const handleClose = () => {
    panelRef.current?.handleClose();
  };

  return (
    <SimpleSlidingPanel
      ref={panelRef}
      isVisible={isVisible}
      onClose={onClose}
      title={getTitle()}
    >
      {mode === 'name' && (
        <EditNameStep
          onClose={handleClose}
          onSave={onSaveName!}
          initialName={initialName!}
          onUpdateStart={() => {}}
          onUpdate={onUpdate}
        />
      )}
      {mode === 'email' && (
        <EditEmailStep
          onClose={handleClose}
          onSave={onSaveEmail!}
          initialEmail={initialEmail!}
        />
      )}
      {mode === 'club' && (
        <EditYourClubStep
          onClose={handleClose}
          onSave={onSaveClub!}
          initialClub={initialClub!}
          onUpdate={onUpdate}
        />
      )}
    </SimpleSlidingPanel>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
});

export default EditPanel; 
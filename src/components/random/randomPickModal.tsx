import { Modal, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { RandomItemSelect } from '@_components/random/randomItemSelect';
import { Restaurant } from '@_types/Restaurant';

interface RandomPickerModalProps {
  visible: boolean;
  info: Restaurant[];
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  visible,
  onClose,
  onIndexChange,
  info,
}) => {
  return (
    <Modal style={styles.modal} visible={visible} onRequestClose={onClose}>
      <View style={styles.modal}>
        <RandomItemSelect
          itemHeight={36}
          items={info}
          onIndexChange={onIndexChange}
        />
        <Button onPress={onClose}>Close</Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

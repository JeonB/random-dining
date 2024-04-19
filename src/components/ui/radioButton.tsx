import React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
interface GroupRadioButtonProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const GroupRadioButton = ({ category, setCategory }: GroupRadioButtonProps) => {
  return (
    <View
      style={{
        width: 400,
        flexDirection: 'row',
      }}>
      <RadioButton.Item
        label="올랜덤"
        value=""
        onPress={() => setCategory('')}
        status={category === '' ? 'checked' : 'unchecked'}
      />
      <RadioButton.Item
        label="한식"
        value="한식"
        onPress={() => setCategory('한식')}
        status={category === '한식' ? 'checked' : 'unchecked'}
      />
      <RadioButton.Item
        label="일식"
        value="일식"
        onPress={() => setCategory('일식')}
        status={category === '일식' ? 'checked' : 'unchecked'}
      />
      <RadioButton.Item
        label="중식"
        value="중식"
        onPress={() => setCategory('중식')}
        status={category === '중식' ? 'checked' : 'unchecked'}
      />
      <RadioButton.Item
        label="양식"
        value="양식"
        onPress={() => setCategory('양식')}
        status={category === '양식' ? 'checked' : 'unchecked'}
      />
      <RadioButton.Item
        label="분식"
        value="분식"
        onPress={() => setCategory('분식')}
        status={category === '분식' ? 'checked' : 'unchecked'}
      />
    </View>
  );
};

export default GroupRadioButton;

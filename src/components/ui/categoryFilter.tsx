import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FiltersProps, FilterButtonProps } from '@_types/filter';

const Filters: React.FC<FiltersProps> = ({ data, onValueChange }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([0]);
  useEffect(() => {
    handleToggleSelection(0);
  }, []);

  const handleToggleSelection = (index: number) => {
    let newSelectedIndices = [...selectedIndices];

    if (index === 0) {
      newSelectedIndices = [0];
    } else {
      newSelectedIndices = newSelectedIndices.includes(0)
        ? [index]
        : newSelectedIndices.includes(index)
          ? newSelectedIndices.filter(idx => idx !== index)
          : [...newSelectedIndices, index];

      if (newSelectedIndices.length === data.length - 1) {
        newSelectedIndices = [0];
      }
    }

    if (newSelectedIndices.length === 0) {
      newSelectedIndices = [0];
    }

    setSelectedIndices(newSelectedIndices);

    if (onValueChange) {
      const selectedValues = newSelectedIndices.map(
        selectedIndex => data[selectedIndex].value,
      );
      onValueChange(selectedValues);
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {data.map((x, i) => (
        <FilterButton
          key={i}
          text={x.label}
          isSelected={selectedIndices.includes(i)}
          onPress={() => handleToggleSelection(i)}
        />
      ))}
    </View>
  );
};

const FilterButton: React.FC<FilterButtonProps> = ({
  onPress,
  text,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 20,
        borderColor: '#003366',
        borderWidth: 2,
        padding: 10,
        margin: 4,
        backgroundColor: isSelected ? '#003366' : 'white',
      }}>
      <Text style={{ color: isSelected ? 'white' : '#003366' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Filters;

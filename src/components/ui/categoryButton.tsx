import React, { useState } from 'react';
import Filters from '@_components/ui/categoryFilter';

interface CategoryButtonProps {
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

const FILTER_DATA = [
  { label: 'ALL', value: '맛집' },
  { label: '한식', value: '한식' },
  { label: '일식', value: '일식' },
  { label: '중식', value: '중식' },
  { label: '양식', value: '양식' },
  { label: '분식', value: '분식' },
];

const CategoryButton = ({ category, setCategory }: CategoryButtonProps) => {
  const handleCategoryChange = (selectedValues: string[]) => {
    setCategory(selectedValues);
  };

  return <Filters data={FILTER_DATA} onValueChange={handleCategoryChange} />;
};
export default CategoryButton;

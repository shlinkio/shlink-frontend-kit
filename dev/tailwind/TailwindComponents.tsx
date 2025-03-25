import type { FC } from 'react';
import { Route, Routes } from 'react-router';
import { InputsPage } from './forms/InputsPage';
import { SearchInputPage } from './forms/SearchInputPage';

export const TailwindComponents: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h2 className="text-center">Select component - Tailwind</h2>} />
      <Route path="/forms/inputs" element={<InputsPage />} />
      <Route path="/forms/search-input" element={<SearchInputPage />} />
      <Route path="*" element={<h2 className="text-center">Not found - Tailwind</h2>} />
    </Routes>
  );
};

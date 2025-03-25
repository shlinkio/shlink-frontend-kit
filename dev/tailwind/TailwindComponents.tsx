import type { FC } from 'react';
import { Route, Routes } from 'react-router';
import { ButtonsPage } from './forms/ButtonsPage';
import { InputsPage } from './forms/InputsPage';
import { SearchInputPage } from './forms/SearchInputPage';
import { CardsPage } from './surfaces/CardsPage';

export const TailwindComponents: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h2 className="text-center">Select component - Tailwind</h2>} />
      <Route path="/forms/inputs" element={<InputsPage />} />
      <Route path="/forms/search-input" element={<SearchInputPage />} />
      <Route path="/forms/buttons" element={<ButtonsPage />} />
      <Route path="/surfaces/cards" element={<CardsPage />} />
      <Route path="*" element={<h2 className="text-center">Not found - Tailwind</h2>} />
    </Routes>
  );
};

import type { FC } from 'react';
import { Route, Routes } from 'react-router';
import { TablePage } from './content/TablePage';
import { ModalDialogPage } from './feedback/ModalDialogPage';
import { ButtonsPage } from './form/ButtonsPage';
import { InputsPage } from './form/InputsPage';
import { SearchInputPage } from './form/SearchInputPage';
import { PaginatorPage } from './navigation/PaginatorPage';
import { CardsPage } from './surfaces/CardsPage';

export const TailwindComponents: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h2 className="text-center">Select component - Tailwind</h2>} />
      <Route path="/form/inputs" element={<InputsPage />} />
      <Route path="/form/search-input" element={<SearchInputPage />} />
      <Route path="/form/buttons" element={<ButtonsPage />} />
      <Route path="/surfaces/cards" element={<CardsPage />} />
      <Route path="/content/tables" element={<TablePage />} />
      <Route path="/navigation/paginator" element={<PaginatorPage />} />
      <Route path="/feedback/dialogs" element={<ModalDialogPage />} />
      <Route path="*" element={<h2 className="text-center">Not found - Tailwind</h2>} />
    </Routes>
  );
};

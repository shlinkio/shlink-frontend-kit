import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { DetailsPage } from './content/DetailsPage';
import { TablePage } from './content/TablePage';
import { MessagePage } from './feedback/MessagePage';
import { ModalDialogPage } from './feedback/ModalDialogPage';
import { ResultPage } from './feedback/ResultPage';
import { TooltipPage } from './feedback/TooltipPage';
import { ButtonsPage } from './form/ButtonsPage';
import { InputsPage } from './form/InputsPage';
import { SearchComboboxPage } from './form/SearchComboboxPage';
import { SearchInputPage } from './form/SearchInputPage';
import { Menu } from './Menu';
import { DropdownPage } from './navigation/DropdownPage';
import { MenuPage } from './navigation/MenuPage';
import { NavBarPage } from './navigation/NavBarPage';
import { NavPillsPage } from './navigation/NavPillsPage';
import { PaginatorPage } from './navigation/PaginatorPage';
import { CardsPage } from './surfaces/CardsPage';
import { ThemeToggle } from './ThemeToggle';
import { UtilsPage } from './utils/UtilsPage';
import './tailwind.css';

export const App: FC = () => (
  <BrowserRouter>
    <div className="container m-auto p-5">
      <div className="flex gap-3 mt-2 mb-6">
        <div className="grow">
          <Menu />
        </div>
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<h2 className="text-center">Select component</h2>} />
        <Route path="/form/inputs" element={<InputsPage />} />
        <Route path="/form/search-input" element={<SearchInputPage />} />
        <Route path="/form/search-combobox" element={<SearchComboboxPage />} />
        <Route path="/form/buttons" element={<ButtonsPage />} />
        <Route path="/surfaces/cards" element={<CardsPage />} />
        <Route path="/content/tables" element={<TablePage />} />
        <Route path="/content/details" element={<DetailsPage />} />
        <Route path="/navigation/paginator" element={<PaginatorPage />} />
        <Route path="/navigation/nav-bar" element={<NavBarPage />} />
        <Route path="/navigation/nav-pills">
          <Route path="" element={<NavPillsPage />} />
          <Route path="*" element={<NavPillsPage />} />
        </Route>
        <Route path="/navigation/menu" element={<MenuPage />} />
        <Route path="/navigation/dropdown" element={<DropdownPage />} />
        <Route path="/feedback/dialogs" element={<ModalDialogPage />} />
        <Route path="/feedback/result" element={<ResultPage />} />
        <Route path="/feedback/message" element={<MessagePage />} />
        <Route path="/feedback/tooltip" element={<TooltipPage />} />
        <Route path="/utils" element={<UtilsPage />} />
        <Route path="*" element={<h2 className="text-center">Not found</h2>} />
      </Routes>
    </div>
  </BrowserRouter>
);

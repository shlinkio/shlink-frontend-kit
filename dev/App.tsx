import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MessagePage } from './block/MessagePage';
import { ResultPage } from './block/ResultPage';
import { SimpleCardPage } from './block/SimpleCardPage';
import { BooleanControlsPage } from './form/BooleanControlsPage';
import { SearchFieldPage } from './form/SearchFieldPage';
import { Menu } from './Menu';
import { DropdownsPage } from './navigation/DropdownsPage';
import { NavPillsPage } from './navigation/NavPillsPage';
import { OrderingDropdownPage } from './ordering/OrderingDropdownPage';
import { TailwindComponents } from './tailwind/TailwindComponents';
import { ThemeToggle } from './ThemeToggle';
import './tailwind/tailwind.css';

export const App: FC = () => (
  <BrowserRouter>
    <div className="tw:container tw:m-auto tw:py-5">
      <Menu />
      <div className="tw:flex tw:flex-row-reverse tw:my-4">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<h2 className="text-center">Select component</h2>} />
        <Route path="/block/message" element={<MessagePage />} />
        <Route path="/block/result" element={<ResultPage />} />
        <Route path="/block/simple-card" element={<SimpleCardPage />} />
        <Route path="/form/boolean-controls" element={<BooleanControlsPage />} />
        <Route path="/form/search-field" element={<SearchFieldPage />} />
        <Route path="/navigation/dropdowns" element={<DropdownsPage />} />
        <Route path="/navigation/nav-pills">
          <Route path="" element={<NavPillsPage />} />
          <Route path="*" element={<NavPillsPage />} />
        </Route>
        <Route path="/ordering/ordering-dropdown" element={<OrderingDropdownPage />} />
        <Route path="/tailwind">
          <Route path="" element={<TailwindComponents />} />
          <Route path="*" element={<TailwindComponents />} />
        </Route>
        <Route path="*" element={<h2 className="text-center">Not found</h2>} />
      </Routes>
    </div>
  </BrowserRouter>
);

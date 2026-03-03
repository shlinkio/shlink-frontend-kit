import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Menu } from './Menu';
import { CardsPage } from './surfaces/CardsPage';
import { ThemeToggle } from './ThemeToggle';
import { UtilsPage } from './utils/UtilsPage';
import '../.storybook/tailwind.css';

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
        <Route path="/surfaces/cards" element={<CardsPage />} />
        <Route path="/utils" element={<UtilsPage />} />
        <Route path="*" element={<h2 className="text-center">Not found</h2>} />
      </Routes>
    </div>
  </BrowserRouter>
);

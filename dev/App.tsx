import type { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { MessagePage } from './block/MessagePage';
import { ResultPage } from './block/ResultPage';
import { SimpleCardPage } from './block/SimpleCardPage';
import { BooleanControlsPage } from './form/BooleanControlsPage';
import { SearchFieldPage } from './form/SearchFieldPage';
import { DropdownsPage } from './navigation/DropdownsPage';
import { NavPillsPage } from './navigation/NavPillsPage';
import { OrderingDropdownPage } from './ordering/OrderingDropdownPage';
import { ThemeToggle } from './ThemeToggle';

export const App: FC = () => (
  <BrowserRouter>

    <div className="container">
      <ul className="mb-4">
        <li><Link to="/block/message">Message</Link></li>
        <li><Link to="/block/result">Result</Link></li>
        <li><Link to="/block/simple-card">SimpleCard</Link></li>
        <li><Link to="/form/boolean-controls">BooleanControl</Link></li>
        <li><Link to="/form/search-field">SearchField</Link></li>
        <li><Link to="/navigation/dropdowns">Dropdowns</Link></li>
        <li><Link to="/navigation/nav-pills">NavPills</Link></li>
        <li><Link to="/ordering/ordering-dropdown">OrderingDropdown</Link></li>
      </ul>
      <div className="float-end">
        <ThemeToggle />
      </div>
      <div className="clearfix mb-3" />
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
        <Route path="*" element={<h2 className="text-center">Not found</h2>} />
      </Routes>
    </div>
  </BrowserRouter>
);

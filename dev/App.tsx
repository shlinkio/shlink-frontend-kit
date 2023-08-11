import type { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { MessagePage } from './block/MessagePage';
import { ResultPage } from './block/ResultPage';
import { SimpleCardPage } from './block/SimpleCardPage';
import { BooleanControlsPage } from './form/BooleanControlsPage';
import { SearchFieldPage } from './form/SearchFieldPage';

export const App: FC = () => (
  <BrowserRouter>

    <div className="container">
      <ul className="mb-4">
        <li><Link to="/block/message">Message</Link></li>
        <li><Link to="/block/result">Result</Link></li>
        <li><Link to="/block/simple-card">SimpleCard</Link></li>
        <li><Link to="/block/boolean-controls">BooleanControl</Link></li>
        <li><Link to="/block/search-field">SearchField</Link></li>
      </ul>
      <Routes>
        <Route path="/block/message" element={<MessagePage />} />
        <Route path="/block/result" element={<ResultPage />} />
        <Route path="/block/simple-card" element={<SimpleCardPage />} />
        <Route path="/block/boolean-controls" element={<BooleanControlsPage />} />
        <Route path="/block/search-field" element={<SearchFieldPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

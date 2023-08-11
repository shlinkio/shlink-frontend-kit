import type { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { MessagePage } from './block/MessagePage';
import { ResultPage } from './block/ResultPage';

export const App: FC = () => (
  <BrowserRouter>

    <div className="container">
      <ul className="mb-5">
        <li><Link to="/block/message">Message</Link></li>
        <li><Link to="/block/result">Result</Link></li>
      </ul>
      <Routes>
        <Route path="/block/message" element={<MessagePage />} />
        <Route path="/block/result" element={<ResultPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

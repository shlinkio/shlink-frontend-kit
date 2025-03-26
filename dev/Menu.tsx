import type { FC } from 'react';
import { Link, useLocation } from 'react-router';

export const Menu: FC = () => {
  const location = useLocation();

  return (
    <ul className="tw:p-0">
      {location.pathname.startsWith('/tailwind') ? (
        <>
          <li><Link to="/">Home</Link></li>
          <hr/>
          <li><Link to="/tailwind/forms/inputs">Inputs</Link></li>
          <li><Link to="/tailwind/forms/search-input">SearchInput</Link></li>
          <li><Link to="/tailwind/forms/buttons">Buttons</Link></li>
          <li><Link to="/tailwind/surfaces/cards">Cards</Link></li>
          <li><Link to="/tailwind/content/tables">Tables</Link></li>
          <li><Link to="/tailwind/navigation/paginator">Paginator</Link></li>
        </>
      ) : (
        <>
          <li><Link to="/block/message">Message</Link></li>
          <li><Link to="/block/result">Result</Link></li>
          <li><Link to="/block/simple-card">SimpleCard</Link></li>
          <li><Link to="/form/boolean-controls">BooleanControl</Link></li>
          <li><Link to="/form/search-field">SearchField</Link></li>
          <li><Link to="/navigation/dropdowns">Dropdowns</Link></li>
          <li><Link to="/navigation/nav-pills">NavPills</Link></li>
          <li><Link to="/ordering/ordering-dropdown">OrderingDropdown</Link></li>
          <hr />
          <li><Link to="/tailwind">Tailwind components</Link></li>
        </>
      )}
    </ul>
  );
};

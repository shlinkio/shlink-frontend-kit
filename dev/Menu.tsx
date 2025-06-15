import type { FC } from 'react';
import { Link, useLocation } from 'react-router';

export const Menu: FC = () => {
  const location = useLocation();

  return (
    <ul className="tw:p-0">
      {location.pathname.startsWith('/tailwind') ? (
        <>
          <li><Link to="/">Home</Link></li>
          <hr />
          <li><Link to="/tailwind/form/inputs">Inputs</Link></li>
          <li><Link to="/tailwind/form/search-input">SearchInput</Link></li>
          <li><Link to="/tailwind/form/search-combobox">SearchCombobox</Link></li>
          <li><Link to="/tailwind/form/buttons">Buttons</Link></li>
          <li><Link to="/tailwind/surfaces/cards">Cards</Link></li>
          <li><Link to="/tailwind/content/tables">Tables</Link></li>
          <li><Link to="/tailwind/content/details">Details</Link></li>
          <li><Link to="/tailwind/navigation/paginator">Paginator</Link></li>
          <li><Link to="/tailwind/navigation/nav-bar">NavBar</Link></li>
          <li><Link to="/tailwind/navigation/nav-pills">NavPills</Link></li>
          <li><Link to="/tailwind/navigation/menu">Menu</Link></li>
          <li><Link to="/tailwind/navigation/dropdown">Dropdown</Link></li>
          <li><Link to="/tailwind/feedback/dialogs">Dialogs</Link></li>
          <li><Link to="/tailwind/feedback/tooltip">Tooltip</Link></li>
          <li><Link to="/tailwind/feedback/result">Result</Link></li>
          <li><Link to="/tailwind/feedback/message">Message</Link></li>
          <li><Link to="/tailwind/utils">Utils</Link></li>
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
          <li><Link to="/hooks/hooks">HooksPage</Link></li>
          <hr />
          <li><Link to="/tailwind">Tailwind components</Link></li>
        </>
      )}
    </ul>
  );
};

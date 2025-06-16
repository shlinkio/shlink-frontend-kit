import type { FC } from 'react';
import { Link } from 'react-router';

export const Menu: FC = () => {
  return (
    <ul className="p-0">
      <li><Link to="/">Home</Link></li>
      <hr />
      <li><Link to="/form/inputs">Inputs</Link></li>
      <li><Link to="/form/search-input">SearchInput</Link></li>
      <li><Link to="/form/search-combobox">SearchCombobox</Link></li>
      <li><Link to="/form/buttons">Buttons</Link></li>
      <li><Link to="/surfaces/cards">Cards</Link></li>
      <li><Link to="/content/tables">Tables</Link></li>
      <li><Link to="/content/details">Details</Link></li>
      <li><Link to="/navigation/paginator">Paginator</Link></li>
      <li><Link to="/navigation/nav-bar">NavBar</Link></li>
      <li><Link to="/navigation/nav-pills">NavPills</Link></li>
      <li><Link to="/navigation/menu">Menu</Link></li>
      <li><Link to="/navigation/dropdown">Dropdown</Link></li>
      <li><Link to="/feedback/dialogs">Dialogs</Link></li>
      <li><Link to="/feedback/tooltip">Tooltip</Link></li>
      <li><Link to="/feedback/result">Result</Link></li>
      <li><Link to="/feedback/message">Message</Link></li>
      <li><Link to="/utils">Utils</Link></li>
    </ul>
  );
};

import { useState } from 'preact/hooks';
import DropDown from './DropDownButton.jsx';
import ButtonDynamic from '../components/ButtonDynamic.tsx';
import Breadcrumb from './Breadcrumb.tsx';
import { Navbar } from 'flowbite-react';
import { Logo } from "@harbor/atomic";

interface User {
  name: string;
  email: string;
}

export function Header() {
  const user: User = {
    name: 'Matthew Smith',
    email: 'matthew.smith@fathym.com',
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <Logo />
      </Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link href="/dashboard" active>
          Dashboard
        </Navbar.Link>

        <Navbar.Link href="/dashboard/portrayals">Portrayals</Navbar.Link>

        <Navbar.Link href="/dashboard/reports">Reports</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

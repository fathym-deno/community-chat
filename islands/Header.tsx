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
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
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
    </Navbar >
  );
}

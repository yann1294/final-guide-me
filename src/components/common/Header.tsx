"use client"
import React, { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation'; // Importing useRouter from 'next/navigation'
import Logo from '../../../public/assets/images/logo2.png';

interface State {
  activeMenu: string;
  props: string;
  showUserDropdown: boolean; 
}

const initialState: State = { activeMenu: '', props: '', showUserDropdown: false };

function reducer(state: State, action: { type: string }): State {
  switch (action.type) {
    case 'home':
      return { ...state, activeMenu: 'home' };
    case 'about':
      return { ...state, activeMenu: 'about' };
    case 'destinations':
      return { ...state, activeMenu: 'destinations' };
    case 'tours':
      return { ...state, activeMenu: 'tours' };
    case 'contact':
      return { ...state, activeMenu: 'contact' };
    case 'toggleUserDropdown': // New action type to toggle user dropdown
      return { ...state, showUserDropdown: !state.showUserDropdown };
    default:
      return state;
  }
}

const Header: React.FC = () => {
 // Using useRouter from 'next/navigation'

  const [active, setActive] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isSticky = () => {
      const header = document.querySelector('.header-area');
      const scrollTop = window.scrollY;
      if (header) {
        scrollTop >= 20 ? header.classList.add('sticky') : header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const handleSearchFullScreen = () => {
    setActive(prevActive => !prevActive);
  };

  const handleSidebar = () => {
    setSidebar(prevSidebar => !prevSidebar);
  };

  const toggleUserDropdown = () => { // Function to toggle user dropdown
    dispatch({ type: 'toggleUserDropdown' });
  };

  const currentRoute = usePathname(); // Using usePathname() method

  return (
    <header>
      <div className="header-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
              <div className="navbar-wrap">
                <div className="logo d-flex justify-content-between">
                  <Link href="/">
                    <Image src={Logo} alt="logo" width={100} height={100} />
                  </Link>
                </div>
                <div className="navbar-icons">
                  <div className="mobile-menu d-flex ">
                    <div className="top-search-bar m-0 d-block d-xl-none"></div>
                    <a
                      href="#"
                      onClick={handleSidebar}
                      className={`hamburger d-block d-xl-none ${sidebar ? 'h-active' : ''}`}
                    >
                      <span className="h-top" />
                      <span className="h-middle" />
                      <span className="h-bottom" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <nav className={sidebar ? 'main-nav slidenav' : 'main-nav '}>
                <div className="navber-logo-sm">
                  <Image src={Logo} alt="logo 2" className="img-fluid" width={200} height={200} />
                </div>
                <ul>
                  <li>
                    <Link className={currentRoute === '/' ? 'active' : ''} href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className={currentRoute === '/about' ? 'active' : ''} href="/about">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={currentRoute === '/destinations' ? 'active' : ''}
                      href="/destinations"
                    >
                      Destinations
                    </Link>
                  </li>
                  <li>
                    <Link className={currentRoute === '/tours' ? 'active' : ''} href="/tours">
                      Tours
                    </Link>
                  </li>
                  <li>
                    <Link className={currentRoute === '/contact' ? 'active' : ''} href="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <div className="navbar-icons-2">
                  <div className="user-dropdown-icon" onClick={toggleUserDropdown}>
                    <i className="flaticon-user" />
                    {state.showUserDropdown && ( // Show user dropdown only if showUserDropdown is true
                    <div className="account-dropdown activeCard">
                      <ul>
                      <li className="account-el">
                              <i className="bx bx-user-pin" />
                              <Link href="/login">Sign in</Link>
                            </li>
                            <li className="account-el">
                              <i className="bx bxs-user-account" />
                              <Link href="/guideSignUp">Guide</Link>
                            </li>
                      </ul>
                    </div>
                    )}
                    </div>
                </div>
                <div className="sidebar-contact">
                  <ul>
                    <li className="sidebar-single-contact">
                      <i className="bx bxs-phone" /> <a href="tel:+17632275032">+1 763-227-5032</a>
                    </li>
                    <li className="sidebar-single-contact">
                      <i className="bx bxs-envelope" />
                      <a href="mailto:staff@guidemeapp.net">staff@guidemeapp.net</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

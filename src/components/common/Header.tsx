import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { State } from "swr";

export default function Header() {
  interface State {
    activeMenu: string, props?: string
  }
  const [active, setActive ] = useState<boolean | number>(false);
  const [sidebar, setSidebar ] = useState<boolean | number>(false);
  const [profile, setProfile ] = useState<boolean | number>(false);

  const handleSearchFullScreen = () => {
    if (active === false || active === 0) {
      setActive(1);
      
    } else {
      setActive(false);
    }
  };
  const handleProfile = () => {
    if (profile === false || profile === 0) {
      setProfile(1);
      
    } else {
      setProfile(false);
    }
  };
  const handleSidebar = () => {
    if (sidebar === false || sidebar === 0) {
      setSidebar(1);
      
    } else {
      setSidebar(false);
    }
  };
  const initialState = { activeMenu: "", props: "" };
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state: State, action: { type: string }): State {
    switch (action.type) {
      case "homeOne":
        return { activeMenu: "homeOne" };
      case "Package":
        return { activeMenu: "Package" };
      case "pages":
        return { activeMenu: "pages" };
      default:
        return { activeMenu: "" };
    }
  }

  /*----------- Method that will fix header after a specific scrollable -----------*/
  const isSticky = (e: any) => {
    const header = document.querySelector(".header-area");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 20
        ? header.classList.add('sticky')
        : header.classList.remove('sticky');
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  return (
    <header>
      <div
        className={"header-area"}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
              <div className="navbar-wrap">
                <div className="logo d-flex justify-content-between">
                  <Link href="/">
                    <div className="navbar-brand">
                      <img style={{ objectFit: "contain", height: "94px"}} src="/assets/images/logo.png" alt="logo" />
                    </div>
                  </Link>
                </div>
                <div className="navbar-icons">
                  <div className="searchbar-open" onClick={handleSearchFullScreen}>
                    <i className="flaticon-magnifier" />
                  </div>
                  <div className="user-dropdown-icon">
                    <i className="flaticon-user" onClick={handleProfile} />
                    <div className={profile === 1? "account-dropdown activeCard":"account-dropdown"}>
                      <ul>
                        <li className="account-el">
                          <i className="bx bx-user-pin" />
                          <Link href="#">
                            Sign in
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bxs-user-account" />
                          <Link href="#">
                            My Account
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bx-extension" />
                          <Link href="#">
                            Settings
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bx-log-in-circle" />
                          <Link href="#">
                            Log out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mobile-menu d-flex ">
                    <div className="top-search-bar m-0 d-block d-xl-none"></div>
                    {/* <a
                      href="#"
                      onClick={handleSidebar}
                      className={
                        sidebar === 1
                          ? "hamburger d-block d-xl-none h-active"
                          : "hamburger d-block d-xl-none"
                      }
                    >
                      <span className="h-top"  />
                      <span className="h-middle" />
                      <span className="h-bottom" />
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <nav className={sidebar === 1 ? "main-nav slidenav" : "main-nav"}>
                <ul>
                  <li className="">
                    <Link href="/" >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/packages">
                      Packages
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/tours">
                      Tours
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <div className="navbar-icons-2">
                  <div
                    className="searchbar-open"
                    onClick={handleSearchFullScreen}
                  >
                    <i className="flaticon-magnifier" />
                  </div>
                  <div className="user-dropdown-icon" onClick={handleProfile}>
                    <i className="flaticon-user" />
                    <div className={profile === 1? "account-dropdown activeCard":"account-dropdown"}>
                      <ul>
                      <li className="account-el">
                          <i className="bx bx-user-pin" />
                          <Link href="/login/tourist">
                            Sign in as tourist
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bx-user-pin" />
                          <Link href="/login/guide">
                            Sign in as guide
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bxs-user-account" />
                          <Link href="/profile">
                            My Profile
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bx-extension" />
                          <Link href="#">
                            Settings
                          </Link>
                        </li>
                        <li className="account-el">
                          <i className="bx bx-log-in-circle" />
                          <Link href="#">
                            Log out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <form>
          <div
            className={
              active ===1
                ? "main-searchbar activeSearch"
                : "main-searchbar"
            }
          >
            <div
              className="searchbar-close"
              onClick={handleSearchFullScreen}
            >
              <i className="bx bx-x" />
            </div>
            <input type="text" placeholder="Search Here......" />
            <div className="searchbar-icon">
              <i className="bx bx-search" />
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}

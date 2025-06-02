// components/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import useAuthStore from "@/stores/authStore";

interface AuthState {
  activeMenu: string;
  props?: string;
}

export default function Header() {
  const [active, setActive] = useState<boolean | number>(false);
  const [sidebar, setSidebar] = useState<boolean | number>(false);
  const [profile, setProfile] = useState<boolean | number>(false);

  // Pull user and logout from Zustand
  const { user, logout } = useAuthStore();

  const router = useRouter();

  const handleSearchFullScreen = () => {
    setActive((prev) => (prev === false || prev === 0 ? 1 : false));
  };

  const handleProfile = () => {
    setProfile((prev) => (prev === false || prev === 0 ? 1 : false));
  };

  const handleSidebar = () => {
    setSidebar((prev) => (prev === false || prev === 0 ? 1 : false));
  };

  const initialState: AuthState = { activeMenu: "", props: "" };
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state: AuthState, action: { type: string }): AuthState {
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

  /* Sticky header on scroll */
  const isSticky = () => {
    const header = document.querySelector(".header-area");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 20
        ? header.classList.add("sticky")
        : header.classList.remove("sticky");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  /** When the user clicks “Log out,” clear Zustand and redirect to home */
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  /** If the user is signed in, we’ll use their role name to build the “My Profile” link. */
  const profileLink = user ? `/dashboard/${user.role.name}` : "/";

  return (
    <header>
      <div className="header-area">
        <div className="container">
          <div className="row">
            {/* Logo & icons */}
            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
              <div className="navbar-wrap">
                <div className="logo d-flex justify-content-between">
                  <Link href="/">
                    <div className="navbar-brand">
                      <img
                        style={{ objectFit: "contain", height: "94px" }}
                        src="/assets/images/logo.png"
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="navbar-icons">
                  <div
                    className="searchbar-open"
                    onClick={handleSearchFullScreen}
                  >
                    <i className="flaticon-magnifier" />
                  </div>
                  <div className="user-dropdown-icon">
                    <i className="flaticon-user" onClick={handleProfile} />
                    <div
                      className={
                        profile === 1
                          ? "account-dropdown activeCard"
                          : "account-dropdown"
                      }
                    >
                      <ul>
                        {user ? (
                          // ─── Logged‐in dropdown ───────────────────────────────────
                          <>
                            <li className="account-el">
                              <i className="bx bxs-user-account" />
                              <Link href={profileLink}>My Profile</Link>
                            </li>
                            <li className="account-el">
                              <i className="bx bx-log-in-circle" />
                              <button
                                onClick={handleLogout}
                                className="w-full text-left"
                              >
                                Log out
                              </button>
                            </li>
                          </>
                        ) : (
                          // ─── Logged‐out dropdown ──────────────────────────────────
                          <>
                            <li className="account-el">
                              <i className="bx bx-user-pin" />
                              <Link href="/login/tourist">
                                Sign in as tourist
                              </Link>
                            </li>
                            <li className="account-el">
                              <i className="bx bx-user-pin" />
                              <Link href="/login/guide">Sign in as guide</Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="mobile-menu d-flex ">
                    <div className="top-search-bar m-0 d-block d-xl-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main navigation */}
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <nav className={sidebar === 1 ? "main-nav slidenav" : "main-nav"}>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/packages">Packages</Link>
                  </li>
                  <li>
                    <Link href="/tours">Tours</Link>
                  </li>
                  <li>
                    <Link href="/about">About us</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
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
                    <div
                      className={
                        profile === 1
                          ? "account-dropdown activeCard"
                          : "account-dropdown"
                      }
                    >
                      <ul>
                        {user ? (
                          // ─── Logged‐in dropdown ───────────────────────────────────
                          <>
                            <li className="account-el">
                              <i className="bx bxs-user-account" />
                              <Link href={profileLink}>My Profile</Link>
                            </li>
                            <li className="account-el">
                              <i className="bx bx-log-in-circle" />
                              <button
                                onClick={handleLogout}
                                className="w-full text-left"
                              >
                                Log out
                              </button>
                            </li>
                          </>
                        ) : (
                          // ─── Logged‐out dropdown ──────────────────────────────────
                          <>
                            <li className="account-el">
                              <i className="bx bx-user-pin" />
                              <Link href="/login/tourist">
                                Sign in as tourist
                              </Link>
                            </li>
                            <li className="account-el">
                              <i className="bx bx-user-pin" />
                              <Link href="/login/guide">Sign in as guide</Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Searchbar Overlay */}
        <form>
          <div
            className={
              active === 1 ? "main-searchbar activeSearch" : "main-searchbar"
            }
          >
            <div className="searchbar-close" onClick={handleSearchFullScreen}>
              <i className="bx bx-x" />
            </div>
            <input type="text" placeholder="Search Here……" />
            <div className="searchbar-icon">
              <i className="bx bx-search" />
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}

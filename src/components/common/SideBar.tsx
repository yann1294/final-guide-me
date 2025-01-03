"use client";
import useUIStore from "@/stores/uiStore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
    const { isSidebarOpen, toggleSidebar } = useUIStore();
        
    return (
        <div className={ "side-bar-container " + (isSidebarOpen ? "open-side-bar" : "close-side-bar")}>
            <div className="topbar-area">
            <div
            onClick={toggleSidebar}
            className="hamburger-button">
                <div>{isSidebarOpen ? <X /> : <ChevronRight />}</div>
            </div>
            </div>
            <div className="logo d-flex justify-content-center">
                  <Link href="/">
                    <div className="navbar-brand">
                      <img style={{ objectFit: "contain", height: "94px"}} src="/assets/images/logo.png" alt="logo" />
                    </div>
                  </Link>
                </div>
            <div className="side-bar-options">
            <div className="side-bar-option active">
                    <Link href={"#"}>Dashboard</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Tours</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Packages</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Bookings</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Payments</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Guides</Link>
                </div>
                <div className="side-bar-option">
                    <Link href={"#"}>Profile</Link>
                </div>
            </div>
        </div>
    );
}
"use client";
import useUIStore from "@/stores/uiStore";
import { ChevronRight, ChevronDown, X, Eye, PlusCircle } from "lucide-react"; // Import icons
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
    const { isSidebarOpen, toggleSidebar } = useUIStore();
    const [activeSection, setActiveSection] = useState<string | null>(null); // Tracks the currently open section

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className={"side-bar-container " + (isSidebarOpen ? "open-side-bar" : "close-side-bar")}>
            <div className="topbar-area">
                <div onClick={toggleSidebar} className="hamburger-button">
                    <div>{isSidebarOpen ? <X /> : <ChevronRight />}</div>
                </div>
            </div>
            <div className="logo d-flex justify-content-center">
                <Link href="/">
                    <div className="navbar-brand">
                        <img style={{ objectFit: "contain", height: "94px" }} src="/assets/images/logo.png" alt="logo" />
                    </div>
                </Link>
            </div>
            <div className="side-bar-options">
                <div className="side-bar-option active">
                    <Link href={"#"}>Dashboard</Link>
                </div>
                <div className="side-bar-option" onClick={() => toggleSection("Tours")}>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link href={"#"}>Tours</Link>
                        {activeSection === "Tours" ? <ChevronDown /> : <ChevronRight />}
                    </div>
                    {activeSection === "Tours" && (
                        <div className="sub-options">
                            <div className="sub-option view d-flex align-items-center">
                                <Eye size={16} style={{ marginRight: "8px" }} /> 
                                <Link href={"#"}>View</Link>
                            </div>
                            <div className="sub-option create d-flex align-items-center">
                                <PlusCircle size={16} style={{ marginRight: "8px" }} /> 
                                <Link href={"#"}>Create</Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="side-bar-option" onClick={() => toggleSection("Packages")}>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link href={"#"}>Packages</Link>
                        {activeSection === "Packages" ? <ChevronDown /> : <ChevronRight />}
                    </div>
                    {activeSection === "Packages" && (
                        <div className="sub-options">
                            <div className="sub-option view d-flex align-items-center">
                                <Eye size={16} style={{ marginRight: "8px" }} /> 
                                <Link href={"#"}>View</Link>
                            </div>
                            <div className="sub-option create d-flex align-items-center">
                                <PlusCircle size={16} style={{ marginRight: "8px" }} /> 
                                <Link href={"#"}>Create</Link>
                            </div>
                        </div>
                    )}
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

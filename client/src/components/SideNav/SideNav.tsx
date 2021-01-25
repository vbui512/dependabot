import React from "react";
import { useLocation } from "react-router-dom";
import { pages } from "../../util/pages";
import styles from "./SideNav.module.css";
import SideNavCircle from "./SideNavCircle";

const SideNav = () => {
    const { pathname } = useLocation();

    return (
        <div className={styles.container}>
            {pages.map((page) => (
                <SideNavCircle page={page} active={page.path === pathname} />
            ))}
        </div>
    );
};

export default SideNav;

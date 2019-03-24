import React from 'react';
import NavItem from './NavItem/NavItem';

import classes from './NavItems.module.css'

const navItems = props => {
    return(
        <ul className={classes.NavItems}>
            <NavItem href="/" active >Burger Builder</NavItem>
            <NavItem href="/">Checkout</NavItem>
        </ul>
    );
}

export default navItems;
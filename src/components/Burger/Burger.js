import React from 'react';

import './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = props => {

    let content = [];
    let msg = "Please start adding ingredients"

    for(let i = props.ingredients.length-1; i >= 0; i-- ){
        content.push( <Ingredient name={props.ingredients[i]} />);
    }

    return (
        <div className="Burger">
            <Ingredient name="BreadTop" />
            {content.length !== 0 ? content : msg}
            <Ingredient name="BreadBottom" />
        </div>
    );
}

export default burger;
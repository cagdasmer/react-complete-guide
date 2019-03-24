import React from 'react';
import classes from './BuildControls.module.css';
import btnClasses from '../UI/Button/Button.module.css';

import Button from '../UI/Button/Button';


const buildControls = props => {
    let controls = [];

    props.ingredients.map(ingredient => {
        controls.push(
            <div key={ingredient.name}>
                <div className={classes.Control}>
                    {ingredient.name}: {' '}
                    <Button onClick={props.onClickIngredientControl.bind(this, {type: "add", ingredientName:ingredient.name})}>+</Button>
                    <Button disabled={ingredient.count === 0} onClick={props.onClickIngredientControl.bind(this, {type: "remove", ingredientName:ingredient.name})}>-</Button><hr/>
                </div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <h2 className={classes.Center}>{props.price}$</h2>
            <div className={classes.BuildControls}>
                {controls}
                <button disabled={!props.purchasable} className={btnClasses.orderBtn} onClick={props.onClickOrderButton}>ORDER NOW</button>
            </div>
        </React.Fragment>
    );
}

export default buildControls;
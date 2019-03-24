import React from 'react';
import classes from './Ingredient.module.css';

const ingredient = props => {

    switch(props.name){
        case "BreadTop":
            return(
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>);
        case "BreadBottom":
            return(<div className={classes.BreadBottom}></div>);
        case "Bread":
            return(<div className={classes.Bread}></div>);
        case "Meat":
            return(<div className={classes.Meat}></div>);
        case "Bacon":
            return(<div className={classes.Bacon}></div>);
        case "Cheese":
            return(<div className={classes.Cheese}></div>);
        case "Salad":
            return(<div className={classes.Salad}></div>);
        default:
            return null;
    }
}

export default ingredient;
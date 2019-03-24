import React from 'react';

const summary = props => {
    
    const content = []

    props.ingredients.forEach(ingredient => {
        if(ingredient.count > 0){
            content.push(
                <li key={ingredient.name}><span>{ingredient.name}</span>: {ingredient.count} {'  '} ({ingredient.count * ingredient.price}$)</li>
            );
        }
    })
    
    /* <div style={{display:"inline-block",padding:"2px"}}>
                    <p>{ingredient.name}</p>
                    <p>Quantity: {ingredient.count}</p>
                    <p>Price: {ingredient.count * ingredient.price}</p>
                </div> */

    return (
        <React.Fragment>
        <h3>Order Summary</h3>
        <p> Your burger has the following ingredients: </p>
        <ul>
            <li key="BurgerBase"><span>Burger Base</span> {' '} (1.90$)</li>
            {content}
        </ul>
        <p>Total Price: {props.price}$</p>
        <p> Continue to Checkout?</p>
        </React.Fragment>
    );
}

export default summary;
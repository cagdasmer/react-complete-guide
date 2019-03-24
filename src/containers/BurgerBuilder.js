import React, { useState } from 'react';
import Burger from '../components/Burger/Burger';
import Modal from '../components/UI/Modal/Modal';
import BuildControls from '../components/controls/BuildControls';
import Summary from '../components/Summary/Summary';
import UIContext from '../uiContext';


const burgerBuilder = props => {

    const [ingredients, setIngredients] = useState([
        {name: "Meat", price: 6, count:0},
        {name: "Bacon", price: 4, count:0},
        {name: "Cheese", price: 3, count:0},
        {name: "Salad", price: 2, count:0},
        {name: "Bread", price: 1.5, count:0}
    ]);

    const [chosenIngredients, setChosenIngredients] = useState([]);
    const [totalPrice, setTotalPrice] = useState("1.90");
    const [purchasable, setPurchasable] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const onClickIngredientControl = (event) => {
        let newIngredients = [...ingredients];
        let chosen = [...chosenIngredients];
        let newPrice = 0;

        for(let ingredient of newIngredients){
            if(ingredient.name === event.ingredientName){

                if(event.type === "add"){
                    ingredient.count++;
                    newPrice = parseFloat(totalPrice) + ingredient.price;
                    chosen.push(ingredient.name);

                    setChosenIngredients(chosen);
                    setIngredients(newIngredients);
                    setTotalPrice(newPrice.toFixed(2));
                    setPurchasable(newPrice>2);
                }

                else if(event.type === "remove" && ingredient.count > 0){
                    chosen.reverse();
                    ingredient.count--;
                    newPrice = parseFloat(totalPrice) - ingredient.price;
                    
                    let index = chosen.indexOf(ingredient.name);
                    if (index > -1) {
                        chosen.splice(index, 1);
                    }

                    setChosenIngredients(chosen.reverse());
                    setIngredients(newIngredients);
                    setTotalPrice(newPrice.toFixed(2));
                    setPurchasable(newPrice>2);
                }
                break;
            }
        };
    };

    const onIssueOrder = event => {
        setShowSummary(true);
    };

    const onCancelOrder = event => {
        setShowSummary(false);
    }

    const onContinuePurchase = event => {
        alert("Thank you for your order!");
        setShowSummary(false);
    }

    return (
        <UIContext.Provider value={{cancelOrder: onCancelOrder, giveOrder: onContinuePurchase}}>
         <React.Fragment>
             <Modal showSummary={showSummary}>
                <Summary ingredients={ingredients} price={totalPrice} />
             </Modal>
            <Burger ingredients={chosenIngredients}/>
            <BuildControls
                price={totalPrice}
                purchasable={purchasable}
                onClickIngredientControl={onClickIngredientControl}
                onClickOrderButton={onIssueOrder}
                ingredients={ingredients}/>
        </React.Fragment>
        </UIContext.Provider>
    );
}

export default burgerBuilder;
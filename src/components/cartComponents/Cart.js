import React from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../Context'
import CartList from './CartLists';
import CartTotals from './CartTotals';

function Cart(props){
    
    return(
        <section>
            <ProductConsumer>
                {value=>{
                    const {cart}= value
                    if(cart.length>0){
                        return(
                            <React.Fragment>
                                <Title name="your" title="cart"/>
                                <CartColumns/> 
                                <CartList value={value}/>
                                <CartTotals value={value} history={props.history}/>
                            </React.Fragment>
                            );
                    }else{
                        return(
                            <EmptyCart/> 
                        );
                    }
                }}
            </ProductConsumer>
        </section>
    );
}

export default Cart;

import React from 'react';
import {ProductConsumer} from '../Context';
import {Link} from 'react-router-dom';
import{Button} from './Button';
function Details(){
    
    return(
        <ProductConsumer>
            {value=>{
                const {id, company,img, info, price, title, inCart}=value.productDetails;
                return(
                    <div className="container py-5">
                        {/*title */}
                        <div className="row">
                            <div className="col-10 mx-auto text-center text-splanted tex-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        </div>
                        {/*endtitle */}
                        {/*product info */}
                        <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <img src={img} className="img-fluid" alt="product"/>
                            </div>
                            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                <h2>model: {title}</h2>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                made by <span className="text-uppercase">{company}</span>
                                </h4>
                                <h4 className="text-blue"><strong>price: <span>${price}</span></strong></h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0"> 
                                some info about product:
                                </p>
                                <p className="text-muted lead">{info}</p>
                                {/*Buttons */}
                                <div>
                                    <Link to="/">
                                        <Button>
                                            back to products
                                        </Button>
                                    </Link>
                                    <Button cart disabled ={inCart?true:false} onClick={()=>{
                                        value.addToCart(id);
                                        value.openModal(id)
                                    }}>
                                        {inCart?"in cart": "add to cart"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </ProductConsumer>
    );

}
export default Details;
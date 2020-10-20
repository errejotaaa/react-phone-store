import React,{useState,useEffect} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext= React.createContext();

function ProductProvider(props) {

    const[products, setProducts]= useState([]);
    const[productDetails, setProductDetails]= useState(detailProduct);
    const[cart,setCart]= useState([]);
    const[modalOpen, setModalOpen]=useState(false);
    const[modalProduct,setModalProduct]= useState(detailProduct);
    const[cartSubtotal,setCartSubtotal]= useState(0);
    const[cartTax,setCartTax]= useState(0);
    const[cartTotal,setCartTotal]= useState(0);


    const deepCopyProducts =()=>{
        let temp=[];
        storeProducts.forEach(item=>{
        const singleItem={...item};
        temp=[...temp, singleItem];
        });
        setProducts(temp);
    }
    useEffect(() => {
        deepCopyProducts();   
    },[])

    const getItem=(id)=>{
        const product= products.find(item=> item.id===id);
        return product;
    }

    const handleDetail=(id)=>{
        const product= getItem(id);
        setProductDetails(product);
    }

    const addToCart= (id)=>{

       let tempProducts= [...products];
       const index= tempProducts.indexOf(getItem(id));
       const product= tempProducts[index]
       product.inCart=true
       product.count=1;
       const price= product.price;
       product.total=price;

       setProducts(tempProducts);
       setCart([...cart,product]);    
       
    }

    useEffect(() => {
        addTotals();
    })

    const openModal= (id)=>{

        const product= getItem(id);
        setModalProduct(product);
        setModalOpen(true);

    }

    const closeModal =()=>{
        setModalOpen(false);
    }

    const increment=(id)=>{
        let tempCart= [...cart];
        const selectedProduct= tempCart.find(item=>item.id===id);
        const index= tempCart.indexOf(selectedProduct);
        const product= tempCart[index];

        product.count+=1;
        product.total=product.price*product.count;

        setCart([...tempCart])

    }

    const decrement=(id)=>{
        let tempCart= [...cart];
        const selectedProduct= tempCart.find(item=>item.id===id);
        const index= tempCart.indexOf(selectedProduct);
        const product= tempCart[index];

        product.count-=1;

        if(product.count===0){
            removeItem(id);
        }else{
            product.total=product.price*product.count;
            setCart([...tempCart])
        }
        
    }

    const removeItem=(id)=>{
       let tempProducts=[...products];
       let tempCart= [...cart];
       tempCart= tempCart.filter(item=>item.id!==id);
       const index= tempProducts.indexOf(getItem(id));
       let removeProduct= tempProducts[index];
       removeProduct.inCart=false;
       removeProduct.count=0;
       removeProduct.total=0;
       
       setCart([...tempCart]);
       setProducts([...tempProducts])
    }

    const clearCart=()=>{
        deepCopyProducts();
        setCart([]);
    }
    
    

    const addTotals=()=>{
        let subtotal=0;
        cart.map(item=>(subtotal+=item.total
        ));
        const tempTax= subtotal*0.1;
        const tax=parseFloat(tempTax.toFixed(2));
        const total= subtotal+tax;
        setCartSubtotal(subtotal);
        setCartTax(tax);
        setCartTotal(total);
    }

       return (
        <ProductContext.Provider 
        value={{
            products,
            productDetails,
            modalOpen, 
            modalProduct,
            cart,
            cartSubtotal,
            cartTax,
            cartTotal,
            handleDetail,
            addToCart, 
            openModal,
            closeModal,
            increment,
            decrement,
            removeItem,
            clearCart
            }}>
            {props.children}
        </ProductContext.Provider>
        ) 
}

const ProductConsumer= ProductContext.Consumer;

export {ProductProvider, ProductConsumer}
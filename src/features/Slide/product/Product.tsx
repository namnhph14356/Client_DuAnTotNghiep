import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getProductList } from './ProductSlide';

const Product = () => {
    const products = useSelector<any,any>(data => data.product.value);
    const dispath = useDispatch();
    console.log(products);
    
    useEffect(() => {
        dispath(getProductList())
    },[]);
  return (
    <div>Product:
        {products?.map((item:any) => item.name)}
        <button className='border' onClick={() => dispath(addProduct({id:8, name:"product câssasas"}))}>Add product</button>
    </div>
  )
}

export default Product
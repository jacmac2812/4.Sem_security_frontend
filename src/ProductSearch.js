import facade from "./apiFacade";
import React, { useState } from "react";


const Product = () => {
    const [productData, setProductData] = useState("");

    const [productSearch, setProductSearch] = useState("");

    function filterPriceLow(data) {
        const filterData = [...data].sort(function (a, b) {
            return a.salePrice - b.salePrice;
        })
        setProductData(filterData)
    }
    function filterPriceHigh(data) {
        const filterData = [...data].sort(function (a, b) {
            return b.salePrice - a.salePrice;
        })
        setProductData(filterData)
    }
    const handleFind = event => {
        event.preventDefault();
        const value = event.target.value;
        setProductSearch(value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        facade.fetchProductData(productSearch).then((data) => setProductData(data.products));
    }
    function handleAddToFavorit(data) {
        facade.fetchAddFavorit(data);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleFind} value={productSearch} placeholder="Product"></input>
                <button type="submit">Search</button>
            </form>

            {productData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceLow(productData)}>Sort by sale price lowest</button>}
            {productData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceHigh(productData)}>Sort by sale price highest</button>}

            {
                productData && productData.map((product, i) => {
                    return (
                        <div key={i}>
                            <table>
                                <tr>
                                    <th rowspan="8"><img src={product.image}></img></th>
                                    <td><b>{product.name}</b></td>
                                </tr>
                                <tr>
                                    <td>ID: {product.sku}</td>
                                </tr>
                                <tr>
                                    <td>{product.type}</td>
                                </tr>
                                <tr>
                                    <td>${product.regularPrice}</td>
                                </tr>
                                <tr>
                                    <td>${product.salePrice}</td>
                                </tr>
                                <tr>
                                    <td><a href={product.url}><b>Buy Here</b></a></td>
                                </tr>
                                <tr>
                                    <td>{product.onSale}</td>
                                </tr>
                                <tr>
                                    <td>{productData && <button className="button buttonCategory buttonSort" onClick={() => handleAddToFavorit(product)}>Add to favorites</button>}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Product;

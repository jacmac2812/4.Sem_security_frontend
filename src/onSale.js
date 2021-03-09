import facade from "./apiFacade";
import React, { useState, useEffect } from "react";
import "./style.css";

const OnSale = () => {
    const [onSaleData, setOnSaleData] = useState("");

    useEffect(() => {
        facade.fetchProductsOnSale().then((data) => setOnSaleData(data.products));
    }, []);

    function filterPriceLow(data) {
        const filterData = [...data].sort(function (a, b) {
            return a.salePrice - b.salePrice;
        })
        setOnSaleData(filterData)
    }
    function filterPriceHigh(data) {
        const filterData = [...data].sort(function (a, b) {
            return b.salePrice - a.salePrice;
        })
        setOnSaleData(filterData)
    }

    function savings(regPrice, salePrice) {
        const saved = regPrice - salePrice;
        const rounded = saved.toFixed(2);
        return rounded;
    }
    function handleAddToFavorit(data) {
        facade.fetchAddFavorit(data);
    }
    return (
        <div>
            {onSaleData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceLow(onSaleData)}>Sort by sale price lowest</button>}
            {onSaleData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceHigh(onSaleData)}>Sort by sale price highest</button>}
            {
                onSaleData && onSaleData.map((product, i) => {
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
                                    <td>Saved: ${savings(product.regularPrice, product.salePrice)}</td>
                                </tr>
                                <tr>
                                    <td><a href={product.url}><b>Buy Here</b></a></td>
                                </tr>
                                <tr>
                                    <td>{onSaleData && <button className="button buttonCategory buttonSort" onClick={() => handleAddToFavorit(product)}>Add to favorites</button>}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default OnSale;
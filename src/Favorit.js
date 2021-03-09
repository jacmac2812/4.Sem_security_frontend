import facade from "./apiFacade";
import React, { useState, useEffect } from "react";
import "./style.css";

const Favorit = () => {
    const [favoritData, setFavoritData] = useState("");

    useEffect(() => {
        facade.fetchGetallFavorites().then((data) => setFavoritData(data.all));
    }, []);

    const handleDeleteFavorit = (sku) => {
        facade.fetchDeleteFavorit(sku).then(facade.fetchGetallFavorites().then((data) => setFavoritData(data.all)));
    }
    
    function filterPriceLow(data){
        const filterData = [...data].sort(function(a,b){
            return a.salePrice - b.salePrice;
        })
        setFavoritData(filterData)
    }

    function filterPriceHigh(data){
        const filterData = [...data].sort(function(a,b){
            return b.salePrice - a.salePrice;
        })
        setFavoritData(filterData)
    }

    function filterOnSale(data) {
        const filterData = [...data].filter(product => product.onSale === 'true');
        setFavoritData(filterData)
    }

    return (
        <div>

        <br></br>
        {favoritData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceLow(favoritData)}>Sort by sale price lowest</button>}
        {favoritData && <button className="button buttonCategory buttonSort" onClick={() => filterPriceHigh(favoritData)}>Sort by sale price highest</button>}
        {favoritData && <button className="button buttonCategory buttonSort" onClick={() => filterOnSale(favoritData)}>Get products on sale</button>}

        {
            favoritData && favoritData.map((favorit, i) => {
                return (
                    <div key={i}>
                            <table>
                                <tr>
                                    <th rowspan="8"><img src={favorit.image}></img></th>
                                    <td><b>{favorit.name}</b></td>
                                </tr>
                                <tr>
                                <td>ID: {favorit.sku}</td>
                                </tr>
                                <tr>
                                    <td>{favorit.type}</td>
                                </tr>
                                <tr>
                                    <td>${favorit.regularPrice}</td>
                                </tr>
                                <tr>
                                    <td>${favorit.salePrice}</td>
                                </tr>
                                <tr>
                                    <td><a href={favorit.url}><b>Buy Here</b></a></td>
                                </tr>
                                <tr>
                                    <td>{favorit.onSale}</td>
                                </tr>
                                <tr><td>{favoritData && <button className="button buttonCategory buttonSort" onClick={() => handleDeleteFavorit(favorit.sku)}>DELETE</button>}</td></tr>
                            </table>
                    </div>
                );
            })
        }
    </div>
    );
};

export default Favorit;
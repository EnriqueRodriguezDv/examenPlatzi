import React, { useContext } from 'react';

import Map from "../components/Map"

import useGoogleAddress from "../hooks/useGoogleAddress"
import AppContext from "../context/AppContext"
import "../styles/components/Success.css"

const Success = () => {
    const { state } = useContext(AppContext)
    const { buyer } = state
    const location = useGoogleAddress(buyer[0].address)

    return (
        <div className="Sucess">
            <div className="Success-content">
                <h2>{buyer[0].name}, Gracias por tu compra</h2>
                <span>El pedido llegara en 3 dias a tu direccion:</span>
                <div className="Success-map">
                    <Map data={location} />
                </div>
            </div>
        </div>
    );
};

export default Success;
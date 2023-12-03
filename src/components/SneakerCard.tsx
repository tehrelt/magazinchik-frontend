import * as React from 'react';
import {ISneaker} from "../types/Types";

type Props = {
    sneaker: ISneaker
};
export const SneakerCard = ({ sneaker }: Props) => {
    return <>
        <div className="sneaker-card">
            <h2>Name: {sneaker.name}</h2>
            <span>brand: {sneaker.brand}</span> <br/>
            <span>cloth: {sneaker.cloth}</span> <br/>
            <span>price: {sneaker.price} rub.</span>
        </div>

    </>;
};
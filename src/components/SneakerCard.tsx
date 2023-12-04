import * as React from 'react';
import {ISneaker} from "../types/Types";
import {Button} from "react-bootstrap";
import {api} from "../api/api";

type Props = {
    sneaker: ISneaker
};
export const SneakerCard = ({ sneaker }: Props) => {

    const remove = async (id: number) => {
       await api.delete(`sneakers/${id}`)
    }

    return <>
        <div className="sneaker-card">
            <h2>Name: {sneaker.name}</h2>
            <span>brand: {sneaker.brand}</span> <br/>
            <span>cloth: {sneaker.cloth}</span> <br/>
            <span>price: {sneaker.price} rub.</span> <br/>
            <Button onClick={() => remove(sneaker.id)} variant={'danger'}>Delete</Button>
        </div>

    </>;
};
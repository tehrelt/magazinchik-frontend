import * as React from 'react';
import {ISneaker} from "../types/Types";
import {SneakerCard} from "./SneakerCard";

type Props = {
    sneakers: ISneaker[]
};
export const SneakersList = ({ sneakers }: Props) => {
    return (
        <div className="sneaker-list">
            {sneakers.map((sneaker: ISneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker}/>
            ))}
        </div>
    );
};
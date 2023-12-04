import * as React from 'react';
import {ISneaker} from "../types/Types";
import {SneakerCard} from "./SneakerCard";
import {Container} from "react-bootstrap";

type Props = {
    sneakers: ISneaker[]
};
export const SneakersList = ({ sneakers }: Props) => {
    return (
        <Container>
            {sneakers.map((sneaker: ISneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker}/>
            ))}
        </Container>
    );
};
import * as React from 'react';
import {ISneaker} from "../types/Types";
import {SneakerCard} from "./SneakerCard";
import {Button, Container} from "react-bootstrap";
import {api} from "../api/api";

type Props = {
    sneakers: ISneaker[]

    onRemove: (id: number) => void
};
export const SneakersList = ({ sneakers, onRemove }: Props) => {

    return (
        <Container>
            {sneakers.map((sneaker: ISneaker) => (
                <>
                    <SneakerCard key={sneaker.id} sneaker={sneaker}/>
                    <Button onClick={() => onRemove(sneaker.id)} variant={'danger'}>Delete</Button>
                </>
            ))}
        </Container>
    );
};
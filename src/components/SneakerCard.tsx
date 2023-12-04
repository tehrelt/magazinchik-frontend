import * as React from 'react';
import {ISneaker, ISneakersPhoto, ISneakersPhotos} from "../types/Types";
import {Button, Image} from "react-bootstrap";
import {api} from "../api/api";
import {useEffect, useState} from "react";
import * as repl from "repl";

type Props = {
    sneaker: ISneaker
};
export const SneakerCard = ({ sneaker }: Props) => {

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const response: ISneakersPhotos = await api.get(`sneakers/${sneaker.id}/photos`);

            if(!response.photosIds) {
                return;
            }

            const imageResponse: ISneakersPhoto = await api.get(`sneakers/${sneaker.id}/photos/${response.photosIds[0]}`);

            setImage(imageResponse.photoUrl);
        }
        fetchData()
    }, [])
    
    const remove = async (id: number) => {
       await api.delete(`sneakers/${id}`)
    }

    return <>
        <div className="sneaker-card">
            <h2>Name: {sneaker.name}</h2>
            <span>brand: {sneaker.brand}</span> <br/>
            <span>cloth: {sneaker.cloth}</span> <br/>
            <span>price: {sneaker.price} rub.</span> <br/>
            {image != "" && <img src={image} width={150} height={150}/>}
            <Button onClick={() => remove(sneaker.id)} variant={'danger'}>Delete</Button>
        </div>
    </>;
};
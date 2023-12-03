import * as React from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {IBrand, ICloth, IManufacturer, ISneakerSize, IZipType} from "../../types/Types";
import {api} from "../../configs/config";
import {Select} from "./Select";
import {ISneakerInput} from "../../types/InputDto";

type Props = {
    onCreate: () => void
};

export const CreateSneakerForm = ({onCreate}: Props) => {


    const [name, setName] = useState<string>("");
    const [manufacturerId, setManufacturerId] = useState<number>(0)
    const [brandId, setBrandId] = useState<number>(0)
    const [zipTypeId, setZipTypeId] = useState<number>(0)
    const [clothId, setClothId] = useState<number>(0)
    const [sizeId, setSizeId] = useState<number>(0)
    const [releaseDate, setReleaseDate] = useState<Date>(new Date())
    const [weight, setWeight] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const handleSubmit = async (event: any) => {
        event.preventDefault();


        if(brandId == 0 || zipTypeId == 0 || clothId == 0 || sizeId == 0) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAA")
            return;
        }

        const dto: ISneakerInput = {
            "name": name,
            "weight": weight,
            "brandId": brandId,
            "clothId": clothId,
            "sneakerSizeId": sizeId,
            "zipTypeId": zipTypeId,
            "releaseDate": releaseDate.toISOString(),
            "price": price
        }

        await fetch(`${api}/sneakers/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        })

        onCreate()

    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Label>Name</Form.Label>
            <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Form.Label>Manufacturer: </Form.Label>
            <Select
                required={true}
                url={`${api}/manufacturers`}
                functor={(item) => item.name}
                callback={(id) => setManufacturerId(id)}
            />

            <Form.Label> Brand: </Form.Label>
            <Select required={true}
                url={manufacturerId != 0 ? `${api}/brands/?manufacturer_id=${manufacturerId}` : undefined}
                functor={(item: IBrand) => item.name}
                callback={id => setBrandId(id)}
                errorMessage={manufacturerId != 0 ? "Choose a manufacturer first" : "No data"}
            />

            <Form.Label>Weight: </Form.Label>
            <Form.Control
                required
                min={0}
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
            />

            <Form.Label>ZipType: </Form.Label>
            <Select required={true}
                url={`${api}/zips`}
                functor={(item) => item.name}
                callback={(id) => setZipTypeId(id)}
            />
            <Form.Label>Cloth: </Form.Label>
            <Select required={true}
                url={`${api}/clothes`}
                functor={(item) => item.name}
                callback={(id) => setClothId(id)}
            />
            <Form.Label>Size: </Form.Label>
            <Select required={true}
                url={`${api}/sneaker_sizes`}
                functor={(item: ISneakerSize) => `${item.euSize} | ${item.usSize}`}
                callback={(id) => setSizeId(id)}
            />

            <Form.Label>Release date: </Form.Label>
            <Form.Control
                type="date"
                onChange={(e) => setReleaseDate(new Date(e.target.value))}
            />

            <Form.Label>Price:</Form.Label>
            <Form.Control
                required
                min={0}
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

           <Button type="submit">Create</Button>
        </Form>
    );
};
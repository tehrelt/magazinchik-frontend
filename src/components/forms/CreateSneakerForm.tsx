import * as React from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {IBrand, ICloth, IManufacturer, ISneakerSize, IZipType} from "../../types/Types";
import {Select} from "./Select";
import {ISneakerInput} from "../../types/InputDto";
import {api} from "../../api/api";

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

        await api.post<ISneakerInput>('sneakers', dto);
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
                url={'manufacturers'}
                functor={(item) => item.name}
                onChange={(id) => setManufacturerId(id)}
            />

            <Form.Label> Brand: </Form.Label>
            <Select required={true}
                url={manufacturerId != 0 ? `brands/?manufacturer_id=${manufacturerId}` : undefined}
                functor={(item: IBrand) => item.name}
                onChange={id => setBrandId(id)}
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
                url={`zips`}
                functor={(item) => item.name}
                onChange={(id) => setZipTypeId(id)}
            />
            <Form.Label>Cloth: </Form.Label>
            <Select required={true}
                url={`clothes`}
                functor={(item) => item.name}
                onChange={(id) => setClothId(id)}
            />
            <Form.Label>Size: </Form.Label>
            <Select required={true}
                url={`sneaker_sizes`}
                functor={(item: ISneakerSize) => `${item.euSize} | ${item.usSize}`}
                onChange={(id) => setSizeId(id)}
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
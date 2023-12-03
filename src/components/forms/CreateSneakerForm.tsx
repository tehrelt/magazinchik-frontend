import * as React from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {IBrand, IManufacturer} from "../../types/Types";

type Props = {

};

export const CreateSneakerForm = (props: Props) => {

    const [manufacturer, setManufacturer] = useState<IManufacturer[]>([])
    const [brands, setBrands] = useState<IBrand[]>([])
    const [zipType, setZipType] = useState();

    const handleSubmit = (event: any) => {
        event.preventDefault();

    }

    return (
        <Form onSubmit={handleSubmit}>

           <Button type="submit">Create</Button>
        </Form>
    );
};
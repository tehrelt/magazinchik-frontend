import * as React from 'react';
import {ChangeEvent, FormEventHandler, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {ISneaker} from "../../types/Types";
import {Select} from "./Select";
import {api} from "../../api/api";

type Props = {

};
export const AddPhotoToSneaker = (props: Props) => {

    const [selected, setSelected] = useState<number>();
    const [file, setFile] = useState<File>()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(!selected || !file) {
            return;
        }

        const formData = new FormData();

        formData.append('file', file);

        await api.post(`sneakers/${selected}/photos/`, formData);
    }

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Select
                url={`sneakers`}
                functor={(item: ISneaker) => item.name}
                onChange={(id: number) => setSelected(id)}/>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a image</Form.Label>
                <Form.Control required id="file" type="file" onChange={handleChangeFile}/>
            </Form.Group>

            <Button type="submit">Upload</Button>
        </Form>
    );
};
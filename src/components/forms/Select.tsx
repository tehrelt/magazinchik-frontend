// @flow
import * as React from 'react';
import {ChangeEventHandler, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {isDisabled} from "@testing-library/user-event/dist/utils";

type Props = {
    url?: string
    errorMessage?: string
    disabled?: boolean
    required?: boolean
    canFetch?: boolean

    functor: (item: any) => string;
    callback: (id: number) => void
};

type Item = {
    id: number
}
export const Select = ({url, functor, disabled, required, errorMessage, callback}: Props) => {

    const [data, setData] = useState<Item[]>([]);
    const [selected, setSelected] = useState<number>();



    useEffect(() => {
        setData([]);
        setSelected(0);

        if(!url) {
            return;
        }

        const fetchData = async () => {
            const resp = await fetch(url);

            if(resp.status == 200) {
                const data = await resp.json();

                setData(data);
            } else {
                setData([]);
            }
        }
        fetchData()
    }, [url])

    const handleChange = (value: string): void => {
        if(Number.isNaN(value)) {
            return;
        }
        console.log(value);

        setSelected(Number(value))
        callback(Number(value));
    }

    return (
        <Form.Select
            required={required}
            disabled={data.length == 0 || disabled}
            value={selected}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value={0}>
                {data.length != 0 ? "Choose a " : errorMessage != null ? errorMessage : "no data provided"}
            </option>
            {data.map((item) => (
                <option value={item.id}> {functor(item)} </option>
            ))}
        </Form.Select>
    );
};
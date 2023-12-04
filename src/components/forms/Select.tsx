import * as React from 'react';
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {api} from "../../api/api";

type Props = {
    url?: string
    errorMessage?: string
    disabled?: boolean
    required?: boolean
    canFetch?: boolean

    functor: (item: any) => string;
    onChange: (id: number) => void
};

type Item = {
    id: number
}
export const Select = ({url, functor, disabled, required, errorMessage, onChange}: Props) => {

    const [data, setData] = useState<Item[]>([]);
    const [selected, setSelected] = useState<number>();



    useEffect(() => {
        setData([]);
        setSelected(0);

        if(!url) {
            return;
        }

        const fetchData = async () => {

            try {
                const data =  await api.get(url)
                setData(data);
            } catch (e) {
                console.log(`Error occured: ${e}`)
                setData([])
            }

        }
        fetchData()
    }, [url])

    const handleChange = (value: string): void => {
        if(Number.isNaN(value)) {
            return;
        }

        setSelected(Number(value))
        onChange(Number(value));
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
import React, {useEffect, useState} from 'react';
import {ISneaker} from "./types/Types";
import {SneakersList} from "./components/SneakersList";
import {Container, Form} from "react-bootstrap";
import {CreateSneakerForm} from "./components/forms/CreateSneakerForm";
import {api} from "./configs/config";

function App() {

    const [sneakers, setSneakers] = useState<ISneaker[]>([]);

    const fetchData = () => {
        fetch(`${api}/sneakers`)
            .then((response) => response.json())
            .then((data) => setSneakers(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            <h1>Magazinchik</h1>
            <Container>
                <h2>Create new Sneaker</h2>
                <CreateSneakerForm onCreate={fetchData}/>
            </Container>

            <SneakersList sneakers={sneakers}/>
        </div>
  );
}

export default App;

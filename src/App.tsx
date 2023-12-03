import React, {useEffect, useState} from 'react';
import {ISneaker} from "./types/Types";
import {SneakersList} from "./components/SneakersList";
import {Container, Form} from "react-bootstrap";
import {CreateSneakerForm} from "./components/forms/CreateSneakerForm";

function App() {

    const [sneakers, setSneakers] = useState<ISneaker[]>([]);

    useEffect(() => {
        fetch("http://localhost:5178/api/v1/sneakers")
            .then((response) => response.json())
            .then((data) => setSneakers(data));

    }, [setSneakers])

    return (
        <div className="App">
            <h1>Magazinchik</h1>
            <Container>
                <h2>Create new Sneaker</h2>
                <CreateSneakerForm/>
            </Container>

            <SneakersList sneakers={sneakers}/>
        </div>
  );
}

export default App;

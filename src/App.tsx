import React, {useEffect, useState} from 'react';
import {ISneaker} from "./types/Types";
import {SneakersList} from "./components/SneakersList";
import {Container, Form} from "react-bootstrap";
import {CreateSneakerForm} from "./components/forms/CreateSneakerForm";
import {AddPhotoToSneaker} from "./components/forms/AddPhotoToSneaker";
import {api} from "./api/api";

function App() {

    const [sneakers, setSneakers] = useState<ISneaker[]>([]);

    const fetchData = async () => {
       setSneakers(await api.get('sneakers'))
    }


    useEffect(() => {
        fetchData().then(r => console.log("sneakers loaded"))
    }, [])

    const onRemove = async (id: number) => {
        await api.delete(`sneakers/${id}`);
        setSneakers(sneakers.filter(s => s.id != id))
    }

    return (
        <div className="App">
            <h1>Magazinchik</h1>
            <Container>
                <h2>Create new Sneaker</h2>
                <CreateSneakerForm onCreate={fetchData}/>

                <h2>Add a photo to exists sneaker</h2>
                <AddPhotoToSneaker/>
            </Container>

            <SneakersList onRemove={onRemove} sneakers={sneakers}/>
        </div>
  );
}

export default App;

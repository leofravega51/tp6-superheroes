import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';


export default function Home() {

    const [heros, setHeros] = useState([]);
    const [heroId, setHeroId] = useState('');
    const history = useHistory();

    const getHeros = async () => {

        const response = await axios.get('http://localhost:5000/');
        console.log(response)
        setHeros(response.data)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Se eliminará este personaje de forma permanente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
          }).then((result) => {
            if (result.value) {
                axios.get(`http://localhost:5000/superhero/delete/${id}`);
                Swal.fire(
                    'Excelente!',
                    'Personaje eliminado con éxito!',
                    'success'
                );
                window.location.reload(true);
            }
          })
    }

    const handleInformation = (id) => {
        setHeroId(id);
        console.log(id)
        localStorage.setItem("id", id)
        history.push('/character');
    }

    useEffect(() => {
        getHeros();
    }, []);


    return(
        <Fragment>
            <Navbar />
            <div className="container">
                <div className="row" id="heros-cards">
                {heros.map((h,i) => (
                    <div className="card" style={{width: "18rem", margin: "2% 3%", minHeight: "20rem"}} key={i}>
                        <img className="card-img-top" src={`/assets/img/${h.name}.png`} alt={h.name} style={{maxWidth: "18rem", maxHeight: "18rem"}}></img>
                        <div className="card-body">
                            <h5 className="card-title">{h.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{h.character}</h6>
                            <p className="card-text text-truncate">{h.biography}</p>
                            
                        </div>
                        <div className="card-footer" style={{backgroundColor: "white", border: "none"}}>
                            <a className="btn btn-primary" onClick={() => handleInformation(h['_id'])} style={{color: "white", marginLeft: "10%"}}>More info</a>
                            <a className="btn btn-danger" onClick={() => handleDelete(h['_id'])} style={{color: "white", marginLeft: "10%"}}>Delete</a>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </Fragment>

    );

}
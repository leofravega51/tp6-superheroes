import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useHistory } from 'react-router';



export default function Marvel() {

    const [marvelHeros, setMarvelHeros] = useState([]);
    const history = useHistory();

    const getHeros = async () => {

        const response = await axios.get('http://localhost:5000/marvel');
        setMarvelHeros(response.data)
    }

    const handleInformation = (i) => {
        localStorage.setItem("name", i);
        history.push(`/character`);
    }

    const handleDelete = () => {
        
    }

    useEffect(() => {
        getHeros();
    }, []);


    return(
        <Fragment>
            <Navbar />
            <div className="container">
                <div className="row" id="heros-cards">
                {marvelHeros.map((h,i) => (
                    <div className="card" style={{width: "18rem", margin: "2% 3%", minHeight: "20rem"}} key={i}>
                        <img className="card-img-top" src={`/assets/img/${h.name}.png`} alt={h.name} style={{maxWidth: "18rem", maxHeight: "18rem"}}></img>
                        <div className="card-body">
                            <h5 className="card-title">{h.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{h.character}</h6>
                            <p className="card-text text-truncate">{h.biography}</p>
                            <a className="btn btn-primary"  onClick={(e) => handleInformation(h.name)} style={{color: "white", marginLeft: "10%"}}>More info</a>
                            <a className="btn btn-danger" onClick={(e) => handleDelete(h.name)} style={{color: "white", marginLeft: "10%"}}>Delete</a>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </Fragment>

    );

}
import React, {useState, useEffect, Fragment} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));


export default function Character(heroName) {

    const [heroData, setHeroData] = useState([]);
    const [images, setImages] = useState([]);
    const [house, setHouse] = useState();
    const [disabled, setDisabled] = useState(true);
    const [hidden, setHidden] = useState(true);


    const classes = useStyles();

    const handleHouseChange = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();        
    }

    const handleModify = (bool) => {
        setDisabled(bool);
        setHidden(bool);
    }

    const handleApply = (bool) => {
        setDisabled(bool);
        setHidden(bool);
        const id = localStorage.getItem("id");
        let data = {
            biography: heroData.biography,
            name: heroData.name,
            character: heroData.character,
            year: heroData.year,
            house: heroData.house,
            images: images,
            equipamiento: heroData.equipment
        }
        
        axios.post(`http://localhost:5000/superhero/modify`, data)
        .then((res) => {
            console.log(res.data);
            Swal.fire(
                'Excelente!',
                'Heroe modificado con éxito!',
                'success'
              )
        })

    }
    //MODIFICAR UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe

    const handleCancel = (bool) => {
        setDisabled(bool);
        setHidden(bool);
    }

    const getHeroData = async () => {

        const id = localStorage.getItem("id")
        const response = await axios.get(`http://localhost:5000/search/${id}`);
        const data = response.data[0];
        console.log(data);
        setHeroData(data);
        setImages(data.images);
    }

    useEffect(() => {
        console.log(heroName);
        getHeroData();
    }, [])

    return(
        <Fragment>
            <Navbar />
            <div className="container" style={{marginTop: "5%",  borderRadius: "5px", backgroundColor: "rgba(255,255,255,0.5)", paddingRight: "3px"}}>
                <div className="row pr-3">
                    <div className="col-md-6 mt-5">
                        <Carousel>
                        {images.map((hi,i) => (
                            <Carousel.Item key={i}>
                                <img
                                className="d-block w-100"
                                src={`/assets/img/${hi}`}
                                alt={hi['images']}
                                style={{maxWidth: "600px", maxHeight: "600px"}}
                            />
                            </Carousel.Item>
                        ))}
                        </Carousel>
                    </div>
                    <div className="col-md-6 mt-5 pt-3">
                        <div className={classes.root}>
                            <Form style={{width: "500px"}} onSubmit={handleSubmit}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Name</b></Form.Label>
                                    <Form.Control type="text" name="name" defaultValue={heroData['name']} disabled={disabled} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label><b>Character</b></Form.Label>
                                    <Form.Control type="text" name="character" defaultValue={heroData['character']} disabled={disabled} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput3" hidden={hidden}>
                                    <Form.Label><b>Add image</b></Form.Label>
                                    <Form.Control type="text" name="image"/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label><b>Biography</b></Form.Label>
                                    <Form.Control as="textarea" rows="3" defaultValue={heroData['biography']} disabled={disabled} style={{height: "150px", minHeight: "150px", maxHeight: "150px"}}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput4">
                                    <Form.Label><b>Year</b></Form.Label>
                                    <Form.Control type="text" name="name" defaultValue={heroData['year']} disabled={disabled} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlImage1" hidden={!hidden}>
                                    <Form.Label><b>House</b></Form.Label><br/>
                                    <img src={`/assets/img/${heroData['house']}.png`} alt={heroData['house']} style={{maxWidth: "150px", maxHeight: "50px"}}></img>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1" hidden={hidden}>
                                    <Form.Label><b>House</b></Form.Label>
                                    <Form.Control as="select" onChange={() => handleHouseChange(event.target.value)}>
                                        <option value="default">Select house</option>
                                        <option value="MARVEL">MARVEL</option>
                                        <option value="DC">DC</option>
                                    </Form.Control>
                                </Form.Group>

                                

                                <Form.Group controlId="exampleForm.ControlButton2">
                                    <button className="btn btn-primary mb-2 mt-2" type="submit" hidden={hidden} onClick={() => handleApply(true)}>Apply</button>
                                    <button className="btn btn-danger mb-2 mt-2 ml-2" hidden={hidden} onClick={() => handleCancel(true)}>Cancel</button>  
                                </Form.Group>
                                
                            </Form>
                            <button className="btn btn-primary mb-2 mt-2" hidden={!hidden} onClick={() => handleModify(false)}>Modify</button>  
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
}
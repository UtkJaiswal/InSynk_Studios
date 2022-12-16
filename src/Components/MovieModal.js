import { Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


//link for the image from env file
const API_IMG = process.env.REACT_APP_API_IMG;

const MovieModal = ({ title, poster_path, vote_average, release_date, overview }) => {


    //to check whether or not to show the modal
    const [show, setShow] = useState(false);

    //if image exists for that movie fine else a default url needs to be given to show a defualt image
    const [imgurl, setImgurl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSdpOfQ69r4j_GBaK06LVCCWCz2_a6xDtb90ySZ6fHb54AyBY-skdl0ji3cULkUQmYx4&usqp=CAU")


    //function to manage and show the modal on clicking View More..
    const handleShow = () => setShow(true);

    //function to manage and hide the modal on closing the modal
    const handleClose = () => setShow(false);


    //useEffect to check whenever a url path is correct change it from default to that image path
    useEffect(() => {
        if (poster_path != null)
            setImgurl(API_IMG + poster_path)

    }, [poster_path])

    return (
        <div className="card text-center  mb-3">
            <div className="card-body">
                <img className="card-img-top" src={imgurl} alt={title} />
                <div className="card-body">
                    <button type="button" className="btn btn-dark" onClick={handleShow} >View More</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="card-img-top" style={{ width: '14rem', height: 'auto' }} src={API_IMG + poster_path} alt={title} />
                            <h3>{title}</h3>
                            <h4>IMDb: {vote_average}</h4>
                            <h5>Release Date: {release_date}</h5>
                            <br></br>
                            <h6>Overview</h6>
                            <p>{overview}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;
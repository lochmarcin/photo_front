import React from "react";
import "./style.css"
import { ReactComponent as Trash } from './../../svg/trash.svg';
import axios from "axios"

import { Form, Button, ProgressBar, Table, Row, Col, Card } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";



const AddFile = () => {
    const [file, setFiles] = React.useState([])
    const [selectedFiles, setSelectedFiles] = React.useState([])
    const [send, setSend] = React.useState(false);
    const [progress, setProgress] = React.useState(0)
    const [size, setSize] = React.useState(0)



    const sendFile = (e) => {
        e.preventDefault()

        console.log("File length: " + file.length)
        let sizz = 0
        for (let j = 0; j < file.length; j++) {
            sizz += file[j].size
        }
        setSize(sizz)

        console.log("total size: " + size)

        setSend(true)

        // var formData = new FormData();
        // // for (const key of Object.keys(selectedFiles)) {
        // //     formData.append('imgCollection', selectedFiles[key])
        // // }

        // if (selectedFiles.length != 0) {
        //     for (const single_file of selectedFiles) {
        //         formData.append('file', single_file)
        //     }
        // }
        // Update the formData object
        // formData.append(
        //     "apk",
        //     selectedFile,
        //     selectedFile.name
        // );
        // setSend(true)
        // const config = {
        //     onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        // }

        // console.log(file)
        // console.log(file.length)
        // console.log(file[1])

        for (let i = 0; i < file.length; i++) {
            console.log(file[i])

            const formData = new FormData();
            formData.append(
                "apk",
                file[i],
                file[i].name
            );
            axios.post('http://127.0.0.1:5000/save/sendFile', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {
                    // percent[i] = Math.round((100 * data.loaded) / data.total)

                    //Set the progress value to show the progress bar
                    setProgress(progress + data.loaded);
                    console.log(progress)
                }
            })
                .then(function (response) {
                    console.log("chyba poszło")
                    // setProgress(response.data.sendStatus)
                    // if (response.data.sendStatus)
                    //     setTimeout(reloadPage, 3000)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //     


        // axios.post('http://127.0.0.1:5000/save/sendFile', formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     }
        //     // onUploadProgress: (data) => {

        //     //     //Set the progress value to show the progress bar
        //     //     setProgress(Math.round((100 * data.loaded) / data.total));
        //     // },
        // })
        //     .then(function (response) {
        //         console.log("chyba poszło")
        //         // setProgress(response.data.sendStatus)
        //         // if (response.data.sendStatus)
        //         //     setTimeout(reloadPage, 3000)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    const handleImageChange = (e) => {
        setSize(0)
      
        setSend(false)
        setProgress(0)
        setSelectedFiles([])
        // console.log(e.target.files[])
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            // console.log("filesArray: ", filesArray);
            setFiles(e.target.files)

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo, id) => {
            return (
                <>
                    <Card id="card">
                        <Card.Header>
                            <Trash id='trashSvg' onClick={() => deletePhoto(id)} />
                        </Card.Header>
                        <Card.Img id="card_img" variant="top" src={photo} />
                    </Card>
                    {/* <img id="perwievImg" src={photo} alt="" />

                    {console.log("id: " + id + " typeof: " + typeof (id))}
                    {/* {console.log(id)} */}
                    {/* {send && <ProgressBar variant="info" now={size / filelength} label={`${"dupa"} %`} />} */}


                </>
            );

        });
    };

    const deletePhoto = (id) => {
        console.log("usuń: " + id)
        console.log(typeof (file))

    }

    // const perviewPhoto = (e) => {

    //     console.log(e.target.files);
    //     setFiles(URL.createObjectURL(e.target.files[0]));
    // }


    // const renderPhotos = (source) => {
    // 	console.log('source: ', source);
    // 	return source.map((photo) => {
    // 		return <img src={photo} alt="" key={photo} />;
    // 	});
    // };


    return (
        <div id="main">
            <div id="Addfile_Continer">
                <Form id="form" onSubmit={sendFile} >
                    <Form.Group
                        className="mb-3"
                    >
                        {/* <Row>
                            <Col> */}
                        <Form.Label>Wyszykaj folder</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Wpisz ID"
                        />
                        <br />
                        <Button variant="primary" type="submit">
                            Wyszukaj
                        </Button>
                        {/* </Col> */}

                    </Form.Group>
                </Form >
                <Form id="form" onSubmit={sendFile} >
                    <Form.Group
                        className="mb-3"
                    >
                        {/* <Col> */}
                        <Form.Label>Dodaj zdjęcia</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            // name="apk"
                            accept=".png,.jpg,.jpeg,.webp"
                            onChange={handleImageChange}
                        />

                        <br />

                        <Button variant="primary" type="submit">
                            Wyślij
                        </Button>

                        {/* <div className="result">{renderPhotos(selectedFiles)}</div> */}
                        
                        {/* </Col>

                        </Row> */}
                    </Form.Group>
                </Form >
            </div >
            {send && <ProgressBar now={Math.round((100 * progress) / size)} label={`${Math.round((100 * progress) / size)} %`} />}

            <br />
            <div id="perwiev_container">

                {renderPhotos(selectedFiles)}
            </div>



        </div>
    )
}

export default AddFile
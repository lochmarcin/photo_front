import React from "react";
import "./style.css"
import { ReactComponent as Trash } from './../../svg/trash.svg';
import axios from "axios"

import { Form, Button, ProgressBar, Table, Row, Col } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";



const AddFile = () => {
    const [file, setFiles] = React.useState([])
    const [selectedFiles, setSelectedFiles] = React.useState([])

    const sendFile = (e) => {
        e.preventDefault()



        var formData = new FormData();
        // for (const key of Object.keys(selectedFiles)) {
        //     formData.append('imgCollection', selectedFiles[key])
        // }

        if (selectedFiles.length != 0) {
            for (const single_file of selectedFiles) {
                formData.append('file', single_file)
            }
        }
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


        axios.post('http://127.0.0.1:5000/save/sendFile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
            // onUploadProgress: (data) => {

            //     //Set the progress value to show the progress bar
            //     setProgress(Math.round((100 * data.loaded) / data.total));
            // },
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

        console.log(selectedFiles)
    }

    const handleImageChange = (e) => {

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
                <tr key={photo}>
                    <td>
                        <img id="perwievImg" src={photo} alt="" />
                    </td>
                    <td>
                        Progress
                    </td>
                    <td>
                        <Trash id='trashSvg' onClick={() => deletePhoto(id)} />
                    </td>
                </tr>
            );
        });
    };

    const deletePhoto = (id) => {
        console.log("usuń: ")
        // const deleted = file
        // deleted.splice(id)
        // setFiles(deleted)
        // console.log(file)
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
        <div id="Addfile_Continer">
            <Form id="form" onSubmit={sendFile} >
                <Form.Group
                    className="mb-3"
                >
                    <Row>
                        <Col>
                            <Form.Label>Wyszykaj folder</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Wpisz ID"
                                id="FormControl"
                            />
                            <br />
                            <Button variant="primary" type="submit">
                                Wyszukaj
                            </Button>
                        </Col>



                        <Col>
                            <Form.Label>Dodaj zdjęcia</Form.Label>
                            <Form.Control
                                id="FormControl"
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
                            {/* {send && <ProgressBar now={progress} label={`${progress} %`} />} */}
                        </Col>

                    </Row>
                </Form.Group>
            </Form >
            <Table responsive>
                <tbody>
                    {renderPhotos(selectedFiles)}
                </tbody>
            </Table>


        </div >
    )
}

export default AddFile
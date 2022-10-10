import React from "react";
import "./style.css"
import { Form, Button, ProgressBar, Table, Row, Col } from "react-bootstrap";



const AddFile = () => {

    const [files, setFiles] = React.useState([])

    const sendFile = (e) => {
        e.preventDefault()
        console.log(files)
    }

    const perviewPhoto = (e) => {
        e.preventDefault()

        if (e.target.files) {
			const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

			// console.log("filesArray: ", filesArray);

			setFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		}
    }

    const renderPhotos = (source) => {
		console.log('source: ', source);
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} />;
		});
	};


    return (
        <>
            <Form id="form" onSubmit={sendFile}>
                <Form.Group controlId="formFile"
                    className="mb-3"
                >
                    <Row>
                        <Col>
                            <Form.Label>Wyszykaj folder</Form.Label>
                            <Form.Control type="text" placeholder="Wpisz ID" />
                            <br />
                            <Button variant="primary" type="submit">
                                Wyszykaj
                            </Button>
                        </Col>



                        <Col>
                            <Form.Label>Dodaj plik instalacyjny aplikacji</Form.Label>
                            <Form.Control
                                type="file"
                                multiple 
                                // name="apk"
                                accept=".png,.jpg,.jpeg,.webp"
                                onChange={(e) => perviewPhoto}
                            />
                            <img src={files[0]}></img>
                            <br />
                            {/* {fileData()} */}
                            <Button variant="primary" type="submit">
                                Wyślij
                            </Button>


                            {/* {send && <ProgressBar now={progress} label={`${progress} %`} />} */}
                        </Col>

                    </Row>
                </Form.Group>
            </Form>

            <div>{renderPhotos(files)}</div>
        </>
    )
}

export default AddFile
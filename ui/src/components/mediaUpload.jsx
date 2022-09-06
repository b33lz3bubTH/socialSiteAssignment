import React, { useState } from "react";
import { Grid } from "@mantine/core";
import API from "../utils/api";
import LoadingOverlay from "./loadingOverlay";


export default (props) => {
    // needs on successful media upload
    console.log("image: ", props.image);
    const [uploadingStatus, setUploadLoading] = useState(null);
    const [mediaImage, setMediaImage] = useState(props.image ?? null);

    const onMediaUpload = async (event) => {
        setUploadLoading(true);
        const formData = new FormData();

        formData.append('pic', event.target.files[0]);

        await fetch(API.mediaUpload(), {
            method: 'POST',
            headers: {
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                setMediaImage(result?.data?.fileName);
                props.onSubmit(result?.data?.fileName);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setUploadLoading(false);
    }
    return (
        <Grid style={{margin: '10px 0px'}}>
            <Grid.Col>
                {
                    uploadingStatus ? <LoadingOverlay /> : <>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Upload
                        </label>
                        <input id="file-upload" accept="image/*" type="file" onChange={onMediaUpload}/>
                    </>
                }
            </Grid.Col>
            {mediaImage && <Grid.Col>
                <img src={API.imageView(mediaImage)} style={{ objectFit: 'contain', height: '10em' }} />
            </Grid.Col>}
        </Grid>
    )
}

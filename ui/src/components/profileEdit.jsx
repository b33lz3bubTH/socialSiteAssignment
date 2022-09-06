import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import MediaUpload from "./mediaUpload";
import API, { postData } from "./../utils/api";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { authStore } from "./../utils/auth";
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit(props) {
    console.log("props.initialValues: ", props.initialValues);
    const [authstoreState, setAuthStoreState] = useState();
    let navigate = useNavigate();
    useEffect(() => {
        authStore.subscribe(setAuthStoreState);
    }, [])

    const mode = props.mode;
    const [err, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);

    const form = useForm({
        initialValues: {
            name: '',
            profilePictureMedia: '',
            ...props.initialValues,
        },

        validate: {
        },
    });

    const onUploadMedia = (mediaUUID) => {
        form.setFieldValue("profilePictureMedia", mediaUUID)
        console.log("mediaUUID: ", mediaUUID);
    }

    const onFormSubmit = (values) => {
        console.log("Values: ", values);
        postData(API.update(), {
            email: props.email,
            name: values.name,
            profilePictureMedia: values.profilePictureMedia
        }).then((json) => {
            setServerResponse(json?.data);
            setLoading(false);
            if ((json?.api_response_info?.status !== 200)) {
                setError("Could Not Load Data");
                toast.warning(json?.api_response_info?.message);
                return;
            }
            toast.success(json?.api_response_info?.message);
            authStore.updateProfile({name: values.name, profilePictureMedia: values.profilePictureMedia});
        });
    }


    return (
        <Box sx={{ maxWidth: 800 }} mx="auto" style={{ marginTop: '10vh', textAlign: 'left' }}>
            <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>

                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    type="hidden"
                    {...form.getInputProps('profilePictureMedia')}
                />

                <MediaUpload onSubmit={onUploadMedia} image={form.getInputProps('profilePictureMedia').value} />


                <Group position="left" mt="md">
                    <Button type="submit">Update Profile</Button>
                </Group>
            </form>
        </Box>
    );
}

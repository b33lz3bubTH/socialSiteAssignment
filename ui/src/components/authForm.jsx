import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import MediaUpload from "./mediaUpload";
import API, { postData } from "./../utils/api";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { authStore } from "./../utils/auth";
import { useNavigate } from 'react-router-dom';

export default function AuthForm(props) {
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
            email: '',
            name: '',
            profilePictureMedia: '',
            password: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length > 5 ? null : 'Password Should be Greater than 5'
        },
    });

    const onUploadMedia = (mediaUUID) => {
        form.setFieldValue("profilePictureMedia", mediaUUID)
        console.log("mediaUUID: ", mediaUUID);
    }

    const onFormSubmit = (values) => {
        postData(mode === "registration" ? API.registration() : API.login(), mode === "registration" ? {
            email: values.email,
            name: values.name,
            profilePictureMedia: values.profilePictureMedia,
            password: values.password
        } : {
            email: values.email,
            password: values.password
        }).then((json) => {
            setServerResponse(json?.data);
            setLoading(false);
            if ((json?.api_response_info?.status !== 200)) {
                setError("Could Not Load Data");
                toast.warning(json?.api_response_info?.message);
                return;
            }
            toast.success(json?.api_response_info?.message);
            if (mode === 'login') {
                authStore.signIn({ ...json?.data });
                navigate("/");
            }
        });


    }


    return (
        <Box sx={{ maxWidth: 800 }} mx="auto" style={{ marginTop: '10vh', textAlign: 'left' }}>
            <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    type="password"
                    withAsterisk
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />

                {
                    mode === 'registration' ? <>
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

                    </> : null
                }


                <Group position="left" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import API, { postData } from "./../utils/api";
import UserProfileView from "./userProfileView";
import { Button, Grid } from "@mantine/core";
import { authStore } from "./../utils/auth";
import { toast } from "react-toastify";
import { v4 } from "uuid";


export default (props) => {
    const [err, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);

    const userList = useFetch(API.listAllUsers());

    const [authstoreState, setAuthStoreState] = useState();

    useEffect(() => {
        authStore.subscribe(setAuthStoreState);
    }, [])


    const addFriend = (userToBeAdded) => {
        // callback to update new friend updated and load the friends section again.

        postData(API.addFriend(), {
            currentUser: authstoreState.email,
            requestedUser: userToBeAdded,
        }).then((json) => {
            setServerResponse(json?.data);
            setLoading(false);
            if ((json?.api_response_info?.status !== 200)) {
                setError("Error");
                toast.warning(json?.api_response_info?.message);
                return;
            }
            toast.success(json?.api_response_info?.message);
            props?.setProfileTrigger(v4());
        });
    }

    return (
        <div>
            <h1>All Profiles</h1>
            <div style={{ maxHeight: '50vh', overflowY: 'auto', overflowX: 'hidden', padding: '2%' }}>
                <Grid>
                    {
                        userList?.data?.data?.map(user => <Grid.Col xs={12} style={{ textAlign: 'left' }}>
                            <UserProfileView profilePictureMedia={user?.profilePictureMedia} name={user.name} email={user.email} />
                            <Button onClick={() => addFriend(user.email)}>Add As friend</Button>
                        </Grid.Col>)
                    }
                </Grid>
            </div>
        </div>
    )
}
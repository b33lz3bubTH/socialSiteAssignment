import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import API, { postData } from "./../utils/api";
import UserProfileView from "./userProfileView";
import { Button, Grid } from "@mantine/core";
import { authStore } from "./../utils/auth";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import useTrigger from "react-use-trigger/useTrigger";



export default (props) => {
    const [authstoreState, setAuthStoreState] = useState();

    const [err, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [serverResponse, setServerResponse] = useState(null);

    const requestTriggerValue = useTrigger(props.requestTrigger);

    

    useEffect(() => {
        authStore.subscribe(setAuthStoreState);
    }, []);


    const friendUserList = useFetch(API.listAllFriends(authstoreState?.email), {
        depends: [authstoreState?.isLoggedIn, requestTriggerValue]
    });

    // useFetch(()=> {
    //     console.log("friendUserList: ", friendUserList.data);
    // }, [friendUserList])

    console.log("friendUserList: ", friendUserList);

    return (
        <div>
            <h1>My Friends</h1>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden', padding: '2%' }}>
                <Grid>
                    {
                        friendUserList?.data?.data?.friendList?.map(user => <Grid.Col xs={12} style={{ textAlign: 'left' }}>
                            <UserProfileView profilePictureMedia={user?.profilePictureMedia} name={user.name} email={user.email} />
                        </Grid.Col>)
                    }
                </Grid>
            </div>
        </div>
    )
}
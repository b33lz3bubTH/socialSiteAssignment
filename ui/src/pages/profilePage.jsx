import { useState, useEffect } from "react";
import { authStore } from "./../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import ProfileEdit from "./../components/profileEdit";
import ListAllUsers from "../components/listAllUsers";
import { Button, Container, Grid } from "@mantine/core";
import createTrigger from "react-use-trigger";
import ShowAllFriends from "../components/showAllFriends";

import { Tabs } from '@mantine/core';

export default function ProfilePage(props) {
    const [authstoreState, setAuthStoreState] = useState(null);
    const [mountState, setMountState] = useState(false);
    const navigate = useNavigate();


    const requestTrigger = createTrigger();

    useEffect(() => {
        authStore.subscribe(setAuthStoreState);
        setMountState(true);
    }, []);

    useEffect(() => {
        console.log("authstoreState: ", authstoreState);

    }, [authstoreState])
    useEffect(() => {
        if (mountState) {
            authStore.resume();
        }
    }, [mountState]);

    const logOutController = () => {
        authStore.logout();
    }

    return (
        <Container maxWidth="lg">
            <div style={{marginTop: '5vh', marginBottom: '5vh', textAlign: 'right'}}>
                {
                    !(authstoreState?.isLoggedIn) ? <Link to="/sign-in">Not Logged In, Please Sign In</Link> :
                        <Button onClick={logOutController}>Logout</Button>
                }
            </div>

            <Tabs defaultValue="profile" style={{display : (authstoreState?.isLoggedIn) ? 'block' : 'none'}}>
                <Tabs.List>
                    <Tabs.Tab value="profile">Profile</Tabs.Tab>
                    <Tabs.Tab value="allUsers">All Users</Tabs.Tab>
                    <Tabs.Tab value="myFriends">My Friends</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="profile" pt="xs">
                    <div style={{ width: '100%' }}>
                        {authstoreState?.isLoggedIn ? <ProfileEdit initialValues={authstoreState} email={authstoreState?.email} /> : null}
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="allUsers" pt="xs">
                    <ListAllUsers requestTrigger={requestTrigger} />
                </Tabs.Panel>

                <Tabs.Panel value="myFriends" pt="xs">
                    <ShowAllFriends requestTrigger={requestTrigger} />
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}
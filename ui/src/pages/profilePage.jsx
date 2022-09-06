import { useState, useEffect } from "react";
import { authStore } from "./../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import ProfileEdit from "./../components/profileEdit";
import ListAllUsers from "../components/listAllUsers";
import { Grid } from "@mantine/core";

export default function ProfilePage(props) {
    const [authstoreState, setAuthStoreState] = useState(null);
    const [mountState, setMountState] = useState(false);
    const navigate = useNavigate();

    const [profileTrigger, setProfileTrigger] = useState("");

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

    return (
        <div style={{ width: '100%' }}>
            <h1>Profile Page</h1>
            {
                authstoreState ? <div>
                    {authstoreState?.isLoggedIn ? <ProfileEdit initialValues={authstoreState} email={authstoreState?.email} /> : null}


                </div> : <Link to="/sign-in">Not Logged In, Please Sign In</Link>
            }
            <Grid>
                <Grid.Col xs={6}>
                    <div>
                        {
                            authstoreState?.isLoggedIn ? <ListAllUsers setProfileTrigger={setProfileTrigger}/> : null
                        }
                    </div>
                </Grid.Col>
                <Grid.Col xs={6}>
                    
                </Grid.Col>
            </Grid>
        </div>
    )
}
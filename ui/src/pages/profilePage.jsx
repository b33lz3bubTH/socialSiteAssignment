import { useState, useEffect } from "react";
import { authStore } from "./../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import ProfileEdit from "./../components/profileEdit";

export default function ProfilePage(props) {
    const [authstoreState, setAuthStoreState] = useState(null);
    const [mountState, setMountState] = useState(false);
    const navigate = useNavigate()

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
        <div>
            <h1>Profile Page</h1>
            {
                authstoreState ? <div>
                    {authstoreState?.isLoggedIn ? <ProfileEdit initialValues={authstoreState} email={authstoreState?.email}/> : null}

                </div> : <Link to="/sign-in">Not Logged In, Please Sign In</Link>
            }
        </div>
    )
}
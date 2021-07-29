import React, {useEffect, useState} from 'react';
import {UserInterface} from "../../interfaces/user.interface";
import UserApi from "../../api/user.api";
import {useParams} from "react-router-dom";
import {Container} from "@material-ui/core";
import styles from './user-page.module.css';

function UserPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [error, setError] = useState(true);
    let { login }: {login: string} = useParams();
    useEffect(() => {
        UserApi.getUserAsync(login)
            .then(res =>{
                setUser(res);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [login]);
    return (
        <Container maxWidth="sm">
            {loading && <div>loading...</div>}
            {!loading &&
            <div>
                <img className={styles.avatar}
                      src={user?.avatar_url} alt={user?.login}/>
                <h3>Name: {user?.name}</h3>
                <p>email: {user?.email}</p>
            </div>}
            {error && <div>{error}</div>}
        </Container>
);
}

export default UserPage;

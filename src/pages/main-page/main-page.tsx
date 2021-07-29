import React, {useEffect, useState} from 'react';
import UserApi from '../../api/user.api'
import {UserInterface} from "../../interfaces/user.interface";
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import styles from './main-page.module.scss';
import {useHistory} from "react-router-dom";

function MainPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserInterface[] | null>(null);
    const [error, setError] = useState(true);
    const history = useHistory();
    useEffect(() => {
            UserApi.getAllUsersAsync()
                .then(res =>{
                    setUsers(res);
                })
                .catch(error => setError(error.message))
                .finally(() => setLoading(false));
    }, []);

    const onClickUser =(login: string)=> {
        history.push(`/user/${login}`);
    }

    return (
        <Container maxWidth="xl">
            {loading && <div>loading...</div>}
            {!loading &&
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">login</TableCell>
                            <TableCell align="right">url</TableCell>
                            <TableCell align="right">avatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user: UserInterface) => (
                            <TableRow onClick={()=>onClickUser(user.login)} key={user.id}>
                                <TableCell component="th" scope="row">{user.id}</TableCell>
                                <TableCell align="right">{user.login}</TableCell>
                                <TableCell align="right">{user.url}</TableCell>
                                <TableCell align="right">
                                    <img className={styles.avatar} src={user.avatar_url} alt={user.login}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            {error && <div>{error}</div>}
        </Container>
    );
}

export default MainPage;


import React, { useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import getUsersService from "../../Utils/Services/GetUsersService/GetUsersService";

const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'description', headerName: 'Description', width: 260 },
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 130,
        renderCell: (params) => (
            <Avatar alt="Remy Sharp" src={params.value} />
        )
    }];
const useStyles = makeStyles((theme) => ({
    table: {
        height: 400,
        width: '50%',
        marginLeft: '25%'
    }
}));

const ShowGithubUsers = props => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [errorLoadData, setErrorLoadData] = useState(false)

    const usersPerPage = 5;

    const handlePageChange = (params) => {
        setPage(params.page);
    };

    useEffect(() => {
        let active = true;
        setErrorLoadData(false);
        (async () => {
            setLoading(true);
            let data;
            try {
                data = await getUsersService(props.searchKeyword, usersPerPage, page);
            }
            catch (e) {
                setErrorLoadData(true);
                setLoading(false);
                return
            }

            if (!active) {
                return;
            }
            setTotal(data.totalUsersCount);
            setRows(data.users);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page, props.searchKeyword]);


    return (
        <div className={classes.table}>
            {!errorLoadData ? <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSize={usersPerPage}
                rowCount={total}
                paginationMode="server"
                onPageChange={handlePageChange}
                loading={loading}
            /> :
                'Unable to load data from api'}
        </div>
    )
}

export default ShowGithubUsers;



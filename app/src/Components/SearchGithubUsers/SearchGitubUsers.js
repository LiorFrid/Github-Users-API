import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        width: '20%',
        marginLeft: '40%',
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'column'
    },
    btn: {
        margin: theme.spacing(2),
    }
}));

const SearchGithubUsers = props => {
    const classes = useStyles();
    const [searchKeywordInput, setsearchKeywordInput] = useState('')
    const inputChangeHandler = event => {
        setsearchKeywordInput(event.target.value)
    }
    console.log(searchKeywordInput)
    return (
        <div className={classes.root}>
            <TextField
                id="outlined-basic"
                label="Search for users"
                variant="outlined"
                onChange={inputChangeHandler} />
            <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                disabled={searchKeywordInput === ''}
                onClick={() => props.setSearchKeyword(searchKeywordInput)}>
                Search
            </Button>
        </div>
    )
}

export default SearchGithubUsers;
import React, { useState } from 'react';
import SearchGithubUsers from "../../Components/SearchGithubUsers/SearchGitubUsers";
import ShowGithubUsers from "../../Components/ShowGithubUsers/ShowGithubUsers";

const SearchUsers = () => {
    const [searchKeyword, setSearchKeyword] = useState(null);
    return (
        <React.Fragment>
            <SearchGithubUsers setSearchKeyword={setSearchKeyword} />
            {searchKeyword !== null ?
                <ShowGithubUsers searchKeyword={searchKeyword} />
                : null}
        </React.Fragment>
    )

}

export default SearchUsers;
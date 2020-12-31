import axios from '../../Axios/axios';
import User from '../../Models/User'

const getUsersService = async (search, perPageParam, pageNumberParam) => {
    let result;
    try {
        result = await axios.get('getUsers', {
            params: {
                perPage: perPageParam,
                pageNumber: pageNumberParam,
                searchKeyWord: search
            }
        });
    }
    catch (e) {
        throw Error(e);
    }


    const users = [];
    result.data.users.forEach(el => {
        const user = new User(el.id, el.email, el.name, el.avatar_url, el.bio);
        users.push(user);
    });
    return {
        users: users,
        totalUsersCount: result.data.total
    };
}

export default getUsersService;
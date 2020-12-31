const express = require('express');
const axios = require('axios');
const cors = require('cors')
const https = require('https')
require('dotenv').config()

const app = express();

const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
 

app.use(cors());

app.get('/getUsers', async (req, res) => {

    const pageNumber = req.query.pageNumber;
    const perPage = req.query.perPage;
    const search = req.query.searchKeyWord;
    const getAllUserURI = `https://api.github.com/search/users?q=${search}&per_page=${perPage}&page=${pageNumber}&access_token=${process.env.API_TOKEN}`;
    try {
        console.log("asd")
        const apiResult = await instance.get(getAllUserURI);
        console.log(apiResult)
        const promises = apiResult.data.items.map(async el => {
            const user = await instance.get(`https://api.github.com/users/${el.login}`)
            return user.data
        })

        const users = await Promise.all(promises);
        res.send({
            users: users,
            total: apiResult.data.total_count
        });
    }
    catch (e) {
        console.log(e)
        console.log(getAllUserURI)
        res.status(500)
            .send(new Error('Unable to load data from api'));
    }
});

app.listen(3001, () => {
    console.log('server started');
});


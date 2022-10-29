// const express = require('express');
import { request, gql } from 'graphql-request'

const query = gql`
  {
    user (id: "0xf48ed9a03fc6bb55949f08649cb54d792928cdfe") {
      id
    }
  }
`

request('https://api.thegraph.com/subgraphs/name/aave/protocol-v2', query).then((data) => console.log(data));

// const app = express();
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
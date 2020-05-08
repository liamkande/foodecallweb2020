import axios from 'axios'

export default axios.create({
  baseURL:'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
    'Bearer PoG6knEnvYeVo8bdETimcCrLIg6GJqowWbpvd8YtjIjjJ2FbQNAlMOgjpJLF5rMKeo_FdEzc1OcLEGeumrPLxwxLOaaamD8LAw0P2jvn0u5OsSXfetfBIU5joPK4XXYx',
  }

})

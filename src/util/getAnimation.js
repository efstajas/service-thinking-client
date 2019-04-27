import axios from 'axios'

export default(path) => {
    return axios.get(path)
}
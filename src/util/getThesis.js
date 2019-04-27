import axios from 'axios'

export default () => {
    return axios.get('/thesis/thesis.json')
}
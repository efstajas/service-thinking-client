import axios from 'axios'

export default () => {
    return axios.get('/thesis/refs.bib')
}
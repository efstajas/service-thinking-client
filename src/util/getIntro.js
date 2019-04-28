import axios from 'axios'

export default(thesis) => {
    return axios.get(thesis.intro.path)
}
import axios from 'axios'

export default(thesis) => {
    return axios.get(thesis.appendix.path)
}
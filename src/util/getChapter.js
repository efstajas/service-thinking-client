import axios from 'axios'

export default (thesis, slug) => {
    let url = thesis.chapters.find(chapter => chapter.slug === slug).path
    return axios.get(url)
}
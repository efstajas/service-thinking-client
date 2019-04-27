export default (thesis, slug) => {
    return thesis.chapters.find(chapter => chapter.slug === slug)
}
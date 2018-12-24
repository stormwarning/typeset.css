const spawn = require('cross-spawn')
const { totalDownloads } = require('../utils/download-count')

module.exports = (options = {}, context) => ({
    extendPageData($page) {
        if ($page.frontmatter.home) {
            $page.downloadCount = totalDownloads().then((dls) => {
                // console.log(dls)
                return dls
            })
            $page.lastUpdated = getGitLastUpdatedTimeStamp($page._filePath)
        }
    }
})

function getTotalDownloads() {
    let downloadCount

    try {
        downloadCount = totalDownloads().then((dls) => {
            // console.log(dls)
            return dls
        })
    } catch (error) {
        console.log('Error', error)
    }

    return downloadCount
}

function getGitLastUpdatedTimeStamp(filePath) {
    let lastUpdated

    try {
        lastUpdated =
            parseInt(
                spawn
                    .sync('git', ['log', '-1', '--format=%ct', filePath])
                    .stdout.toString('utf-8')
            ) * 1000
    } catch (e) {
        /* do not handle for now */
    }

    return lastUpdated
}

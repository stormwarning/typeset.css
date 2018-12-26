const { addMonths, format, isBefore, isPast } = require('date-fns')
const fetch = require('make-fetch-happen')

const ENDPOINT = 'https://api.npmjs.org/downloads/range/'
const PACKAGE = 'typeset.css'

function formatDate(date) {
    return format(date, 'YYYY-MM-DD')
}

async function fetchDownloads(endpoint) {
    return await fetch(endpoint)
        .then((response) => response.json())
        .then((data) =>
            data.downloads
                .map((item) => item.downloads)
                .reduce((accum, current) => accum + current),
        )
}

/**
 * @see https://github.com/npm/registry/blob/master/docs/download-counts.md
 */
async function getDownloadsInRange(fromDate, toDate) {
    let downloadCount = []

    fromDate = formatDate(fromDate)
    toDate = formatDate(toDate)

    async function countDownloads(from, until) {
        let nextDate = formatDate(addMonths(from, 18))
        let apiUrl = `${ENDPOINT}${from}:${nextDate}/${PACKAGE}`

        await fetchDownloads(apiUrl).then((dls) => downloadCount.push(dls))

        if (isBefore(nextDate, until)) {
            return await countDownloads(nextDate, until)
        } else {
            return downloadCount.reduce((acc, cur) => acc + cur)
        }
    }

    return await countDownloads(fromDate, toDate)
        .then((downloadsInRange) => {
            return downloadsInRange
        })
        .catch((error) => {
            console.log(error)
            return 'Error'
        })
}

async function totalDownloads() {
    let startDate = '2015-11-09'
    let currentDate = new Date()

    return await getDownloadsInRange(startDate, currentDate)
        .then((downloads) => {
            return downloads
        })
        .catch((error) => {
            console.log(error)
            return 'Error'
        })
}

module.exports = {
    getDownloadsInRange,
    totalDownloads,
}

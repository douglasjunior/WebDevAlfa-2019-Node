const moment = require('moment')

function dataParaString(data) {
    const dataMoment = moment(data)
    return dataMoment.format('DD/MM/YYYY')
}

module.exports = {
    dataParaString
}

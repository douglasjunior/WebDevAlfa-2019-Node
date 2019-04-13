const formatter = require('./formatter')

const dataAtual = new Date()

const dataFormatada = formatter.dataParaString(dataAtual)

console.log(dataFormatada)


// const moment = require('moment')

// const dataAtual = moment()

// const dataFormatada = dataAtual.format('DD/MM/YYYY HH:mm:ss');

// console.log(dataFormatada)

// dataAtual.add(5, 'days')

// const dataFuturaFormatda = 
//     dataAtual.format('DD/MM/YYYY HH:mm:ss')

// console.log(dataFuturaFormatda)



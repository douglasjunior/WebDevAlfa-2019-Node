const moment = require('moment');

const CPF_BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
];

function verifierDigitCPF(value) {
    const numbers = value
        .split('')
        .map(number => Number(number));
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

/**
 * Função de validação de CPF.
 * @param {string} value 
 */
function validateCPF(value) {
    const stripped = (value || '').replace(/[^\d]/g, '');

    if (stripped && stripped.length === 11 && CPF_BLACKLIST.indexOf(stripped) === -1) {
        let numbers = stripped.substr(0, 9);
        numbers += verifierDigitCPF(numbers);
        numbers += verifierDigitCPF(numbers);

        if (numbers.substr(-2) === stripped.substr(-2)) {
            return true;
        }
    }
    return false;
};

/**
 * Validadores customizados do express-validator.
 */
module.exports = {
    isDate: function (value, format) {
        return moment(value, format, true).isValid();
    },
    isCPF: function (value) {
        return validateCPF(value);
    }
}

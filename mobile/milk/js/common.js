//保留两位小数
function changeTwoDecimal(number) {
    var number_f = parseFloat(number);
    if (isNaN(number_f)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    number_f = Math.round(number * 100) / 100;
    var string_f = number_f.toString();
    var pos_decimal = string_f.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = string_f.length;
        string_f += '.';
    }
    while (string_f.length <= pos_decimal + 2) {
        string_f += '0';
    }
    return string_f;
}
// 是否存在
function isExist(str){
    return str.length > 0;
}
// 参数字符数
function getLen(str){
    return str.length;
}
// 是否数字
function isNum(str){
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(str);
}
// 是否整数
function isInt(str) {
    return /^\d+$/.test(str);
}
// 是否email
function isEmail(str) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
}
// 是否url
function isUrl(str){
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
}
// 是否日期
function isDate(str) {
    return !/Invalid|NaN/.test( new Date(str).toString() );
}


function _get_err(arg){
    var str = (arg.value || '').trim();
    if(arg.exist && !isExist(str)){
        return 'exist';
    }
    if(arg.email && !isEmail(str)){
        return 'email';
    }
    if(arg.url && !isUrl(str)){
        return 'url';
    }
    if(arg.date && !isDate(str)){
        return 'date';
    }
    if((arg.num || arg.int || arg.max || arg.min || arg.positive || arg.negative) && !isNum(str)){
        return 'num';
    }
    if(arg.int && !isInt(str)){
        return 'int';
    }
    if(arg.positive && +str < 0){
        return 'positive';
    }
    if(arg.no_negative && +str <= 0){
        return 'no_negative';
    }
    if(arg.negative && +str > 0){
        return 'negative';
    }
    if(arg.no_positive && +str >= 0){
        return 'no_positive';
    }
    if(arg.max !== undefined && +str > +arg.max){
        return 'max';
    }
    if(arg.min !== undefined && +str < +arg.min){
        return 'min';
    }
    if(arg.max_len !== undefined && getLen(str) > +arg.max_len){
        return 'max_len';
    }
    if(arg.min_len !== undefined && getLen(str) < +arg.min_len){
        return 'min_len';
    }
    if(arg.len !== undefined && getLen(str) !== +arg.len){
        return 'len';
    }
    if(arg.equal !== undefined && ''+arg.equal === str){
        return 'equal';
    }
    return ;
}
function get_err(args){
    var err_obj = {};
    args.forEach(function(arg){
        var tip = _get_err(arg);
        if(tip){
            err_obj[arg.key] = tip;
        }
    });
    return !!Object.keys(err_obj).length ? err_obj : false;
}

module.exports = {
    get_err: get_err
};


// var rule = [{
//     key: 'xx',
//     value: 'dsa213',
//     exist: true,
//     email: true,
//     url: true,
//     date: true,
//     num: true,
//     int: true,
//     positive: true,
//     negative: true,
//     no_positive: true,
//     no_negative: true,
//     max: 100,
//     min: 3,
//     max_len: 20,
//     min_len: 5,
//     len: 11,
//     equal: 'dasweq'
// };
// 

// exist: "字段为空",
// email: "邮箱格式不正确",
// url: "url格式不正确",
// date: "日期格式不正确",
// num: "请输入正确的数字！",
// int: "请输入整数",
// positive: "请输入正数",
// negative: "请输入负数",
// no_positive: "请输入非正数",
// no_negative: "请输入非负数",
// max: "数值太大",
// min: "数值太小",
// max_len: "字符数超长",
// min_len: "字符数不足",
// len: "字符数不正确",
// equal: "两次输入不一致"
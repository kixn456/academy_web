/**
 * Created by Administrator on 2018/3/5.
 */
import Mock from 'mockjs';
import {getRootPath,ajaxPost,ajaxGet} from '../common/ajax';
// Mock.mock( template )
export function MockInt(){

    var template = {
        'title': 'Syntax Demo',
        'string1|1-10': '★',
        'string2|3': 'value',
        'number1|+1': 100,
        'number2|1-100': 100,
        'number3|1-100.1-10': 1,
        'number4|123.1-10': 1,
        'number5|123.3': 1,
        'number6|123.10': 1.123,
        'boolean1|1': true,
        'boolean2|1-2': true
    }
    let serverUrl=getRootPath();

// Mock.mock( rurl, rtype, function(options) )
    Mock.mock(/http:\/\/www.chunzeacademy.com:8080/, 'get', function(options) {
        console.log("999999999999")
        return template
    })
    Mock.mock(/http:\/\/www.chunzeacademy.com:8080/, 'post', function(options) {
        return options.type
    })

}





import { init, clear, display_credit} from "./init.js"
import { display_list, getCourse, newCourse, splittime } from "./course.js"

const PLACES_TO_NUMBER = 
{
    '文學院': 0,
    '理學院': 1,
    '社會科學學院': 2,
    '工學院': 3,
    '管理學院': 4,
    '法學院': 5,
    '教育學院':	6,
    '其他': 7,
    '學院別': -1
}

const CHINESE_DEPART_TO_NUMBER =
{
    '文學院學士班': 1014, '中文系': 1104, '中文所': 1106, '外文系': 1154, '外文所': 1156,'歷史系': 1204, '歷史所': 1206, '哲學系': 1254, '哲學所': 1256, '英語教學所': 1366, '台文創應所': 1416,
    '理學院學士班': 2014, '數學系': 2104, '應數所': 2106, '地震所': 2156, '物理系': 2204, '物理所': 2206, '統科所':2316, '地環系': 2354, '地環所': 2356, '數學所': 2406, '分子生物所': 2456, '生醫系': 2574, '生醫所': 2576, '化生系': 2604, '化生所': 2606, '跨領域科學國際博士學位學程': 2706,
    '社福系': 3104, '社福所': 3106, '心理系': 3154, '心理所': 3156, '勞工系': 3204, '勞工所': 3206, '政治系': 3304, '政治所': 3306, '傳播系': 3354, '電傳所': 3356, '戰略所':3416, '臨床心理所': 3656, '認知科學博士學位學程': 3706, 
    '工學院學士班': 4014, '工學院碩士班': 4016,'資工系': 4104, '資工所': 4106, '電機系': 4154, '電機所': 4156, '機械系': 4204, '機械所': 4206, '化工系': 4254, '化工所': 4256, '通訊系': 4304, '通訊所': 4306, '光機電所': 4416, '前瞻製造系統碩/博士學位學程': 4456,
    '經濟系': 5104, '財金系': 5154, '財金所': 5156, '企管系': 5204, '企管所': 5206, '會資系': 5264, '會資所': 5266, '資管系': 5304, '資管所': 5306, '國經所': 5106, '國際財管碩士學位學程': 5356, '行銷管理所': 5456, '醫療資訊管理所': 5556,
    '法學院學士班': 6014, '法律所': 6056, '法律系法學組': 6104, '法律系法制組': 6204, '財法系': 6304, '財法所': 6306,
    '成教系': 7104, '成教所': 7106, '犯防系': 7254, '犯防所': 7256, '運競系': 7364, '教育所': 7156, '師培中心': 7306, '休閒教育所': 7356, '教育領導碩士學位學程': 7456, '高齡者教育所': 7506,
    '體育中心': 'F000', '通識中心': 'I001', '軍訓': 'V000', '語言中心': 'Z121' 
}

const CHINESE_WORD_TO_NUMBER =
{
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6
}

const CLASS_MAP =
{
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    '13': 13,
    '14': 14,
    '15': 15,
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10
}

var submit = document.getElementById("submit");
var clean = document.getElementById("clean");
submit.onclick = newCourse;
clean.onclick = clear;
init();
    
function delete_display(target, mode){
    if(mode == 'auto'){
        var course_list = JSON.parse(localStorage.course_list);
        var storedUsed = JSON.parse(localStorage.used);
        for(var i = 0; i < course_list.length; i++)
        {   
            let tmp = target.parentNode.parentNode;
            let display_text = tmp.getElementsByTagName("td");
            if((display_text[0].textContent === course_list[i]["課程名稱"]) && (display_text[1].textContent === course_list[i]["上課教室"]) && (display_text[2].textContent === course_list[i]["顯示上課時間"]))
            {   
                let start = 0;
                let end = 0;
                for(let j = 0; j < course_list[i]['上課時間'].length; ++j){
                    for(let k = 0; k < course_list[i]['上課時間'][j]['time'].length; ++k){
                        storedUsed[course_list[i]['上課時間'][j]['day'] - 1][course_list[i]['上課時間'][j]['time'][k]] = false;
                    }
                }
                let credit = Number(localStorage.credit);
                credit -= Number(course_list[i]['學分數']);
                localStorage.credit = credit;
                course_list.splice(i, 1);
                break;
            }
        }
        localStorage.used = JSON.stringify(storedUsed);
        localStorage.course_list = JSON.stringify(course_list);//done
    }
    else if(mode == 'noauto'){
        // 有bug，全都為auto
        console.log('noauto');
        // var course_list = JSON.parse(localStorage.course_list);
        // console.log(course_list);
        // var storedUsed = JSON.parse(localStorage.used);
        // for(var i = 0; i < course_list.length; i++)
        // {   
        //     let display_text = target.parentNode.parentNode.textContent;
        //     if(display_text.includes(course_list[i]["課程名稱"]) && display_text.includes(course_list[i]['顯示上課時間']));
        //     { 
        //         let start = 0;
        //         let end = 0;
        //         for(let j = 0; j < course_list[i]['上課時間'].length; ++j){
        //             for(let k = 0; k < course_list[i]['上課時間'][j]['time'].length; ++k){
        //                 storedUsed[course_list[i]['上課時間'][j]['day'] - 1][course_list[i]['上課時間'][j]['time'][k]] = false;
        //             }
        //         }
        //         let credit = Number(localStorage.credit);
        //         credit -= Number(course_list[i]['學分數']);
        //         localStorage.credit = credit;
        //         course_list.splice(i, 1);
        //         break;
        //     }
        // }
        // localStorage.used = JSON.stringify(storedUsed);
        // localStorage.course_list = JSON.stringify(course_list);//done
    }
}

document.querySelector('.coursesGroup').addEventListener('click', function(event)
{
    const target = event.target;
    // 目前這裡有bug，不論是手動還是自動加入的課程，都是id為auto
    if(target.classList.contains('btn-delete') && target.parentNode.parentNode.dataset.id == 'auto')
    {   
        delete_display(target, 'auto');
        display_credit();
        var row = target.parentNode.parentNode;
        row.parentNode.removeChild(row);
        getCourse();
    }else if(target.classList.contains('btn-delete') && target.parentNode.parentNode.dataset.id == 'noauto'){
        delete_display(target, 'noauto');
        console.log('noauto');
        var row = target.parentNode.parentNode;
        row.parentNode.removeChild(row);
        getCourse();
    }
});

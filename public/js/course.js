import { resetTable } from './init.js'

const CHINESE_WORD_TO_NUMBER =
{
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6
}

const CHINESE_DATA = ['一', '二', '三', '四', '五', '六']

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

const CLASS_TO_TIME =
{
    '1': '07:10',
    '2': '08:10',
    '3': '09:10',
    '4': '10:10',
    '5': '11:10',
    '6': '12:10',
    '7': '13:10',
    '8': '14:10',
    '9': '15:10',
    '10': '16:10',
    '11': '17:10',
    '12': '18:10',
    '13': '19:10',
    '14': '20:10',
    '15': '21:10',
    'A': '07:15',
    'B': '08:45',
    'C': '10:15',
    'D': '11:45',
    'E': '13:15',
    'F': '14:45',
    'G': '16:15',
    'H': '17:45',
    'I': '19:15',
    'J': '20:45'
}

function isdigit(str)
{
    return /^\d+$/.test(str);
}

var dayCheck = ['一', '二', '三', '四', '五', '六']
var timeCheck = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
var xssSimpleCheck = [";", "/", "?", ":", "@", "&", "=", "+", "$", ",", "<", ">", "alert", "\\", "\/", ".", "]", "[", "\\", "^", "-", "_", "`", "\"", "'"]

export function createCurriculum()
{
    return new Promise((resolve, reject) => {
        let rows = $("#curriculum > tbody > tr").get();
        var storedcourses = JSON.parse(localStorage.courses);
        for(var index = 0; index < storedcourses.length; index++)
        {
            let courseName = storedcourses[index]["課程名稱"]
            let courseTime = storedcourses[index]["上課時間"]
            let courseClassroom = storedcourses[index]["上課教室"]
            let day = CHINESE_WORD_TO_NUMBER[courseTime["星期"]]
            let startClass = 0
            let endClass = 0
            let startTime = CLASS_TO_TIME[courseTime["開始節次"]];
            if(courseTime["開始節次"] >= 'A' && courseTime["開始節次"] <= 'J')
            {
                startClass = 1 + (CLASS_MAP[courseTime["開始節次"]] - 1) * 3
                endClass = 3 + (CLASS_MAP[courseTime["結束節次"]] - 1) * 3
            }
            else 
            {
                startClass = 1 + (CLASS_MAP[courseTime["開始節次"]] - 1) * 2
                endClass = CLASS_MAP[courseTime["結束節次"]] * 2 
            }
            for(let i = startClass; i <= endClass; ++i)
            {
                var tds = $(rows[i]).children('td')
                $(tds[day + 2]).append(`<div class = "course-time">${startTime}</div>`)
                if(courseName.length > 8)
                {
                    var tmp = "";
                    var len = courseName.length;
                    let j = 0;
                    while(len > 0)
                    {
                        tmp += courseName.substring(0 + (j * 8), 8 + j * 8) + "<br>"
                        j++;
                        len -= 8;
                    }
                    $(tds[day + 2]).append(`<div class = "course-name break-words">${tmp}</div>`)
                }
                else
                    $(tds[day + 2]).append(`<div class = "course-name">${courseName}</div>`)
                $(tds[day + 2]).append(`<div class = "course-classroom">${courseClassroom}</div>`)
                $(tds[day + 2]).addClass('used-td')
            }
        }
        resolve(1);
    });
}

export function getCourse()
{
    resetTable()
    createCurriculum().then($("#curriculum").rowspanizer())
    $("#curriculum").show()
    document.getElementById("curriculum").style.visibility = "visible"; 
}

function check(start, end, classDay)
{   
    let startClass = 0;
    let endClass = 0;
    if(start >= 'A' && end <= 'J')
    {
        startClass = 1 + (CLASS_MAP[start] - 1) * 3
        endClass = 3 + (CLASS_MAP[end] - 1) * 3
    }
    else 
    {
        startClass = 1 + (CLASS_MAP[start] - 1) * 2
        endClass = CLASS_MAP[end] * 2 
    }
    var storedUsed = JSON.parse(localStorage.used);
    console.log(storedUsed);
    for(var i = startClass - 1; i < endClass; ++i)
    {
        if(storedUsed[CHINESE_WORD_TO_NUMBER[classDay] - 1][i])
        {   
            console.log(i);
            alert("您的課堂有所衝突!");
            return false;
        }
    }
    return true;
}

export function newCourse()
{
    let className = document.getElementById("Course name").value;
    let classLocation = document.getElementById("Classroom").value;
    let e = document.getElementById("Select1");
    let classDay = e.options[e.selectedIndex].text;
    let start = document.getElementById("Select2").value;
    let end = document.getElementById("Select3").value;
    if(className === '')
        alert('您的課程名稱不得為空。')
    else if(classLocation === '')
        alert('您的課程教室不得為空。')
    else if(!dayCheck.includes(classDay))
        alert('您的課程日期錯誤。')
    else if(!timeCheck.includes(start) || !timeCheck.includes(end))
        alert('您的課程時間資訊錯誤。')
    else if(parseInt(start) > parseInt(end) || (isdigit(start) && !isdigit(end)) || (!isdigit(start) && isdigit(end)))
        alert('您的課程時間資訊錯誤。')
    else
    {
        for(var i = 0; i < xssSimpleCheck.length; ++i)
        {
            if(classLocation.includes(xssSimpleCheck[i]) || className.includes(xssSimpleCheck[i]))
            {
                alert('您的輸入有不合法字元!');
                return;
            }
        }
        let startClass = 0;
        let endClass = 0;
        if(start >= 'A' && end <= 'J')
        {
            startClass = 1 + (CLASS_MAP[start] - 1) * 3
            endClass = 3 + (CLASS_MAP[end] - 1) * 3
        }
        else 
        {
            startClass = 1 + (CLASS_MAP[start] - 1) * 2
            endClass = CLASS_MAP[end] * 2 
        }
        if(check(startClass, endClass, classDay))
        {
            let list = $("#accordion").get();
            var isUsed = JSON.parse(localStorage.used);
            var courses = JSON.parse(localStorage.courses);
            var elem = document.getElementById("default")
            if(list.length === 1 && elem)
                elem.parentNode.removeChild(elem);
            $('#accordion > tbody:last-child').append(`<tr><td class = 'td'>${className}</td><td class = 'td'>${classLocation}</td><td class = 'td'>${classDay} ${start} ~ ${end}</td><td class = 'td'><button type = "button" class = "btn-delete inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>刪除</button></td></tr>`);
            $("#accordion").show();
            courses.push({課程名稱: className, 上課教室: classLocation, 上課時間: {星期: classDay, 開始節次: start, 結束節次: end}});
            for(var i = startClass - 1; i < endClass; ++i)
                isUsed[CHINESE_WORD_TO_NUMBER[classDay] - 1][i] = true;
            localStorage.used = JSON.stringify(isUsed);
            localStorage.courses = JSON.stringify(courses);
            getCourse();
        }
    }
}

var searchBox = document.getElementById("search");
var listBox = document.getElementById("list-box");
var timer = null;
var key = searchBox.value;

// 點擊提示框中的選項，下放到下方課表中，需傳入參數依序為：課程名稱、教室、星期、開始節次、結束節次
//插入成功返回1，失敗返回0
function push_to_table(start, end, className, classLocation, classDay){
    console.log(start, end, className, classLocation, classDay);
    let startClass = start;
    let endClass = end;
    if(check(startClass, endClass, classDay))
    {
        let list = $("#accordion").get();
        var isUsed = JSON.parse(localStorage.used);
        var courses = JSON.parse(localStorage.courses);
        var elem = document.getElementById("default")
        if(list.length === 1 && elem)
            elem.parentNode.removeChild(elem);
        $('#accordion > tbody:last-child').append(`<tr><td class = 'td'>${className}</td><td class = 'td'>${classLocation}</td><td class = 'td'>${classDay} ${start} ~ ${end}</td><td class = 'td'><button type = "button" class = "btn-delete inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>刪除</button></td></tr>`);
        $("#accordion").show();
        courses.push({課程名稱: className, 上課教室: classLocation, 上課時間: {星期: classDay, 開始節次: start, 結束節次: end}});
        for(var i = startClass - 1; i < endClass; ++i)
            isUsed[CHINESE_WORD_TO_NUMBER[classDay] - 1][i] = true;
        localStorage.used = JSON.stringify(isUsed);
        localStorage.courses = JSON.stringify(courses);
        getCourse();
        return true;
    }
    return false;
}



function splittime(time){
    // 回傳值為二維陣列，為[][],內部陣列為[星期, 開始節次, 結束節次]
    let store = time.split(" ");
    store.splice(0,1);
    let arr = [];
    for(let i = 0; i < store.length; i++){
        let temp = [];
        let a = store[i].charAt(0);
        store[i] = store[i].slice(1);
        temp.push(a);
        store[i] = store[i].split(",");
        temp.push(store[i][0]);
        temp.push(store[i][store[i].length-1]);
        arr.push(temp);
    }
    return arr;
}

let dict = {};


function search(){
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        if(key != searchBox.value){
            key = searchBox.value;
            listBox.innerHTML = "";
            if(key != ""){
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/searchCourse?keyword=" + key.trim()); //app.js
                xhr.responseType='json';
                xhr.send();
                xhr.onload = ()=>{
                    let data = xhr.response;
                    // console.log(data)
                    for(var i = 0; i < data.length; i++){
                        if(data[i]==undefined)continue;
                        // 以在li上面顯示的字串為key，將資料存入dict
                        let displaystr = '[' + data[i].id + '] ' + data[i].class_name + ', ' + data[i].teacher + ', ' + data[i].class_time + ', ' + data[i].class_room;
                        // 用一個dict來存放顯示的字串與資料，以顯示的字串為key，資料為value
                        dict[displaystr] = data[i];
                        var li = document.createElement("li");
                        li.setAttribute("id",displaystr);
                        // li.setAttribute("onclick","click_hint(this)");
                        li.innerHTML = displaystr;
                        listBox.appendChild(li);
                        //為每個li以id加上相對應的click事件，用id去抓取對應的li，並將資料傳入push_to_table
                        let temp = document.getElementById(displaystr);
                        temp.addEventListener('click', () => {
                            // console.log(temp.id);
                            let i = 0;
                            let time = splittime(dict[temp.id].class_time)
                            for(let j = 0; j < time.length; j++){
                                // 若有衝堂，則不加入，這裡對於一個課程有多個時間的情況，只要有一個時間衝堂，就不加入，
                                // 不然若兩個時間都衝堂，會導致一個課程被加入兩次，會跳出兩次課程衝堂的警告
                                console.log(time[j][1], time[j][2], time[j][0]);
                                if(!check(time[j][1], time[j][2], time[j][0])) return;
                            }
                            for(let j = 0; j < time.length; j++)
                                if(!push_to_table(time[j][1], time[j][2], dict[temp.id].class_name, dict[temp.id].class_room, time[j][0])) break;
                            listBox.innerHTML = "";
                            searchBox.value = "";
                        });
                    }
                };
            }
        }
    }, 250);
}


searchBox.addEventListener('input', () => {
    search();
});

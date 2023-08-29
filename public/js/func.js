// import {redirectCancel} from "./newWebRedirect.js"
function block_capture() 
{
    html2canvas(document.getElementById("wrap")).then(function (canvas)
    {
        var a = document.createElement("a");
        a.href = canvas
            .toDataURL("image/jpeg", 1)
            .replace("image/jpeg", "image/octet-stream");
        a.download = "curriculum.jpg";
        a.click();
    });
}

function closeModal(modalId)
{
    var modal = document.getElementById(modalId)
    modal.classList.add('hidden');
    if(modalId == 'modal1'){
        redirectCancel();
    }
}

function collapse()
{
    var x = document.getElementById("mobile_menu");
    if(x.classList.contains("active"))
        x.classList.remove("active");
    else
        x.classList.add("active");
}

function courseCollapse()
{
    var x = document.getElementById("coll");
    if(x.classList.contains("active"))
        x.classList.remove("active");
    else
        x.classList.add("active");
}



let timer = null;
const redirect=()=>{
    timer = setTimeout(()=>{
        window.location.href = "/redirect/new";
        console.log("redirect")
    },9000);
};
const redirectCancel = ()=>{
    console.log("cancel redirect");
    clearTimeout(timer);
    timer = null;
}
redirect();


let button=document.querySelector("button");
let input=document.getElementById("input");
let haveTochange=document.getElementById("haveTochange");

function chnageText(){
    let value=input.value;
    haveTochange.innerText=value;
    input.value="";
}



button.addEventListener("click",chnageText);
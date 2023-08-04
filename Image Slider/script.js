const imgArray=["1","2","3","4","5","6"];

let buttons=document.querySelectorAll(".btn");
let imgContainer=document.querySelector(".img-container");
let count=0;
buttons.forEach((button)=>{
button.addEventListener("click",(e)=>{

    if(button.classList.contains("btn-left"))
    {
        count--;
        if(count<0)
        {
            count=imgArray.length-1;
        }
        imgContainer.style.background=`url("images/${imgArray[count]}.jpg")`;
    }else{
        count++;
        if(count>imgArray.length-1)
        {
            count=0;
        }
        imgContainer.style.background=`url("images/${imgArray[count]}.jpg")`;   
    }
})
})
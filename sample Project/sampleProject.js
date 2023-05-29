const acceptedButttons=document.getElementsByClassName("done");
const rejectedButons=document.getElementsByClassName("close");
const acceptedContainer=document.getElementById("accepted");
const rejectedContainer=document.getElementById("rejected");
function accepted(event){
    const buttonReference=event.target;
    const parentNode=buttonReference.parentNode.parentNode;
    acceptedContainer.append(parentNode);
    parentNode.children[1].remove();
}
function rejected(event){
    const buttonReference=event.target;
    const parentNode=buttonReference.parentNode.parentNode;
    rejectedContainer.append(parentNode);
    parentNode.children[1].remove();
    

}
for(let i=0;i<acceptedButttons.length;i++)
{
    acceptedButttons[i].addEventListener("click",accepted);
    rejectedButons[i].addEventListener("click",rejected); 
}
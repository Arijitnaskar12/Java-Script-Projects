let address=document.getElementById("address");
let container=document.getElementById("container");
let getData=document.getElementById("getData");
let cardsContainer=document.querySelector(".cardscontainer");
let ipAddress;
async function fetchingIp()
{
     let response= await fetch(`https://api.ipify.org/?format=json`);
    let data= await response.json();
    ipAddress=data.ip;
    address.innerText=ipAddress;
    getData.addEventListener("click",()=>{
    getData.style.display="none";
    fetching(ipAddress).then(()=>postalFetching());
    });
}
fetchingIp();
async function fetching(IP)
{
    let response=await fetch(`https://ipinfo.io/${IP}/geo/json?token=6ec335e9ea2c05`);
    let data= await response.json();
    localStorage.setItem('pincode',JSON.stringify(data.postal));
    appendUser(data);
}
function appendUser(arr){
    console.log(arr);
    let latLong=arr.loc.split(",");

        let innerCard=` <div class="det">
        <p>Lat:${latLong[0]}</p>
        <p>city:${arr.city}</p>
        <p>Organization:${arr.org}</p>
        </div>
        <div class="det">
        <p>Long:${latLong[1]}</p>
        <p>Region:${arr.region}</p>
        <p>HostName:ABC</p>
        </div>
        <iframe src="https://maps.google.com/maps?q=${latLong[0]}, ${latLong[1]}&output=embed" width="100%" height="300" frameborder="0" style="border:0"></iframe>
        <p>Time Zone:${arr.timezone}</p>
        <p>Date And Time:</p>
        <p>Pincode:${arr.postal}</p>
        <p>Message:<span id="numberOfpost"></span></p>
        <input type="text" placeholder="Filter" id="searchBar" oninput="Filter()">`;
        let generalInfo=document.createElement("div");
        generalInfo.innerHTML=innerCard;
        container.append(generalInfo);
}
async function postalFetching()
{

    let pin=JSON.parse(localStorage.getItem('pincode'));
    let response= await fetch(`https://api.postalpincode.in/pincode/700001`);
    let data= await response.json(); 
    postalAppend(data);
}
let postofficeArray=[];
 function postalAppend(data){
    console.log(data);
    let numberofPostOffice=document.getElementById("numberOfpost");
    numberofPostOffice.innerText=data[0].Message;
    postofficeArray=data[0].PostOffice;
    appendItem(data[0].PostOffice);
 }
 function appendItem(arr)
 {
    cardsContainer.innerHTML="";
    for(let i=0;i<arr.length;i++)
    {
        let temp=arr[i];
        let innerCard=`
         <div id="name">Name:${temp.Name}</div>
         <div id="BT">Branch Type:${temp.BranchType}</div>
         <div id="DS">Delivery Staus:${temp.DeliveryStatus}</div>
         <div id="district">District:${temp.District}</div>
         <div id="division">Division:${temp.Division}</div>`; 
     let cardContainer=document.createElement("div");
     cardContainer.className="cardcontainer";
     cardContainer.innerHTML=innerCard;
    cardsContainer.append(cardContainer);
    }
    container.append(cardsContainer);      
 }
 function Filter()
 {
    let tempArr=[];
    let input=event.target.value;
    for(let i=0;i<postofficeArray.length;i++)
    {
        if(postofficeArray[i].Name.includes(input.charAt(0).toUpperCase()+input.slice(1)) || postofficeArray[i].BranchType.includes(input.charAt(0).toUpperCase()+input.slice(1)))
        {
         tempArr.push(postofficeArray[i]);
        }
    }
    if(tempArr.length!=0)
    {
        appendItem(tempArr);
    }

 }
 


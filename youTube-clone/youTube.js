 let searchElement=document.getElementById("ipn");
const apiKey="AIzaSyApBnxlWUqbvqSF9OJCzu8LJNhdpJP0_Xo";
localStorage.setItem("api_Key",apiKey);

function searchVideos(){
    let searchValue=searchElement.value;
    // console.log(searchValue);
    // for search in youtube the api is-GET https://www.googleapis.com/youtube/v3/search
    fetchVideos(searchValue);

}
async function fetchVideos(searchValue){
    let endPoint=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${searchValue}&key=${apiKey}`;
    try{
       let response= await fetch(endPoint);
       let result=await response.json();
    //    console.log(result.items);
    for(let i=0;i<result.items.length;i++)
    {
        let video=result.items[i];
        // console.log(video.id.videoId);
        let videoStats=await fetchStats(video.id.videoId);
        // console.log(videoStats);
        if(videoStats.items.length>0)
        result.items[i].videoStats=videoStats.items[0].statistics;

    }
    // console.log(result.items);
    appendItems(result.items);
    }
    catch(error){
        console.log(error);
    }
}
async function fetchStats(videoId){
    let endpointResponse=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`);
    let result=await endpointResponse.json();
    return result;
}
function getViews(viewCount){
    if(viewCount<1000) return viewCount;
    else if (viewCount>=1000 && viewCount<=999999)
    {
        viewCount/=1000;
        viewCount=parseInt(viewCount);
        return viewCount+"K";
    }
    return parseInt(viewCount/1000000)+"M";
}
function appendItems(listItems){
    let containerElement=document.getElementById("container-main");
    containerElement.innerHTML=''; 
    for(let i=0;i<listItems.length;i++)
    {
        
        let videoItems=listItems[i];
        let imageItems=videoItems.snippet.thumbnails.high.url;
        let title=videoItems.snippet.title;
        let channelTitle=videoItems.snippet.channelTitle;
        let videoView=videoItems.videoStats?getViews(videoItems.videoStats.viewCount):"NA";
        
        let divElement=document.createElement("div");
        let imageElement=document.createElement("img");
        imageElement.src=imageItems;
        let titleElement=document.createElement("p");
        titleElement.innerText=title;
        let channelElement=document.createElement("p");
        channelElement.innerText=channelTitle;
        let viewElement=document.createElement("p");
        viewElement.innerText=videoView;
       
        divElement.append(imageElement);
        divElement.append(titleElement);
        divElement.append(channelElement);
        divElement.append(viewElement);

        divElement.addEventListener("click",()=>{
                    // console.log(videoItems.id.videoId);

            navigateToVideo(videoItems.id.videoId);
        });
        containerElement.append(divElement);                       
    }
}
function navigateToVideo(videoId)
{
    // console.log(videoId);
    let path=`/`;
    if(videoId) 
    {
        console.log(videoId);
        document.cookie=`video_Id=${videoId}; path=${path}`;
        let linkItems=document.createElement("a");
        linkItems.target="_blank";
        linkItems.href=`http://127.0.0.1:5500/javascript%20basics/youTube-clone/video.html`;
        
        linkItems.click();
        
    }else{
        alert("Go and Watch on youtube");
    }
}
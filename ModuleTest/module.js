// EVERYTHING PRINTED ON CONSOLE
let listItems=document.getElementById("list-items");
let temp=[];
 async function getMenu(){
    try{
        let response= await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`);
        let showMenu= await response.json();
            temp=showMenu;
            // console.log(temp);
        appendItems(showMenu);
        
    }catch(error)
  {
    console.log(error);
  }
    
}
function appendItems(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        let items=arr[i];
        let imgEle=document.createElement("img");
        imgEle.src=items.imgSrc;
        let idSpan=document.createElement("div");
        idSpan.innerText=items.id;
        let nameEle=document.createElement("div");
        nameEle.innerText=items.name;
        let priceEle=document.createElement("div");
        priceEle.innerText=items.price;
        // console.log(items.price);
        // let buttonDiv=document.createElement("div");
        // let button=document.createElement("button");
        // button.id="btn";
        // button.innerText="Add to cart";
        // buttonDiv.append(button);
        let divElement=document.createElement("div");
        divElement.id="card";
        divElement.append(idSpan)
        divElement.append(imgEle)
        divElement.append(nameEle);
        divElement.append(priceEle);
        // divElement.append(buttonDiv)
        listItems.append(divElement);
    }
}
function TakeOrder(){
        try{
            let prom1=new Promise((resolve,reject)=>{
                // console.log("before");
                let order={};
                for(let i=0;i<3;i++)
                {
                    let index=Math.floor(Math.random()*(temp.length-1));
                    order[temp[index].id]=temp[index].name;
                }
                setTimeout(function () {
                    resolve(order);
                   },2500);
                //    console.log("after");
            });
            return prom1;
        }catch(error)
        {
            console.log(error);
        }
   
   
}
function orderPrep(order){
    try{
        let prom2=new Promise((resolve,reject)=>{
          
            setTimeout(()=>{
                resolve(order);
            },1500);
            order["order_status"]=true;
            order["paid"]=false;
        })
        return prom2;
    }catch(error)
    {
        console.log(error);
    }

}
function payOrder(order){
    try{
        let prom3=new Promise((resolve,reject)=>{
          
            setTimeout(()=>{
                resolve(order);
            },1000);
            order["order_status"]=true;
            order["paid"]=true;
        })
        return prom3;
        }catch(error)
        {
            console.log(error);
        }
    }
   
    function thankyouFnc(order)
    {
        if(order.paid==true) alert("Thank you for eating with us today");
        else alert("Order is not Booked");
    }

let x=getMenu();
let y=x.then(TakeOrder);
let z=y.then((selectedItems)=>{
    console.log(selectedItems);
   return  orderPrep(selectedItems);
});
y.catch(()=>{
alert("Something wrong in takeOrder section");
})
let t=z.then((order)=>{
    console.log(order);
   return  payOrder(order);
})
z.catch(()=>{
    alert("Something wrong in OrderPrep Section")
})
let u=t.then((order)=>{
console.log(order);
 thankyouFnc(order);
});
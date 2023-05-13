/** @format */

let arr = [
  { id: 1, name: "john", age: "18", marks: 80 },
  { id: 2, name: "jack", age: "20", marks: 85 },
  { id: 3, name: "karen", age: "19", marks: 35 },
];

function PrintStudentswithMap() {
  //Write your code here , just console.log
  
}

function PrintStudentsbyForEach() {
  //Write your code here , just console.log
  let output=arr.forEach(function(element,index,list)
                {
    if(arr.marks>50)
    {
      console.log(element,index,list);
    }
  });
  
}

function addData() {
  //Write your code here, just console.log
  arr.push({id:4,name:"susan",age:"20",marks:45});
  console.log(arr);
}

function removeFailedStudent() {
  //Write your code here, just console.log
  for(let i=0;i<arr.length;i++){
  if(arr[i].marks<50){
    arr.pop();
  }
  }
 console.log(arr);
}

function concatenateArray() {
  //Write your code here, just console.log
let another=[
  {id:5,name:"Arijit",age:24,marks:50}
] ;
 let array3= arr.concat(another);
  console.log(array3);
}

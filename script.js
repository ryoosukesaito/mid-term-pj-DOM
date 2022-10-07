// var heart = document.getElementById("heart");

// function toggle(){
//   if(heart.classList.contains("far")){
//     heart.classList.remove("far");
//     heart.classList.add("fas");
//   }else{
//     heart.classList.remove("fas");
//     heart.classList.add("far"); 
//   }
// };


var btn1 = document.getElementById("btn1");

btn1.addEventListener('click',
  function toggle(){
      if(btn1.classList.contains("far")){
          btn1.classList.remove("far");
          btn1.classList.add("fas"); 
      }else{
          btn1.classList.remove("fas");
          btn1.classList.add("far");
      }
    }
);


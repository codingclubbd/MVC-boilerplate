


function passwordTogglerFunc (trigger, passwordEl){

  trigger.addEventListener('click', (e)=>{
    const value = trigger.textContent;
    if(value === "visibility"){
      trigger.textContent = "visibility_off"; 
      passwordEl.type = 'text';
  
    }else{
      trigger.textContent = "visibility"; 
      passwordEl.type = 'password';
  
    }
    
  })
}
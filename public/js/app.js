// const e = require("express");
// const { response } = require("express");

console.log('Client side js file is loaded')
    
    const weatherForm=document.querySelector('form')
    const search = document.querySelector('input')
    const messageOne=document.querySelector('#message-1')
    const messageTwo=document.querySelector('#message-2')



    weatherForm.addEventListener('submit',(e)=>{
        messageOne.textContent='Loading...'
        messageTwo.textContent=''
        e.preventDefault()
        const location = search.value;
        const url='/weather?address='+location;
        fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = 'Location:'+ data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    })




    
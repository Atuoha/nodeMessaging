let socket = io()
$(document).ready( ()=>{
    getMessage();


    $('form').submit(function(e){
        e.preventDefault()
        console.log(e)
        let data = $(this).serialize();

        let msg = $('#msg').val()
        let name = $('#name').val()

        if(msg !== '' && name != ''){
            console.log(data)
            postMessage(data)  
            $('form').trigger("reset");
        }else{
            error_alert()
            console.log('Empty')
        }

    })

    function getMessage(){

        
        $.ajax({
            url: '/message',
            type: 'GET',
            cache: false,
            success: (data=>{
                if(!data.error){
                    console.log(data)
                     data.forEach(record=>{
                         console.log(record)
                         displayMessage(record)
                     })
                }
            })
        })
    }

    
    function postMessage(data){
        $.ajax({
            url: '/create_msg',
            type: 'POST',
            data: data,
            cache: false,
            success: (message=>{
                if(!message.error){
                    $('.chat-wrapper').html('')
                    getMessage();
                }
            })
        })
    }
 

    function displayMessage(message){

        let response = 
            `
            <div class="chat-message right" style="float:right;background-color:#1e88e5;color:white;">
                <img class="rounded-circle" width="30" src="/uploads/default.png"alt="img">    
                <b>You:</b> <span class="msg">${message.message}</span> <br> 
                <span class="text-small" style="float:right"><sub>2 mins ago</sub></span>
                </div>

                <div class="chat-message" style="background-color:white">
                    <img class="rounded-circle" width="30" src="/uploads/profiles.png"alt="img">    
                    <b>${message.name}:</b> <span class="white-text">Message received successfully :)</span><br>
                    <span class="text-small" style="float:right"><sub>1 min ago</sub></span>
                </div> 
            `          
            $('.chat-wrapper').append(response)
    }

})

socket.on('message', 'addMessage')    

function error_alert(){
    let error = $('.error')
    error.fadeIn('slow')
    error.attr('class', 'alert alert-danger error');
    error.html('Inputs are not meant to be empty!')
    
    setTimeout( ()=>{
        clear_error()
    }, 3000)
}

function clear_error(){
    let error_content = $('.alert')
    if(error_content){
        error_content.fadeOut('slow')
    }
    
}



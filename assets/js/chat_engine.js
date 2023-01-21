class chatEngine{

    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        // console.log(this.userEmail)
        
        // sending or emit the connect request 
      
        this.socket = io("http://localhost:5000");
        

        if(this.userEmail){
            // console.log(this.socket)
            this.connectionHandle()
        }
    }

    // connection handler
    connectionHandle(){

        let self = this;


        self.socket.on('connect',function(){
            console.log('Connection established using socket...!');

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Project',
            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })

        });

        //  send a message on clicking send button
        $('#send-message').click(function(e){
            console.log($('#chat-message-input').val())
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'Project'
                });
            }
        });

        self.socket.on('recieve_message',function(data){
            console.log('message recieved',data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));
            newMessage.append($('sub',{
                'html':data.user_email
            }));
            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        });
    }
}
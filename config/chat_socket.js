module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors: {
          origin: "http://44.201.218.93/:8000",
          methods: ["GET", "POST"]
        }
      });
    
    // console.log(socketServer)

    // recieve the connection send by client and emit back to the client to the clienthandler
    
    io.on('connection',function(socket){
        console.log('new connection recieved',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected !')
        });
        socket.on('join_room',function(data){
            console.log('joining request rec',data);
            socket.join(data.chatroom);
            
            io.in(data.chatroom).emit('user_joined',data);
        });
        socket.on('send_message',function(data){
            console.log(data);
            io.in(data.chatroom).emit('recieve_message',data);
        });
    });
}
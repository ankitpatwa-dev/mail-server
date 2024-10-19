const SMTPServer = require("smtp-server").SMTPServer;


const server = new SMTPServer({
    allowInsecureAuth : true,
    authOptional : true,
    onConnect(session, cb) {
        /*
        // this reject the connection
        // cb(new Error('Cannot Accept the Connection'))

        // this accept the Connection
        // cb()
        */

        console.log(`onConnect`, session.id);
        cb()


    },
    onMailFrom(address, session, cb) {
        console.log('onMailFrom', address.address, session.id);
        cb()
    },
    onRcptTo(address, session, cb){
        console.log(`onRcptTo`, address, address.address, session.id)
        cb()
    },
    onData(stream, session, cb){
        stream.on(`data`, (data)=>console.log(`data -> ${data.toString()}`))
        cb(null); 
        stream.on('end',cb)

    }
});


server.on("error", (err) => {
    console.log("Error %s", err.message);
  });


server.listen(25, () => console.log('Server Running on 25'))
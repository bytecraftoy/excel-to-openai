const msg=require("./program/message.js");

const client = ({xlsx:require("xlsx"),appData:require("./program/data.js")});
commands=new Map();
message = '';

//console.log(client)

//Load Handlers
['commandHandler'].forEach(handler => {
    console.log('\x1b[35m%s\x1b[0m',`loading ${handler}`);
    require(`./program/${handler}`)(commands);
})

console.log('\x1b[36m%s\x1b[0m',`\n${client.appData.mainMenu}`);

// On input start Message Handler
process.stdin.on('data', function(data) {
    message = data.toString().replace(/\r?\n|\r/g, "");
    if(message=="exit"){console.log("exiting");process.exit();}
    msg.messageHandler(client, commands, message);
    console.log('\x1b[35m%s\x1b[0m',`done ${message}`);
})
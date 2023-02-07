//const msg=require("./program/message.js");

require('dotenv').config();
const client = ({xlsx:require("xlsx"),appData:require("./program/data.js"),common:require("./program/common.js"),msgh:require("./program/message.js")});
client.commands=new Map();
message = '';

console.log('\nstarting\n');
//Load Handlers
['commandHandler'].forEach(handler => {
    client.common.log(`loading ${handler}`);
    require(`./program/${handler}`)(client.commands);
})

console.log('\x1b[36m%s\x1b[0m',`\n${client.appData.mainMenu}\n`);

// On input start Message Handler
process.stdin.on('data', async function(data) {
    message = data.toString().replace(/\r?\n|\r/g, "");
    if(message=="exit"){console.log("exiting");process.exit();}
    await client.msgh.messageHandler(client, message);
    client.common.log(`\n"${message}" done\n`);
})
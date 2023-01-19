module.exports.messageHandler = function messageHandler(client, commands, message){
    console.log('\x1b[35m%s\x1b[0m','message recieved');
    
    if(!message)return;

    const args = message.split(/ +/);
    const cmd = args[0];

    //console.log(`cdm ${cmd} args ${args}`)
    //console.log(args);
    
    var command = [];

    // Find command to execute
    commands.forEach(a => {
        console.log(`${a.name}`);
        if(a.name==cmd){
            //console.log('NAME FOUND!')
            return command=commands.get(a.name);
        }
        else { a.aliases.forEach(b => {
            if(b==cmd){
                return command=commands.get(a.name);
            }
        });}
        //console.log(`done with ${a.name}`);
    });

    //console.log(command);

    // check if command is loaded and execute it
    if (command.name) {
        try {
            console.log('\x1b[35m%s\x1b[0m',`executing ${command.name}`);
            command.execute(client, message, args, commands);
        } catch (err) {
            return console.log('\x1b[31m%s\x1b[0m',`-!! Failed to execute ${command.name}, with args ${args}, ${err}, message sent ${message}`);
        } finally { return }
    } else {
        return console.log('\x1b[33m%s\x1b[0m',`-! The command ${cmd} could not be found`);
    }
}
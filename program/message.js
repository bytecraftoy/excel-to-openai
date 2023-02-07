module.exports.messageHandler = function messageHandler(client, message){
    client.common.log('message recieved');
    
    if(!message)return;

    const args = message.split(/ +/);
    const cmd = args[0];
    var command = [];

    // Find command to execute
    client.commands.forEach(a => {
        client.common.log(`${a.name}`);
        if(a.name==cmd){
            return command=client.commands.get(a.name);
        }
        else { a.aliases.forEach(b => {
            if(b==cmd){
                return command=client.commands.get(a.name);
            }
        });}
    });

    // check if command is loaded and execute it
    if (!command.name) return client.common.warn(`-! The command ${cmd} could not be found`);
    if (!command.enabled) return client.common.warn(`${command.name} disabled`);
    try {
        client.common.log(`executing ${command.name}`);
        command.execute(client, message, args);
    } catch (err) {
        return client.common.error(`-!! Failed to execute ${command.name}, with args ${args}, ${err}, message sent ${message}`);
    } finally { return }
}
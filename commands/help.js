module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'shows all commands and their description',
    example: 'help',
    enabled: true,
    execute(client, message, args) {
        client.common.userLog(`\nhelp menu\n---------`);
        client.commands.forEach(a => {
            if(a.enabled) client.common.userLog(`${a.name} - ${a.description} - aliases [${a.aliases}] \nexample: "${a.example}"`);
        });
        client.common.userLog('------------------\nuse "exit" to quit');
        client.common.userLog('------------------\nCyan colored text is meant for the user');
        client.common.log('Purple is to show whats done'); //purple
        client.common.error('Red is for errors'); //red
        client.common.warn('Yellow is for warnings'); //yellow
    
    }
}
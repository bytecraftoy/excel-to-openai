module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'shows all commands and their description',
    example: 'help',
    execute(client, message, args, commands) {
        console.log('\x1b[36m%s\x1b[0m',`\nhelp menu\n---------`);
        commands.forEach(a => {
            console.log('\x1b[36m%s\x1b[0m',`${a.name} - ${a.description} - aliases [${a.aliases}] - example: "${a.example}"`);
        });
        console.log('use "exit" to quit');
    }
}
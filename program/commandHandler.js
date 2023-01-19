const fs = require('fs');

module.exports = (commands) => {
    console.log('\x1b[35m%s\x1b[0m','--- COMMAND - HANDLER - STARTED ---');
    const command_files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

    for (const file of command_files) {
        try {
            const command = require(`../commands/${file}`);
            if (command.name) {
                commands.set(command.name, command);
                console.log('\x1b[35m%s\x1b[0m',`loaded command ${command.name}`);
            } else {
                console.log('\x1b[33m%s\x1b[0m',`-! ${file} was not loaded`);
            }
        } catch (err) {                
            console.log('\x1b[31m%s\x1b[0m',`-!! Failed to load ${file}, reason ${err}`);
        }
    }
    console.log('\x1b[35m%s\x1b[0m',`-- Commands loaded --`);
}
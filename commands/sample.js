module.exports = {
    name: 'sample',
    aliases: ['spl'],
    description: 'sample command',
    example: 'sample samplearg',
    execute(client, message, args, commands) {
        console.log('\x1b[36m%s\x1b[0m','hello world');
    }
}
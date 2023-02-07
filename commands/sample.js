module.exports = {
    name: 'sample',
    aliases: ['spl'],
    description: 'sample command',
    example: 'sample samplearg',
    enabled: false,
    execute(client, message, args) {
        client.common.userLog('hello world'); //Cyan
        client.common.log('hello world'); //purple
        client.common.error('hello world'); //red
        client.common.warn('hello world'); //yellow
    }
}
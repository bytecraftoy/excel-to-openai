module.exports = {
    async sleep(ms){
        await new Promise(resolve => setTimeout(resolve, ms));
    },
    userLog(text){
        console.log('\x1b[36m%s\x1b[0m',`${text}`)
    },
    log(text){
        console.log('\x1b[35m%s\x1b[0m',`${text}`)
    },
    warn(text){
        console.log('\x1b[33m%s\x1b[0m',`${text}`)
    },
    error(text){
        console.log('\x1b[31m%s\x1b[0m',`${text}`)
    }
}
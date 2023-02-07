const { exec } = require('child_process');
const fs = require('fs');
const { finished } = require('stream');
const apirequest = require('./apirequest');
module.exports = {
    name: 'request',
    aliases: ['r'],
    description: 'sends api requst of selected excel file',
    example: 'request [path to location] [-s] [name of save file] [empty = no API request]',
    enabled: true,
    async execute(client, message, args) {
        /* Checking input */
        margs = '';
        if (!args[1]) return client.common.warn('no file given');
        if (args[1].startsWith('.')) fn => {
            while (args[1].startsWith('.')) {
                margs = args[1].slice(1);
            }
        };
        fileName = margs.replace('.', ' ').split(' ');
        if (!fileName[1]) { args[1] = `${args[1]}.xlsx`; client.common.log('no file extension given, using .xlsx'); client.common.log(args[1]); }
        if (!args[1].endsWith(`.xlsx`)) return client.common.warn("not an excel file");

        /* Checking file location */
        fileName = args[1].split('/');
        if (fileName[1]) {
            if (!fs.existsSync(`${args[1]}`)) return client.common.warn(`could not find excel file in "${args[1]}"`);
            msend = `${args[1]}`;
        } else {
            if (!fs.existsSync(`./1_EXCEL_FILES/${args[1]}`)) return client.common.warn(`could not find excel file in "./1_EXCEL_FILES/${args[1]}"`);
            msend = `./1_EXCEL_FILES/${args[1]}`;
        }
        client.common.log('File found');
        client.common.log(`executing read with ${msend}`);

        /* Opening and sending file */
        ans = await client.commands.get('read').execute(client, null, msend);
        if (!ans) return client.common.error("No data recieved");

        /* Request and recieve */
        loadval = 0;
        dataval = 0;
        arrayval = 0;
        hval = [];
        headers = [];
        sendData = [];
        rerror=false;
        ans.forEach(a => {
            a.data.forEach(d => {
                if (!d[0]) return client.common.error(`cannot read line with values "${d}" from ${ans[arrayval].name} on line ${loadval + 1}`); rerror=true;
                if (loadval != 0) {
                    dataval++;
                    /* Data for API REQUEST*/
                    sendData[dataval - 1] = d[0];
                } else { headers[arrayval] = d[0]; }
                loadval++;
            });
            if (!(loadval <= 1)){hval[arrayval] = loadval - 1; arrayval++;}
            loadval = 0;
        });
        dataout = [];
        const exec = client.commands.get('apirequest').execute;
        client.common.warn('STILL IN PROGRESS\nWAIT FOR SAVE CONFIRMATION')
        exec(client, hval, headers, sendData, dataval, function (resp) {
            loadval = 0;
            resp.forEach(a => {
                a = a.replace(/\\n/g, ' / ');
                a = a.replace(/"/g, '')
                resp[loadval] = a;
                loadval++;
            })
            dataval = 0; arrayval = 0; loadval = 0;
            ans.forEach(a => {
                a.data.forEach(d => {
                    if (!d[0]) return client.common.warn(`skipping data write on ${ans[arrayval].name} line ${loadval + 1}`);
                    if (loadval != 0) {
                        d[1] = resp[dataval - 1];
                        ans[arrayval].data[loadval] = d;
                    }
                    loadval++;
                    dataval++;
                });
                arrayval++;
                loadval = 0;
            });
            save();
        });
        

        function save() {
            /* Saving file */
            client.common.log('saving');
            if (!args[2]) args[2] = 'out';
            savelocation = args[2];
            response = client.commands.get('save').execute(client, savelocation, ans);
            client.common.log(response);
            return;
        }
    }
}
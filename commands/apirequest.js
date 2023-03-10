const https = require('node:https');
module.exports = {
    name: 'apirequest',
    aliases: ['apir'],
    description: 'sample command',
    example: 'sample samplearg',
    enabled: false,
    execute(client, hval, headers, sendData, ammount, callback) {
        loadval1 = 0;
        loadval2 = 0;
        loadval3 = 0;
        loadval4 = 0;
        let dataout = [];

        apir();

        function apir() {
            d = sendData[loadval4]
            header = headers[loadval2];
            const data = JSON.stringify({
                "id": process.env.APIID,
                "contexts": [`${header}`],
                "prompt": `${d}`
            })
            options = {
                hostname: process.env.APIHOSTNAME,
                path: process.env.APIPATH,
                method: 'POST',
                headers: {
                    'Authorization': process.env.APIAUTH,
                    'Content-Length': data.length,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            try {
                https.request(options, (res) => {
                    let resdata = "";
                    let err = false;
                    res.on('data', (rd) => {
                        resdata += rd;
                    })
                    res.on('end', () => {
                        if (res.statusCode >= 400) {
                            err = true;
                            dataout[loadval1] = `error: ${res.statusCode}`;
                            client.common.error(`error code ${res.statusCode}`)
                        }
                        if (!err) {
                            parsedData = JSON.parse(resdata);
                            stringedData = JSON.stringify(parsedData.result);
                            dataout[loadval1] = stringedData;
                        }
                        apic();
                    })
                    res.on('error', (e) => {
                        client.common.error(`api request error: ${e}`);
                        dataout[loadval1] = `error: ${e}`;
                        apic();
                    })
                })
                    .write(data);
            } catch (e) {
                client.common.error(`api request error: ${e}`);
                dataout[loadval1] = `error: ${e}`;
                apic();
            }
        }
        function apic() {
            loadval1++;
            client.common.log(`completed ${loadval1} of ${ammount}`);
            if (loadval1 == ammount) {
                callback(dataout);
            } else {
                loadval3++; loadval4++;
                if (loadval3 == hval[loadval2]) { loadval3 = 0; loadval2++; }
                apir();
            }
        }
    }
}
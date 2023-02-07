module.exports = {
    name: 'read',
    aliases: ['re'],
    description: 'read command used by request command',
    example: '',
    enabled: false,
    execute(client, message, args) {
        excelData = client.xlsx.readFile(args);
        sheets=Object.keys(excelData.Sheets).map((name) => ({
            name,
            data: client.xlsx.utils.sheet_to_json(excelData.Sheets[name], {header: 1} ),
        }));;
        return sheets;
    }
}
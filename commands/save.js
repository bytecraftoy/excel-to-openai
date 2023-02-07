module.exports = {
    name: 'save',
    aliases: ['sa'],
    description: 'used by request command',
    example: '',
    enabled: false,
    execute(client, fl, data) {
        names = [];
        sheet = [];
        loadval=0;
        
        /* Assign sheet data */
        data.forEach(a => {
            sheet[a.name] = client.xlsx.utils.aoa_to_sheet(a.data);
            names[loadval]=a.name;
            loadval++;
        });
        
        wb = client.xlsx.utils.book_new();
        wb.SheetNames = names;
        wb.Sheets = sheet;

        filename='';
        args = fl.replace(/\\/g, '/').split('/');

        if(!args[1]){
            if(!fl.endsWith('.xlsx')){ filename = `./1_EXCEL_FILES/${fl}.xlsx`;
            }else{ filename = `./1_EXCEL_FILES/${fl}`;}
        } else {
            if(!fl.endsWith('.xlsx')){ filename = `${fl}.xlsx`;
            }else{ filename = fl; }
        }

        client.xlsx.writeFile(wb, filename);
        return 'Successfully saved';
    }
}
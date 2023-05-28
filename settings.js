const fs = require('fs')

global.creator = 'eabdalmufid'  //Isi creator 
global.MONGO_DB_URI = ""        //Isi Database Mongodb
global.ACTIVATION_TOKEN_SECRET = "-@Pqnap+@(/1jAPPnew/@10" //Isi apa aja bebas
global.your_email = ""          //Isi Email Untuk Pengiriman Kode
global.email_password = ""      //Isi Aplikasi Sandi Email Pengeriman Kode
global.limitCount = 100
global.YUOR_PORT = 8000
global.loghandler = {
    noapikey: {
        status: 403,
        message: 'Input parameter apikey',
        creator: `${creator}`,
        result: "error"
    },
    error: {
        status: 503,
        message: 'Service Unavaible, Sedang dalam perbaikan',
        creator: `${creator}`
    },
    apikey: {
        status: 403,
        message: 'Forbiden, Invalid apikey',
        creator: `${creator}`
    },
    noturl: {
        status: 403,
        message: 'Forbiden, Invlid url, masukkan parameter url',
        creator: `${creator}`,
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update'${__filename}'`)
    delete require.cache[file]
    require(file)
})

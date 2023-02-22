const fs = require('fs')

global.creator = 'ABDUL MUFID' 
global.apikey = ['ordiston']
global.lolkey = "SGWN"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
	delete require.cache[file]
	require(file)
})

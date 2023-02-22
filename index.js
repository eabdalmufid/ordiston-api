__path = process.cwd()

var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 3000 || 80
const username = "cecilialucia";
const password = "-xylaa123";
const cluster = "cluster0.yu1qcvl";
var { color } = require('./lib/color.js')
var mongoose = require('mongoose')
var apirouter = require('./routes/api')
var mainrouter = require('./routes/main')
var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("assets"))

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
  }
);
const visitorSchema = new mongoose.Schema({
	name: String,
	count: Number
})
const Visitor = mongoose.model("Visitor",visitorSchema)
app.get('/count', async function(req,res){
	let visitors = await Visitor.findOne({name: 'ordiston-rest-apis'})
	if(visitors == null) {
		const beginCount = new Visitor({
			name : 'ordiston-rest-apis',
			count : 1
		})
		beginCount.save()
		res.json({
			value: '1'
			})
	} else {
		visitors.count += 1;
		visitors.save()
		res.json({
			value: visitors.count
			})
	}
})

app.get('/', (req, res) => {
    res.sendFile(__path + '/docs/home.html')
})
app.get('/docs', (req, res) => {
    res.sendFile(__path + '/docs/index.html')
})

app.use('/api', apirouter)
app.use("/", mainrouter)

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app
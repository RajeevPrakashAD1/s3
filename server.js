const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

var cors = require('cors');
const multer = require('multer');
const { uploadFile } = require('./s3');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads');
	},
	filename: function(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = file.mimetype.split('/')[1];
		cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
	}
});

const upload = multer({ storage: storage });

app.post('/image', upload.single('image'), async (req, res) => {
	console.log(req.file);
	console.log(req.body);
	try {
		const result = await uploadFile(req.file);
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
});

app.listen(5000, function() {
	console.log('Server started on port 5000');
});

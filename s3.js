require('dotenv').config();
const fs = require('fs');
// import entire

var AWS = require('aws-sdk');
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');

const akid = process.env.ACCESS_KEY_ID;
const sak = process.env.SECRET_ACCESS_KEY;
const bname = process.env.AWS_BUCKET_NAME;
const bregion = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
	accessKeyId: akid,
	secretAccessKey: sak,
	region: bregion
});

function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bname,
		Body: fileStream,
		Key: file.filename
	};

	return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

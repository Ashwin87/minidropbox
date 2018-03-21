'use strict';
const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.upload = (event, context, callback) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const name = record.eventName
    const time = record.eventTime

    const params = {
      TableName: 'dropbox',
      Item: {
        id: uuid.v1(),
        fileName: filename,
            Type: name,
            Time: time
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("files inserted")
    })

});
};
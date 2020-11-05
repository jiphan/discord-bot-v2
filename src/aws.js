const AWS = require('aws-sdk')
const keys = require('./keys.json')

AWS.config.credentials = new AWS.Credentials(keys.AWSAccessKeyId, keys.AWSSecretKey)
AWS.config.update({ region: 'us-east-2' })

function awsGet(table, key, callback) {
    var params = {
        TableName: table,
        Key: {
            'ascension': key
        }
    }
    new AWS.DynamoDB.DocumentClient().get(params, (err, data) => {
        if (err) {
            console.error('Error:',JSON.stringify(err, null, 2))
        } else {
            // console.log('Success:', JSON.stringify(data, null, 2))
            callback(data)
        }
    })
}
module.exports = {
    awsGet
}
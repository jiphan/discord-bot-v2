const AWS = require('aws-sdk')
const keys = require('./keys.json')

AWS.config.credentials = new AWS.Credentials(keys.AWSAccessKeyId, keys.AWSSecretKey)
AWS.config.update({ region: 'us-east-2' })

async function awsGet(table, key) {
    return await new AWS.DynamoDB.DocumentClient().get({
        TableName: table,
        Key: {
            'ascension': key
        }
    }).promise()
}

async function awsPut(table, i) {
    return await new AWS.DynamoDB.DocumentClient().put({
        TableName: table,
        Item: i
    }).promise()
}

async function awsCreate(table, key, type) {
    return await new AWS.DynamoDB().createTable({
        TableName: table,
        KeySchema: [
            { AttributeName: key, KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: key, AttributeType: type }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }).promise()
}

async function awsScanBetween(table, key, start, end, val) {
    return await new AWS.DynamoDB.DocumentClient().scan({
        TableName: table,
        ProjectionExpression: val,
        FilterExpression: '#a between :start and :end',
        ExpressionAttributeNames: {
            '#a': key
        },
        ExpressionAttributeValues: {
            ':start': start,
            ':end': end
        }
    }).promise()
}

module.exports = {
    awsGet,
    awsPut,
    awsCreate,
    awsScanBetween
}
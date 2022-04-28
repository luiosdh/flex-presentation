const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = 'participants';

exports.handler = (event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    addConnection(connectionId).then(() => {
        callback(null, { statusCode: 200 });
    });
};

function addConnection(connectionId) {
    return ddb
        .put({
            TableName: tableName,
            Item: {
                connectionId: connectionId,
            },
        })
        .promise();
}

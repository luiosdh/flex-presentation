const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = 'participants';

exports.handler = (event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    deleteConnectionId(connectionId).then(() => {
        callback(null, { statusCode: 200 });
    });
};

function deleteConnectionId(connectionId) {
    return ddb
        .delete({
            TableName: tableName,
            Key: {
                connectionId: connectionId,
            },
        })
        .promise();
}

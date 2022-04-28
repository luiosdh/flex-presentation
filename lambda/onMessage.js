const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

let apiGatewayManagementApi;
const tableName = 'participants';
const apiVersion = '2018-11-29';

exports.handler = async (event, context, callback) => {
    initApiGatewayManagementApi(event);
    await storeInDb(event);
    const connections = await getConnections();
    connections.Items.forEach(async function (connection) {
        await send(connection.connectionId, event);
    });
    callback(null, { statusCode: 200 });
};

function initApiGatewayManagementApi(event) {
    apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion,
        endpoint:
            event.requestContext.domainName + '/' + event.requestContext.stage,
    });
}

function storeInDb(event) {
    return ddb
        .put({
            TableName: tableName,
            Item: {
                connectionId: event.requestContext.connectionId,
                name: JSON.parse(event.body).name,
                task: JSON.parse(event.body).task,
            },
        })
        .promise();
}

function getConnections() {
    return ddb.scan({ TableName: tableName }).promise();
}

async function send(connectionId, event) {
    if (apiGatewayManagementApi) {
        await apiGatewayManagementApi
            .postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify({
                    info: {
                        connectionId: event.requestContext.connectionId,
                        name: JSON.parse(event.body).name,
                        task: JSON.parse(event.body).task,
                    },
                }),
            })
            .promise();
    }
}

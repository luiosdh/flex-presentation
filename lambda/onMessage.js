const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

let apiGatewayManagementApi;
const tableName = 'participants';
const apiVersion = '2018-11-29';

function initApiGatewayManagementApi(event) {
    apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion,
        endpoint:
            event.requestContext.domainName + '/' + event.requestContext.stage,
    });
}

function setName(event) {
    return ddb
        .put({
            TableName: tableName,
            Item: {
                connectionId: event.requestContext.connectionId,
                name: JSON.parse(event.body).name,
            },
        })
        .promise();
}

function getConnections() {
    return ddb.scan({ TableName: tableName }).promise();
}

async function send(connectionId, data) {
    if (apiGatewayManagementApi) {
        await apiGatewayManagementApi
            .postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify({
                    type: 'names',
                    names: data.Items.map((item) => item.name),
                }),
            })
            .promise();
    }
}

exports.handler = async (event, context, callback) => {
    console.log(event);
    initApiGatewayManagementApi(event);
    await setName(event);
    const data = await getConnections();
    data.Items.forEach(async function (connection) {
        await send(connection.connectionId, data);
    });
    callback(null, { statusCode: 200 });
};

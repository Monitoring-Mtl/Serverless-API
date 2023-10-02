import serverless from 'serverless-http';
import { config } from 'dotenv'
import express from 'express';
import axios from 'axios';
import { ListTablesCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

const app = express();
const basePath = '/api/v1'

// Create an instance of express.Router for your base path
const router = express.Router();

// Load environment variables from the .env file in the current directory
config();

// Get the API_URL and API_KEY from the environment variables
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

if (!apiUrl || !apiKey) {
    console.error('API_URL and API_KEY are required in the .env file.');
    process.exit(1);
}

// Create an Axios instance with the custom headers
const axiosInstance = axios.create({
    headers: {
        'apiKey': apiKey,
    },
});

router.get("/vehiclePosition", async (req, res, next) => {

    let response;

    try {

        const stmRes = await axiosInstance.get(apiUrl, { responseType: 'arraybuffer' });
        // Load the Protocol Buffer definition (you may need to adjust the path)
        // const root = await protobuf.load('./gtfs-realtime.proto');

        // // Parse the binary response using the Protocol Buffer definition
        // const message = root.lookupType('VehiclePosition'); // Replace with the actual message type
        const decodedData = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(stmRes.data));

        response = res.status(200).json({
            body: decodedData,
        });

    } catch (err) {
        // Error handling
        response = res.status(409).json({
            body: JSON.stringify({
                message: 'Error fetching STM data:' + err,
            })
        })
    }

    return response
});

router.get("/bixies", async (req, res, next) => {

    const dbClient = new DynamoDBClient({
        region: 'us-east-1',
        accesKeyId: 'ASIAY7RYVV4BSR5LNYPC',
        secretAccessKey: 'BSLvta+6jMz1mQQTLTCihJU5yUZmQO9uMwbhJDpo',
        sessionToken: 'FwoGZXIvYXdzECMaDLRD9wUz5IDJeH30vyLUAXcYC+5VU0Tmuc4C8+/BoLAkGmR3lBi89NJ83XJr0g/oFv2ysUXK/YxpXryycivyAgngPY06UQ7oyWRjV+bR1M2XLlPtpeaGty2NaN25Fi2sEb6dAEiWs8n0yQAkLH9GPIBQGz42osqgwE9nynVeJjuy9YlCtahA6hL848h7+GF+sPq7BA+OroHJV6dgGCXtO7IDT6CRuka1EG24168cGLV7NmfASWxVfFnFu5SOHhFJX+nVINrrpRH8Jg2NreNqW4rINefe3xgtsNvLMAZ2VltS0tw+KPv466gGMi2bEvaJlowvXaJZutvu6cuFh4FKh8uA3Qk11xjWThshqi5Fbcb31i6Ew3FkR0M='
    });


    try {
        const results = await dbClient.send(new ListTablesCommand);
        console.log(results)
    } catch (err) {
        console.error(err)
    }

    return res.status(200).json({
        body: 'ok'
    })

    // docClient.scan(params, (err, data) => {
    //     if (err) {
    //         res.status(409).json({
    //             message: "Error de scan de la BD + ", err
    //         })
    //     } else {
    //         const { Items } = data;
    //         res.status(200).json({
    //             body: Items
    //         })
    //     }
    // })

});

router.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

app.use(basePath, router)

export const handler = serverless(app);
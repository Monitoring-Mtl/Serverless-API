import AWS, { AWSError } from 'aws-sdk';
import { resultSetToJson } from '../utils/dataUtils';

export const executeQuery = async (queryString: string, database: string, outputLocation: string) => {
    let athena = new AWS.Athena();

    const params = {
        QueryString: queryString,
        QueryExecutionContext: {
            Database: database,
        },
        ResultConfiguration: {
            OutputLocation: outputLocation, // Ensure you have this bucket set up
        },
    };

    try {
        const startResponse = await athena.startQueryExecution(params).promise();

        if (startResponse?.QueryExecutionId === undefined) {
            throw new Error('Query ID is undefined');
        }

        let queryState = 'RUNNING';
        while (queryState === 'RUNNING' || queryState === 'QUEUED') {
            athena = new AWS.Athena(); // re-initialize to avoid timeout
            const statusResponse = await athena
                .getQueryExecution({ QueryExecutionId: startResponse.QueryExecutionId })
                .promise();
            queryState = statusResponse.QueryExecution?.Status?.State || 'UNKNOWN';

            console.log(queryState);

            if (queryState === 'FAILED' || queryState === 'CANCELLED') {
                throw new Error(`Athena query ${queryState}`);
            }

            // Wait for a short time before checking the status again
            await new Promise((resolve) => setTimeout(resolve, 500)); // polling every second
        }

        if (queryState !== 'SUCCEEDED') {
            throw new Error(`Query did not succeed. Final state: ${queryState}`);
        }

        athena = new AWS.Athena();
        const results = await athena.getQueryResults({ QueryExecutionId: startResponse.QueryExecutionId }).promise();
        return resultSetToJson(results);
    } catch (error) {
        throw new Error(`Error executing Athena query: ${(error as AWSError).message}`);
    }
};

// import AWS, { AWSError } from 'aws-sdk';
// import { resultSetToJson } from '../utils/dataUtils';

// interface QueryRow {
//     [key: string]: string | number | undefined; // Replace this with the actual structure of your query row
// }

// export const executeQuery = async (queryString: string, database: string, outputLocation: string) => {
//     let athena = new AWS.Athena();

//     const params = {
//         QueryString: queryString,
//         QueryExecutionContext: {
//             Database: database,
//         },
//         ResultConfiguration: {
//             OutputLocation: outputLocation, // Ensure you have this bucket set up
//         },
//     };

//     try {
//         const startResponse = await athena.startQueryExecution(params).promise();

//         if (startResponse?.QueryExecutionId === undefined) {
//             throw new Error('Query ID is undefined');
//         }

//         let queryState = 'RUNNING';
//         while (queryState === 'RUNNING' || queryState === 'QUEUED') {
//             athena = new AWS.Athena(); // re-initialize to avoid timeout
//             const statusResponse = await athena
//                 .getQueryExecution({ QueryExecutionId: startResponse.QueryExecutionId })
//                 .promise();
//             queryState = statusResponse.QueryExecution?.Status?.State || 'UNKNOWN';

//             console.log(queryState);

//             if (queryState === 'FAILED' || queryState === 'CANCELLED') {
//                 throw new Error(`Athena query ${queryState}`);
//             }

//             // Wait for a short time before checking the status again
//             await new Promise((resolve) => setTimeout(resolve, 500)); // polling every second
//         }

//         if (queryState !== 'SUCCEEDED') {
//             throw new Error(`Query did not succeed. Final state: ${queryState}`);
//         }

//         // Handle pagination to retrieve all results
//         let results: QueryRow[] = [];
//         let nextToken: string | undefined;
//         do {
//             athena = new AWS.Athena();
//             const response = await athena.getQueryResults({ QueryExecutionId: startResponse.QueryExecutionId, NextToken: nextToken }).promise();
//             results = results.concat(resultSetToJson(response)); // Append new results to existing results
//             nextToken = response.NextToken;
//         } while (nextToken);

//         return results;
//     } catch (error) {
//         throw new Error(`Error executing Athena query: ${(error as AWSError).message}`);
//     }
// };

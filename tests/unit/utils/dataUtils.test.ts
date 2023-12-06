import { resultSetToJson } from '../../../src/utils/dataUtils';
import { PromiseResult } from 'aws-sdk/lib/request';
import AWS from 'aws-sdk';

// If you're not sure about the specific type, use 'unknown' or the specific type if known
const mockResponse: unknown = {
    $response: new AWS.Response<unknown, AWS.AWSError>(),
};

describe('resultSetToJson', () => {
    it('should return an empty array if column names are missing', () => {
        const resultSet: PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError> = {
            ...(mockResponse as PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError>),
            ResultSet: {
                Rows: [{ Data: [{ VarCharValue: 'data1' }] }],
            },
        };
        expect(resultSetToJson(resultSet)).toEqual([]);
    });

    it('should return an empty array if Rows are missing', () => {
        const resultSet: PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError> = {
            ...(mockResponse as PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError>),
            ResultSet: {
                ResultSetMetadata: {
                    ColumnInfo: [{ Name: 'column1', Type: 'string' }],
                },
            },
        };
        expect(resultSetToJson(resultSet)).toEqual([]);
    });

    it('should correctly convert ResultSet to JSON', () => {
        const resultSet: PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError> = {
            ...(mockResponse as PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError>),
            ResultSet: {
                ResultSetMetadata: {
                    ColumnInfo: [
                        { Name: 'column1', Type: 'string' },
                        { Name: 'column2', Type: 'string' },
                    ],
                },
                Rows: [
                    { Data: [{ VarCharValue: 'Header1' }, { VarCharValue: 'Header2' }] },
                    { Data: [{ VarCharValue: 'data1' }, { VarCharValue: 'data2' }] },
                ],
            },
        };
        const expected = [{ column1: 'data1', column2: 'data2' }];
        expect(resultSetToJson(resultSet)).toEqual(expected);
    });
});

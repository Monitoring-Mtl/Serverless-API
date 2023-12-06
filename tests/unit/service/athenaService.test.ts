import { executeQuery } from '../../../src/service/athenaService';
import { startQueryExecutionMock, getQueryExecutionMock, getQueryResultsMock } from '../../../__mocks__/athena';

jest.mock('aws-sdk');

// Mock resultSetToJson
jest.mock('../../../src/utils/dataUtils', () => ({
    resultSetToJson: jest.fn().mockImplementation((data) => data),
}));

jest.useFakeTimers();

describe('AthenaService executeQuery', () => {
    beforeEach(() => {
        startQueryExecutionMock.mockReset().mockResolvedValue({ QueryExecutionId: '123' });
        getQueryExecutionMock.mockReset().mockResolvedValue({ QueryExecution: { Status: { State: 'SUCCEEDED' } } });
        getQueryResultsMock.mockReset().mockResolvedValue({
            // mocked resultat, pas sur encore
        });
    });

    it('executes a query successfully', async () => {
        const expectedResults = {}; // Same ici
        const results = await executeQuery('SELECT * FROM ', '', 's3://');

        // Assertions
        expect(results).toEqual(expectedResults);
        expect(startQueryExecutionMock).toHaveBeenCalledWith({
            QueryString: 'SELECT * FROM ',
            QueryExecutionContext: { Database: '' },
            ResultConfiguration: { OutputLocation: 's3://' },
        });
    });

    it('handles errors during query execution', async () => {
        startQueryExecutionMock.mockRejectedValue(new Error('Query execution error'));

        await expect(executeQuery('SELECT * FROM ', '', 's3://')).rejects.toThrow('Query execution error');
        expect(startQueryExecutionMock).toHaveBeenCalled();
    });

    it('handles failed query state', async () => {
        startQueryExecutionMock.mockResolvedValue({ QueryExecutionId: '123' });
        getQueryExecutionMock.mockResolvedValue({ QueryExecution: { Status: { State: 'FAILED' } } });

        await expect(executeQuery('SELECT * FROM ', '', 's3://')).rejects.toThrow('Athena query FAILED');
        expect(startQueryExecutionMock).toHaveBeenCalled();
        expect(getQueryExecutionMock).toHaveBeenCalled();
    });

    it('handles cancelled query state', async () => {
        startQueryExecutionMock.mockResolvedValue({ QueryExecutionId: '123' });
        getQueryExecutionMock.mockResolvedValue({ QueryExecution: { Status: { State: 'CANCELLED' } } });

        await expect(executeQuery('SELECT * FROM ', '', 's3://')).rejects.toThrow('Athena query CANCELLED');
        expect(startQueryExecutionMock).toHaveBeenCalled();
        expect(getQueryExecutionMock).toHaveBeenCalled();
    });

    it('handles errors in retrieving query results', async () => {
        startQueryExecutionMock.mockResolvedValue({ QueryExecutionId: '123' });
        getQueryExecutionMock.mockResolvedValue({ QueryExecution: { Status: { State: 'SUCCEEDED' } } });
        getQueryResultsMock.mockRejectedValue(new Error('Error retrieving results'));

        await expect(executeQuery('SELECT * FROM ', '', 's3://')).rejects.toThrow('Error retrieving results');
        expect(startQueryExecutionMock).toHaveBeenCalled();
        expect(getQueryExecutionMock).toHaveBeenCalled();
        expect(getQueryResultsMock).toHaveBeenCalled();
    });
});

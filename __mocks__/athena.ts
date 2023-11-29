const startQueryExecutionMock = jest.fn();
const getQueryExecutionMock = jest.fn();
const getQueryResultsMock = jest.fn();

const Athena = jest.fn(() => ({
    startQueryExecution: startQueryExecutionMock,
    getQueryExecution: getQueryExecutionMock,
    getQueryResults: getQueryResultsMock,
}));

export { Athena, startQueryExecutionMock, getQueryExecutionMock, getQueryResultsMock };

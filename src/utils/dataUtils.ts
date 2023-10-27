import { PromiseResult } from 'aws-sdk/lib/request';

export const resultSetToJson = (resultSet: PromiseResult<AWS.Athena.GetQueryResultsOutput, AWS.AWSError>) => {
    // Extract column names
    const columnNames = resultSet.ResultSet?.ResultSetMetadata?.ColumnInfo?.map((col) => col.Name);

    // Check if columnNames exists and if ResultSet Rows are defined
    if (!columnNames || !resultSet.ResultSet?.Rows) {
        return [];
    }

    // Convert rows to JSON
    const jsonData = resultSet.ResultSet?.Rows?.slice(1).map((row) => {
        const obj: { [key: string]: string | number | undefined } = {};
        row.Data?.forEach((datum, idx: number) => {
            obj[columnNames[idx]] = datum.VarCharValue;
        });
        return obj;
    });

    return jsonData;
};

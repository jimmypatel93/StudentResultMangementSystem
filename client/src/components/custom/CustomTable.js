import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

export const CustomTable = (props) => {
  const { columns, data, handleDelete } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns &&
            columns.map((column, index) => <th key={index}>{column.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((d) => {
            return (
              <tr key={d.id}>
                {columns.map((column) => {
                  if (column.deleteAction) {
                    return (
                      <td
                        className="text-center custom-table-delete"
                        key={column.key + '_' + d.id}
                      >
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            handleDelete(d.id);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    );
                  } else {
                    return (
                      <td key={column.key + '_' + d.id}>{d[column.key]}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        {(!data || data.length === 0) && (
          <tr>
            <td colSpan={columns.length} className="text-center">
              No records found!
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

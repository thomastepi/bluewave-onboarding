import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import styles from './PaginationTable.module.css';

const PaginationTable = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section className={styles.paginationContainer}>
      <table>
        <tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

PaginationTable.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PaginationTable;

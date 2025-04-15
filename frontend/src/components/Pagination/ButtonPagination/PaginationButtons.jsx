import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '../../Button/Button';
import styles from './PaginationButtons.module.css';

const PaginationButtons = ({ currentPage, setCurrentPage, totalPages }) => {
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <section className={styles.paginationContainer}>
      <Button
        text="Previous"
        variant="outlined"
        buttonType="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={prevPage}
        disabled={currentPage === 1}
      />
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={1}
        boundaryCount={1}
        hidePrevButton
        hideNextButton
      />
      <Button
        text="Next"
        variant="outlined"
        buttonType="secondary"
        endIcon={<ArrowForwardIcon />}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </section>
  );
};

PaginationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationButtons;

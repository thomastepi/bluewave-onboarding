import React from 'react';
import PropTypes from 'prop-types';
import './PageBtnContainer.css';
import Button from '../Button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PageBtnContainer = ({ currentPage, setCurrentPage, totalPages }) => {
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  const generatePagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ type: 'page', value: i });
      }
      return pages;
    }

    pages.push({ type: 'page', value: 1 });

    if (currentPage > 3) {
      pages.push({ type: 'ellipsis', id: 'start-ellipsis' });
    } else {
      pages.push({ type: 'page', value: 2 });
    }

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      for (let i = 3; i <= Math.min(5, totalPages - 2); i++) {
        pages.push({ type: 'page', value: i });
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages - 2; i++) {
        if (i > 2) pages.push({ type: 'page', value: i });
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push({ type: 'page', value: i });
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push({ type: 'ellipsis', id: 'end-ellipsis' });
    } else if (
      totalPages > 3 &&
      !pages.some((p) => p.type === 'page' && p.value === totalPages - 1)
    ) {
      pages.push({ type: 'page', value: totalPages - 1 });
    }

    pages.push({ type: 'page', value: totalPages });

    return pages;
  };

  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) {
      nextPage = 1;
    }
    setCurrentPage(nextPage);
  };

  const prevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) {
      prevPage = totalPages;
    }
    setCurrentPage(prevPage);
  };

  return (
    <section>
      <Button
        text="Previous"
        variant="outlined"
        buttonType="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={prevPage}
        disabled={currentPage === 1}
      />
      <div className="btn-container">
        {generatePagination().map((item) =>
          item.type === 'ellipsis' ? (
            <span key={item.id} className="ellipsis">
              ...
            </span>
          ) : (
            <Button
              key={`page-${item.value}`}
              type="button"
              variant="text"
              buttonType={currentPage === item.value ? 'primary' : ''}
              text={item.value}
              onClick={() => changePage(item.value)}
              disabled={currentPage === item.value}
            >
              {item.value}
            </Button>
          )
        )}
      </div>
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

PageBtnContainer.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export default PageBtnContainer;

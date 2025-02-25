import PropTypes from 'prop-types';
import Turndown from 'turndown';
import styles from './TourPreview.module.scss';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

const TourPreview = ({
  stepsData,
  currentStep,
  setCurrentStep,
  tourAppearance,
}) => {
  const { header, content } = currentStep;
  const markdownContent = new Turndown().turndown(content);

  const {
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    tourSize,
    finalButtonText,
  } = tourAppearance;

  const buttonStyles = {
    minWidth: '96px',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'auto',
    },
  };

  const findCurrentIndex = (activeStep) =>
    stepsData.findIndex(({ id }) => id === activeStep.id);

  const currentIndex = findCurrentIndex(currentStep);
  const prevDisabled = currentIndex === 0;
  const nextDisabled = currentIndex === stepsData.length - 1;

  const onClickHandler = (identifier) => {
    if (identifier === 'prev' && currentIndex > 0)
      setCurrentStep(stepsData[currentIndex - 1]);
    else if (identifier === 'next' && currentIndex < stepsData.length - 1)
      setCurrentStep(stepsData[currentIndex + 1]);
  };

  const getArrowStyle = (isDisabled) => ({
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    '&:hover': {
      color: isDisabled ? 'inherit' : 'gray',
      transform: isDisabled ? 'none' : 'scale(1.1)',
      transition: 'all 0.3s ease',
    },
  });

  return (
    <div className={`${styles.container} ${styles[tourSize]}`}>
      <div className={styles.title}>
        <ArrowCircleLeftOutlinedIcon
          sx={getArrowStyle(prevDisabled)}
          disabled={prevDisabled}
          onClick={onClickHandler.bind(null, 'prev')}
          aria-label="Previous"
        />
        <span>Preview</span>
        <ArrowCircleRightOutlinedIcon
          sx={getArrowStyle(nextDisabled)}
          disabled={nextDisabled}
          onClick={onClickHandler.bind(null, 'next')}
          aria-label="Next"
        />
      </div>

      <div className={styles.preview}>
        <div className={styles.heading}>
          <h2 style={{ color: `${headerColor}` }}>{header}</h2>
          <Close className={styles.closeIcon} aria-label="Close Preview" />
        </div>
        <p className={styles.paragraph} style={{ color: textColor }}>
          {markdownContent}
        </p>

        <div className={styles.buttons}>
          <Button
            onClick={onClickHandler.bind(null, 'prev')}
            disabled={prevDisabled}
            color="var(--main-text-color)"
            sx={buttonStyles}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            // disabled={nextDisabled}
            onClick={onClickHandler.bind(null, 'next')}
            sx={{
              ...buttonStyles,
              color: `${buttonTextColor}`,
              backgroundColor: `${buttonBackgroundColor}`,
            }}
          >
            {findCurrentIndex(currentStep) === stepsData.length - 1
              ? finalButtonText
              : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

TourPreview.propTypes = {
  stepsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      stepName: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      targetElement: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.shape({
    id: PropTypes.number.isRequired,
    stepName: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    targetElement: PropTypes.string.isRequired,
  }),
  setCurrentStep: PropTypes.func,
  appearance: PropTypes.object,
};

export default TourPreview;

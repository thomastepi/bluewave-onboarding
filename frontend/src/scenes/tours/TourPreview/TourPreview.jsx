import styles from './TourPreview.module.scss';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

const TourPreview = ({ tourAppearance }) => {
  const {
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    tourSize,
    finalButtonText,
  } = tourAppearance;

  const arrowStyle = {
    cursor: 'pointer',
    '&:hover': {
      color: 'gray',
      transform: 'scale(1.1)',
      transition: 'all 0.3s ease',
    },
  };

  const buttonStyles = {
    width: '96px',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },
  };

  return (
    <div className={`${styles.container} ${styles[tourSize]}`}>
      <div className={styles.title}>
        <ArrowCircleLeftOutlinedIcon sx={arrowStyle} aria-label="Previous" />
        <span>Preview</span>
        <ArrowCircleRightOutlinedIcon sx={arrowStyle} aria-label="Next" />
      </div>

      <div className={styles.preview}>
        <div className={styles.heading}>
          <h2 style={{ color: `${headerColor}` }}>Welcome to Guidefox</h2>
          <Close className={styles.closeIcon} aria-label="Close Preview" />
        </div>
        <p className={styles.paragraph} style={{ color: textColor }}>
          Serve your users and increase product adoption with hints, popups,
          banners, and helper links. Earn an extra 30% if you purchase an annual
          plan with us.
        </p>

        <div className={styles.buttons}>
          <Button color="var(--main-text-color)" sx={buttonStyles}>
            Previous
          </Button>
          <Button
            variant="contained"
            sx={{
              ...buttonStyles,
              color: `${buttonTextColor}`,
              backgroundColor: `${buttonBackgroundColor}`,
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourPreview;

import { Skeleton } from '@mui/material';
import BaseSkeleton from './BaseSkeleton';

const HintSkeleton = () => (
  <BaseSkeleton guideType="hint">
    <Skeleton
      sx={{
        position: 'absolute',
        right: 8,
        bottom: 8,
        bgcolor: 'var(--gray-200)',
        borderRadius: 'var(--radius-skeleton)',
        zIndex: 100,
      }}
      variant="rounded"
      width={50}
      height={15}
      animation={false}
    />
  </BaseSkeleton>
);

export default HintSkeleton;

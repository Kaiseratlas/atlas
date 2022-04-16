import React from 'react';
import { Avatar, Chip, ChipProps } from '@mui/material';

const IdeologyChip: React.FC<{ ideology: any } & ChipProps> = ({ ideology, ...props }) => {
  return (
    <Chip
      avatar={<Avatar variant="square" src={ideology.icon} />}
      label={ideology.name}
      variant="outlined"
      sx={{
        border: 'none',
      }}
      {...props}
    />
  );
};

export default IdeologyChip;
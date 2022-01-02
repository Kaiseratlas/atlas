import React, { useCallback, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";

const ReleasePicker: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data, loading, error } = useQuery(
    gql`
      {
        releases {
          version
        }
      }
    `,
    {
      onCompleted() {},
    }
  );
  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  console.log("data", data);
  return (
    <>
      <LoadingButton
        loading={loading}
        loadingPosition="end"
        endIcon={<ExpandCircleDownIcon />}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        {data?.releases[0].version}
      </LoadingButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {data?.releases.map((release) => (
          <MenuItem key={`release-${release.version}`}>
            {release.version}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ReleasePicker;

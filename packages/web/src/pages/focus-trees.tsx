import { GetStaticProps, NextPage } from "next";
import client from "../../client";
import { gql } from "@apollo/client";
import styles from "./focus-trees/focus.module.scss";
import { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  DialogContent,
  Typography,
  DialogTitle,
  Box,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import Scroll from "../../public/scrollbar_horisontal_bg.png";

const FocusTrees: NextPage<{ focusTree: any }> = ({ focusTree }) => {


  return (
    <Dialog fullScreen open={true}>

    </Dialog>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query FocusTree {
        focusTree(id: "KR_Bharatiya_Commune") {
          id
          title
          focuses {
            id
            iconUrl
            title
            description
            prerequisite
            relativePositionId
            cost
            x
            y
          }
        }
      }
    `,
  });

  return {
    props: {
      focusTree: data.focusTree,
    },
  };
};

export default FocusTrees;

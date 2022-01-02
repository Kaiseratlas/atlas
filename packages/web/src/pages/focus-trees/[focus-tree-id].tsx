import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "../../../client";
import { gql } from "@apollo/client";
import styles from "./focus.module.scss";
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

var cumulativeOffset = function (element) {
  var top = 0,
    left = 0;
  do {
    top += element?.offsetTop || 0;
    left += element?.offsetLeft || 0;
    element = element?.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

const FocusTree: NextPage<{ focusTree: any }> = ({ focusTree }) => {
  //console.log("focusTree", focusTree);
  const [currentFocus, setCurrentFocus] = useState(null);
  const f = focusTree.focuses.filter((f: any) => !f.relativePositionId);
  //console.log("f", f);
  console.log("currentFocus", currentFocus);

  const findChildren = (id: any) => {
    return focusTree.focuses.filter((f: any) => f.relativePositionId === id);
  };

  const focusMap = new Map();
  focusTree.focuses.forEach((f: any) => {
    focusMap.set(f.id, f);
  });

  const [refsMap, setRefsMap] = useState<Map<string, HTMLDivElement>>(
    new Map()
  );
  const [prerequisite, setPrerequisite] = useState<any[]>([]);

  useEffect(() => {
    const arr: SetStateAction<any[]> = [];
    console.log("3", refsMap);
    setTimeout(() => {
      Array.from(refsMap).map(([focusId, el]) => {
        const focus = focusMap.get(focusId);

        // if (focus.prerequisite.length === 1) {
        // console.log("focus", focus);
        const m = focus.prerequisite.map((n) => refsMap.get(n));
        m.map((v) => {
          const par = cumulativeOffset(v);
          const ch = cumulativeOffset(el);

          const d = focusTree.focuses.some((f) =>
            f.prerequisite.includes(focusId)
          );

          const div = (
            <div
              style={{
                position: "absolute",
                top: par.top + 60 + 20,
                fontSize: "80%",
                height: 150,
                left:
                  ch.left <= par.left
                    ? ch.left + (el.clientWidth / 2 - 25)
                    : par.left + (el.clientWidth / 2 - 25),
                color: "#93a6ba",
                width:
                  ch.left <= par.left ? par.left - ch.left : ch.left - par.left,
                borderTop: par.top <= ch.top ? "1px solid #93a6ba" : "none",
                borderLeft: ch.left <= par.left ? "1px solid #93a6ba" : "none",
                borderBottom: par.top > ch.top ? "1px solid #93a6ba" : "none",
                borderRight: ch.left > par.left ? "1px solid #93a6ba" : "none",
              }}
            >
              {/*{focusId} - {focus.prerequisite}*/}
            </div>
          );
          arr.push(div);
        });
        //}
      });

      console.log("arr", arr);

      setPrerequisite(arr);
    });
  }, []);

  // console.log("p", prerequisite);

  function render(fff: any) {
    return fff.map((z: any) => {
      const children = findChildren(z.id);
      //console.log("children", children);

      return (
        <div
          className={styles.focus}
          key={z.id}
          data-id={z.id}
          data-prerequisite={JSON.stringify(z.prerequisite)}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentFocus(z);
          }}
          style={{ top: z.y * 120 + 30, left: z.x * 100 }}
          ref={(instance) => {
            setRefsMap((prevState) => {
              if (!prevState.has(z.id) && instance) {
                return prevState.set(z.id, instance);
              }
              return prevState;
            });
          }}
        >
          <div
            className={styles.focus__picture}
            style={z.iconUrl ? { backgroundImage: `url("${z.iconUrl}")` } : {}}
          />
          <div className={styles.focus__title}>{z.title}</div>
          {render(children)}
        </div>
      );
    });
  }

  return (
    <Dialog fullScreen open={true}>
      <AppBar
        position="fixed"
        sx={{
          background: "#272521",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "uppercase" }}
          >
            {focusTree.title}
          </Typography>
          <Button color="inherit">Close</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={!!currentFocus} onClose={() => setCurrentFocus(null)}>
        <DialogTitle>{currentFocus?.title}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <img src={currentFocus?.iconUrl} />
            </Grid>
            <Grid item xs={9}>
              TODO
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography gutterBottom>{currentFocus?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCurrentFocus(null)}>Ok</Button>
        </DialogActions>
      </Dialog>
      <DialogContent
        sx={{
          background: "#241f1f",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "scroll",
        }}
      >
        <div
          style={{
            top: 64,
            position: "absolute",
          }}
        >
          {prerequisite}
          {render(f)}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            height: 18,
            width: "100%",
            background: `#1d1d1c`,
          }}
        ></div>
      </DialogContent>
    </Dialog>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const focusTreeId = params["focus-tree-id"];
  const { data, errors } = await client.query({
    variables: { focusTreeId },
    query: gql`
      query FocusTree($focusTreeId: String!) {
        focusTree(id: $focusTreeId) {
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

  console.log("error", errors);

  return {
    props: {
      focusTree: data.focusTree,
    },
  };
};

export default FocusTree;

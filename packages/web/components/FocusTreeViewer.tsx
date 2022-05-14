import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import FocusTreeQuery from '../graphql/queries/focuses/trees/focus-tree-query.graphql';
import { Group, Image, Layer, Sprite, Stage, Text } from 'react-konva';
import useImage from 'use-image';

const Focus: React.FC<any> = ({ focus }) => {
  const [image] = useImage(focus.iconUrl);
  const [image1] = useImage('/assets/pictures/focus_unavailable_bg.png');

  return (
    <Group width={164}>
      <Image image={image1} x={0} y={65} stroke="black" />
      <Group x={40} y={0}>
        <Image image={image} stroke="black" />
        <Text
          x={0}
          text={focus.name}
          y={80}
          fill="white"
          fontVariant="bolder"
          align="center"
        />
      </Group>
    </Group>
  );
};

const FocusTreeViewer: React.FC = () => {
  const { data, loading } = useQuery(FocusTreeQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });
  console.log('data', data);

  const focusMap = React.useMemo(() => {
    if (!data) {
      return null;
    }
    return new Map(
      data.focusTree.focuses.map((focus: any) => [focus.id, focus]),
    );
  }, [data?.focusTree]);

  const childrenMap = React.useMemo(() => {
    if (!data) {
      return null;
    }
    const m = new Map();
    data.focusTree.focuses.forEach((focus: any) => {
      const xxx = data.focusTree.focuses.filter((f: any) =>
        f.prerequisite.map((p: any) => p.id).includes(focus.id),
      );
      m.set(focus.id, xxx);
    });
    return m;
  }, [data?.focusTree]);

  if (!focusMap) {
    return null;
  }

  console.log('focusMap', focusMap);
  console.log('childrenMap', childrenMap);

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Array.from(focusMap.values())
            .filter((focus: any) => !focus.prerequisite.length)
            .map((focus: any) => {
              console.log('childrenMap?.get(focus.id)', focus.id, childrenMap?.get(focus.id))
              return (
                <Group key={focus.id} x={focus.x * 100} y={focus.y * 200}>
                  <Focus focus={focus} />
                  {childrenMap?.get(focus.id).map((focus: any) => {
                    return (
                      <Group key={focus.id} x={focus.x * 100} y={focus.y * 200}>
                        <Focus focus={focus} />
                      </Group>
                    );
                  })}
                </Group>
              );
            })}
          {/*<Image image="" />*/}
        </Layer>
      </Stage>
    </>
  );
};

export default FocusTreeViewer;

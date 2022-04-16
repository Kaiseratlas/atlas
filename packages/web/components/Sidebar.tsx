import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const DRAWER_WIDTH = 500;

const Sidebar: React.FC = () => {
  const router = useRouter();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar variant="dense" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ minWidth: 270 }}>
          <List
            dense
            subheader={
              <ListSubheader>
                <Typography variant="overline">Products</Typography>
              </ListSubheader>
            }
          >
            <ListItemButton selected>
              <ListItemAvatar>
                <Avatar
                  src={
                    'https://styles.redditmedia.com/t5_2wgr5/styles/communityIcon_ilffqpdo6z741.png?width=256&s=0075b6bbdbac97b7e2004511057c987923e8c1a7'
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={'Kaiserreich'}
                secondary={'Legacy of the Weltkrieg'}
              ></ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  src={
                    'https://steamuserimages-a.akamaihd.net/ugc/1003683584089754919/1E752D6C8D21071FAC4174ABDC72B05EF51A6A5D/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
                  }
                />
              </ListItemAvatar>
            </ListItemButton>
          </List>
        </Box>
        <Divider orientation="vertical" sx={{ height: '100%' }} />
        <Box
          sx={{
            width: DRAWER_WIDTH,
          }}
        >
          <List
            dense
            component="nav"
            subheader={
              <ListSubheader>
                <Typography variant="overline">Common</Typography>
              </ListSubheader>
            }
          >
            <ListItemButton selected={router.pathname === '/'}>
              <ListItemText>Abilities</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Autonomous States</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton
              selected={router.pathname === '/buildings'}
              onClick={async () => {
                await router.push('/buildings');
              }}
            >
              <ListItemText>Buildings</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Characters</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton
              selected={router.pathname === '/countries'}
              onClick={async () => {
                await router.push('/countries');
              }}
            >
              <ListItemText>Countries</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Ideas</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton
              selected={router.pathname === '/ideologies'}
              onClick={async () => {
                await router.push('/ideologies');
              }}
            >
              <ListItemText>Ideologies</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Intelligence Agencies</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Focuses</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemText>Events</ListItemText>
              <ListItemSecondaryAction>
                <Chip label={10} size="small" />
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
          <List
            dense
            component="nav"
            subheader={
              <ListSubheader>
                <Typography variant="overline">Map</Typography>
              </ListSubheader>
            }
          >
            <ListItemButton
              selected={router.pathname === '/continents'}
              onClick={async () => {
                await router.push('/continents');
              }}
            >
              <ListItemText>Continents</ListItemText>
            </ListItemButton>
            <ListItemButton
              selected={router.pathname === '/states'}
              onClick={async () => {
                await router.push('/states');
              }}
            >
              <ListItemText>States</ListItemText>
            </ListItemButton>
            <ListItemButton
              onClick={async () => {
                await router.push('/provinces');
              }}
            >
              <ListItemText>Provinces</ListItemText>
            </ListItemButton>
          </List>
          <List
            dense
            component="nav"
            subheader={
              <ListSubheader>
                <Typography variant="overline">Interface</Typography>
              </ListSubheader>
            }
          >
            <ListItemButton
              selected={router.pathname === '/sprites'}
              onClick={async () => {
                await router.push('/sprites');
              }}
            >
              <ListItemText>Sprites</ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

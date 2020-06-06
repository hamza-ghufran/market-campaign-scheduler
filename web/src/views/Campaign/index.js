import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import mockData from './data';
import { Toolbar } from './components';
import ListCampaign from './ListCampaign';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Campaign = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}><Toolbar />
      <div className={classes.content}><ListCampaign users={users} /></div>
    </div>
  );
};

export default Campaign;

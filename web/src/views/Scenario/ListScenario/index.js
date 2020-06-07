import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Grid,
  Divider,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ListScenario = props => {
  const { className, scenario, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h4">{scenario.name}</Typography>
        <Typography align="center" variant="body1">{scenario.subject}</Typography>
      </CardContent>

      <Divider />

      <CardActions>
        <Grid container justify="space-between">
          <Grid item className={classes.statsItem}>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">{moment(scenario.time).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
          </Grid>

          <Grid item className={classes.statsItem}>
            <Typography display="inline" variant="body2">{scenario.served} Contacts Served</Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ListScenario.propTypes = {
  className: PropTypes.string,
  scenario: PropTypes.object.isRequired
};

export default ListScenario;

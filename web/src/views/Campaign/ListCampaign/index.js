import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardActions,
  CardContent,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const ListCampaign = props => {
  const { className, list_campaign, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Contacts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list_campaign && list_campaign.length && list_campaign.map(campaign => (
                  <TableRow
                    hover
                    key={campaign._id}
                    className={classes.tableRow}
                  >
                    <TableCell><div className={classes.nameContainer}>
                      <Typography variant="body1">{campaign.name}</Typography></div>
                    </TableCell>
                    <TableCell>{campaign.description}</TableCell>
                    <TableCell>{moment(campaign.start_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{moment(campaign.end_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{campaign.active ? 'Yes' : 'No'}</TableCell>
                    <TableCell><Button>Upload</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
      </CardActions>
    </Card>
  );
};

ListCampaign.propTypes = {
  className: PropTypes.string,
};

export default ListCampaign;

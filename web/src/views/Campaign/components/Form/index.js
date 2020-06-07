import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

export const Form = props => {
  const { className, handleInput, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader title="New Campaign" subheader="All fields are required" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                margin="dense"
                variant="outlined"
                value={props.name}
                onChange={handleInput}
                helperText="Please specify a name"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                required
                fullWidth
                margin="dense"
                variant="outlined"
                name="description"
                label="Description"
                onChange={handleInput}
                value={props.description}
                helperText="Specify the Goal"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                required
                fullWidth
                type="date"
                margin="dense"
                name="start_date"
                variant="outlined"
                label="Start Date"
                value={props.start_date}
                onChange={handleInput}
                helperText="Timeline"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                type="date"
                name="end_date"
                margin="dense"
                label="End Date"
                variant="outlined"
                onChange={handleInput}
                value={props.end_date}
                helperText="Timeline"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions> <Button onClick={props.handleCreateCampaign} color="primary" variant="contained">Create Campaign</Button></CardActions>
      </form>
    </Card>
  );
};

Form.propTypes = {
  className: PropTypes.string
};

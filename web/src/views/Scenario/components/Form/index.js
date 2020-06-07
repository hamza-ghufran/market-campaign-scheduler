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
        <CardHeader title="New Scenario" subheader="All fields are required" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
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
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                margin="dense"
                variant="outlined"
                name="subject"
                label="Subject"
                value={props.subject}
                onChange={handleInput}
                helperText="Topic"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                name="content"
                margin="dense"
                label="Content"
                variant="outlined"
                value={props.content}
                onChange={handleInput}
                helperText="For now, lets keep it text based"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                type="date"
                name="date"
                label="Date"
                margin="dense"
                variant="outlined"
                value={props.date}
                onChange={handleInput}
                helperText="When to send out to users"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="time"
                name="time"
                margin="dense"
                label="Time"
                variant="outlined"
                onChange={handleInput}
                value={props.time}
                helperText="What time exactly"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                required
                fullWidth
                type="time"
                margin="dense"
                label="Campaign"
                name="campaign_id"
                variant="outlined"
                onChange={handleInput}
                value={props.campaign_id}
                helperText="Which Campaign does it belong to"
              >
                {props.list_campaign && props.list_campaign.length &&
                  props.list_campaign.map(campaign => (
                    <option key={campaign._id} value={campaign._id}>
                      {campaign.name}
                    </option>
                  ))}
              </TextField >
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions> <Button onClick={props.handleCreateScenario} color="primary" variant="contained">Create Scenario</Button></CardActions>
      </form>
    </Card>
  );
};

Form.propTypes = {
  className: PropTypes.string
};

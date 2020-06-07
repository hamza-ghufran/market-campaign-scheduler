import React from 'react'
import { Form } from '../components'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8.6),
    paddingRight: '15rem',
    paddingLeft: '15rem'
  }
}));

const AddScenario = ({ ...props }) => {
  const classes = useStyles();

  return <>
    <div className={classes.root}>
      <Form {...props} />
    </div>
  </>
}

export default AddScenario

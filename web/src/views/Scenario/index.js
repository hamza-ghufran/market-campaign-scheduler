import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Toolbar } from './components';
import ListScenario from './ListScenario';

import {
  listScenario,
} from 'actions';

const style = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    display: 'flex',
    marginTop: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

class Scenario extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.fetchListScenario()
  }

  fetchListScenario = () => {
    const { dispatch } = this.props;

    dispatch(listScenario())
  }

  renderComponent = () => {
    const { classes, list_scenario } = this.props

    return (
      <div className={classes.root}>
        <Toolbar />
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            {list_scenario && list_scenario.length && list_scenario.map(scenario => (
              <Grid
                item
                key={scenario.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ListScenario scenario={scenario} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }

  render() {
    return this.renderComponent()
  }
}

const mapStateToProps = state => {
  const { scenario } = state;
  return {
    list_scenario: scenario.list_scenario,
  };
};

const styledScenario = withStyles(style)(Scenario);

export default connect(mapStateToProps)(styledScenario);


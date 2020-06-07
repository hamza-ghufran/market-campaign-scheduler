import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import moment from 'moment'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Toolbar } from './components';
import AddScenario from './AddScenario';
import ListScenario from './ListScenario';

import {
  listScenario,
  addScenario,
  listCampaign
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
      time: '',
      name: '',
      subject: '',
      content: '',
      campaign_id: '',
      date: moment().format('YYYY-MM-DD'),
    }
  }

  componentDidMount() {
    this.fetchRequiredData()
  }

  fetchRequiredData = () => {
    const { dispatch } = this.props;

    dispatch(listScenario())
    dispatch(listCampaign())
  }

  handleGoToAddScenario = () => {
    this.props.history.push('/scenarios/add')
  }

  handleCreateScenario = () => {
    const { dispatch } = this.props;

    let scenario_req_obj = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      subject: this.state.subject,
      content: this.state.content,
      campaign_id: this.state.campaign_id,
    }

    dispatch(addScenario(scenario_req_obj))
      .then(() => {
        this.fetchRequiredData()
      })
      .finally(() => {
        this.props.history.push('/scenarios')
      })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderComponent = () => {
    const { classes, list_scenario } = this.props

    switch (true) {
      case (this.props.match.params.add === 'add'):
        return <AddScenario
          {...this.state}
          handleInput={this.handleInput}
          list_campaign={this.props.list_campaign}
          handleCreateScenario={this.handleCreateScenario}
        />
      default:
        return (
          <div className={classes.root}>
            <Toolbar
              handleGoToAddScenario={this.handleGoToAddScenario}
            />
            <div className={classes.content}>
              <Grid container spacing={3}>
                {list_scenario && list_scenario.length &&
                  list_scenario.map(scenario => (
                    <Grid item key={scenario.id} lg={6} md={6} xs={12}>
                      <ListScenario
                        scenario={scenario}
                        list_campaign_obj={this.props.list_campaign_obj}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>
        );
    }
  }

  render() {
    return this.renderComponent()
  }
}

const mapStateToProps = state => {
  const { scenario, campaign } = state;
  return {
    list_scenario: scenario.list_scenario,
    list_campaign: campaign.list_campaign,
    list_campaign_obj: campaign.list_campaign_obj,
  };
};

const styledScenario = withStyles(style)(Scenario);

export default connect(mapStateToProps)(styledScenario);


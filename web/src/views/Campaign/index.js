import React, { useState } from 'react';

import moment from 'moment'
import { Toolbar } from './components';
import ListCampaign from './ListCampaign';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import {
  listCampaign,
  addCampaign
} from 'actions';
import AddCampaign from './AddCampaign';

const style = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
})

class Campaign extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      end_date: moment().format('YYYY-MM-DD'),
      start_date: moment().format('YYYY-MM-DD'),
    }
  }

  componentDidMount() {
    this.fetchListCampaign()
  }

  fetchListCampaign = () => {
    const { dispatch } = this.props;

    dispatch(listCampaign())
  }

  handleGoToAddCampaign = () => {
    this.props.history.push('/campaigns/add')
  }

  handleCreateCampaign = () => {
    const { dispatch } = this.props;

    let campaign_req_obj = {
      name: this.state.name,
      end_date: this.state.end_date,
      start_date: this.state.start_date,
      description: this.state.description,
    }

    dispatch(addCampaign(campaign_req_obj))
      .then(() => {
        this.fetchListCampaign()
      })
      .finally(() => {
        this.props.history.push('/campaigns')

      })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderComponent = () => {
    const { classes, list_campaign } = this.props

    switch (true) {
      case (this.props.match.params.add === 'add'):
        return <AddCampaign
          {...this.state}
          handleInput={this.handleInput}
          handleCreateCampaign={this.handleCreateCampaign}
        />
      default:
        return (
          <div className={classes.root}>
            <Toolbar handleGoToAddCampaign={this.handleGoToAddCampaign} />
            <div className={classes.content}><ListCampaign list_campaign={list_campaign} /></div>
          </div>
        );
    }
  }

  render() {
    return this.renderComponent()
  }
}

const mapStateToProps = state => {
  const { campaign } = state;
  return {
    list_campaign: campaign.list_campaign,
  };
};

const styledCampaign = withStyles(style)(Campaign);

export default connect(mapStateToProps)(styledCampaign);


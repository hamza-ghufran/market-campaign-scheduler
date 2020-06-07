import React, { useState } from 'react';

import { Toolbar } from './components';
import ListCampaign from './ListCampaign';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import {
  listCampaign,
} from 'actions';

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

    }
  }

  componentDidMount() {
    this.fetchListCampaign()
  }

  fetchListCampaign = () => {
    const { dispatch } = this.props;

    dispatch(listCampaign())
  }

  renderComponent = () => {
    const { classes, list_campaign } = this.props

    console.log(list_campaign)
    return (
      <div className={classes.root}><Toolbar />
        <div className={classes.content}><ListCampaign list_campaign={list_campaign} /></div>
      </div>
    );
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


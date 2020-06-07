import React, { useState } from 'react';

import moment from 'moment'
import { Toolbar } from './components';
import ListCampaign from './ListCampaign';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import {
  addCampaign,
  listCampaign,
  uploadContacts
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

  onFileUpload = (event, batch_id) => {
    this.setState({
      file: event.target.files[0],
      selected_batch_id: batch_id
    }, () => {
      this.handleFileUpload()
    });
  }

  handleFileUpload = () => {
    const { dispatch } = this.props;
    const data = new FormData()

    data.append('file', this.state.file)
    data.append('batch_id', this.state.selected_batch_id)

    dispatch(uploadContacts(data))
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
            <div className={classes.content}>
              <ListCampaign
                list_campaign={list_campaign}
                onFileUpload={this.onFileUpload}
              /></div>
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


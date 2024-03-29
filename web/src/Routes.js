import React from 'react';
import {
  Switch,
  Redirect
} from 'react-router-dom';
import {
  RouteWithLayout
} from './components';
import {
  Main as MainLayout
} from './layouts';
import {
  Campaign as CampaignView,
  Scenario as ScenarioView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/campaigns"
      />
      <RouteWithLayout
        path="/campaigns/:add?"
        layout={MainLayout}
        component={CampaignView}
      />
      <RouteWithLayout
        exact
        path="/scenarios/:add?"
        layout={MainLayout}
        component={ScenarioView}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import Layout from './pages/layout/Layout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'

// import Inbox from './pages/inbox/components/Inbox.jsx'
// import InboxFolder from './pages/inbox/components/InboxFolder.jsx'
// import InboxCompose from './pages/inbox/components/InboxCompose.jsx'
// import InboxDetail from './pages/inbox/components/InboxDetail.jsx'
// import InboxReplay from './pages/inbox/components/InboxReplay.jsx'
//
// import FlotCharts from './pages/graphs/FlotCharts.jsx'
// import SparklineCharts from './pages/graphs/SparklineCharts.jsx'
// import EasyPieCharts from './pages/graphs/EasyPieCharts.jsx'
// import ChartJs from './pages/graphs/ChartJs.jsx'
// import MorrisCharts from './pages/graphs/MorrisCharts.jsx'
// import Dygraphs from './pages/graphs/Dygraphs.jsx'
// import HighchartTables from './pages/graphs/HighchartTables.jsx'

import Datatables from './pages/tables/Datatables.jsx'

// import UiGeneral from './pages/ui/UiGeneral.jsx'
//
// import FlagIcons from './pages/ui/icons/FlagIcons.jsx'
// import FontAwesomeIcons from './pages/ui/icons/FontAwesomeIcons.jsx'
// import Glyphicons from './pages/ui/icons/Glyphicons.jsx'
// import TreeViews from './pages/ui/TreeViews.jsx'
// import NestableLists from './pages/ui/NestableLists.jsx'
// import JQueryUi from './pages/ui/JQueryUi.jsx'
//
// import FormElements from './pages/forms/FormElements.jsx'
// import FormPlugins from './pages/forms/FormPlugins.jsx'
// import ImageEditor from './pages/forms/ImageEditor.jsx'
// import BootstrapEditors from './pages/forms/BootstrapEditors.jsx'
// import FormLayouts from './pages/forms/FormLayouts.jsx'
// import BootstrapValidation from './pages/forms/BootstrapValidation.jsx'
// import Wizards from './pages/forms/Wizards.jsx'
// import DropzoneDemo from './pages/forms/DropzoneDemo.jsx'
//
// import CalendarPage from './pages/calendar/CalendarPage.jsx'
//
//
// import Projects from './pages/app-views/Projects.jsx'
// import Gallery from './pages/app-views/Gallery.jsx'
//
// import Maps from './pages/maps/Maps.jsx'
// import MapView from './pages/maps/MapView.jsx'
//
// import Widgets from './pages/widgets/Widgets.jsx'
// import StaticPageLoader from './pages/layout/tools/StaticPageLoader.jsx'
//
// import Page404 from './pages/misc/Page404.jsx'
// import Page500 from './pages/misc/Page500.jsx'
// import BlankPage from './pages/misc/BlankPage.jsx'
// import LockedScreen from './pages/misc/LockedScreen.jsx'
// import Login from './pages/misc/Login.jsx'
// import Forgot from './pages/misc/Forgot.jsx'
// import Register from './pages/misc/Register.jsx'
// import CKEditorDemo from './pages/misc/CKEditorDemo.jsx'
//
// import Orders from './pages/e-commerce/Orders.jsx'

let requireAuth = async (nextState, replace) => {
  let response = await fetch('/auth/status', {credentials: 'include'});
  let result = await response.json();
  console.log("=== result ===", result);
  if (!result.authenticated) {
    // window.location.replace("/");
  }
}

const Routes = (
  <Route>
      <Route path="/" component={Layout} onEnter={requireAuth}>
          <Redirect from="/" to="/home"/>
          <IndexRoute component={Dashboard}/>
          <Route path="home" component={Dashboard} />
          <Route path="user" component={Datatables}/>

          {/*<Redirect from="forms" to="/forms/elements"/>*/}
          {/*<Route path="forms">
              <Route path="elements" component={FormElements}/>
          </Route>*/}
      </Route>
  </Route>
);



export default Routes

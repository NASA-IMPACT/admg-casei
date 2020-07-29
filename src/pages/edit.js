import React from "react"
import { Router } from "@reach/router"

import PrivateRoute from "../components/private-route"
import Campaign from "../templates/campaign"
import Instrument from "../templates/instrument"

const Edit = () => (
  <Router>
    {/* TODO: Build out components that should be displayed on edit */}
    <PrivateRoute path="/edit/campaign/*" component={Campaign} />
    <PrivateRoute path="/edit/instrument/*" component={Instrument} />
  </Router>
)

export default Edit

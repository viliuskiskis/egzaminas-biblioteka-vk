import React from "react";
import { Switch, Route } from "react-router-dom";
import CommonErrorHandler from "../00Services/CommonErrorHandler";
import AdminNavBar from "../02AdminComponents/00NavBar/AdminNavBar";
import UsersViewContainer from "../02AdminComponents/01UsersView/UsersViewContainer";
import UsersListContainer from "../02AdminComponents/01UsersView/UsersListContainer";
import KindergartenStatContainer from "../01CommonComponents/04KindergartenStatistics/KindergartenStatContainer";
import EventJournalContainer from "../02AdminComponents/03EventJournal/EventJournalContainer";
import UpdateProfileFormContainer from "../01CommonComponents/03UpdateProfile/UpdateProfileFormContainer";
import NotFound from "../01CommonComponents/02NotFound/NotFound";

export default function AdminRoutes() {
  return (
    <CommonErrorHandler>
      <div className="container-fluid px-0">
        <AdminNavBar>
          <Switch>
            <Route exact path="/" component={UsersViewContainer} />
            <Route exact path="/home" component={UsersViewContainer} />
            <Route exact path="/admin" component={UsersViewContainer} />
            <Route
              exact
              path="/statistika"
              component={KindergartenStatContainer}
            />
            <Route
              exact
              path="/naudotojai"
              component={UsersListContainer}
            />
            <Route
              exact
              path="/zurnalas"
              component={EventJournalContainer}
            />
            <Route
              exact
              path="/profilis/atnaujinti"
              component={UpdateProfileFormContainer}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </AdminNavBar>
      </div>
    </CommonErrorHandler>
  )
}
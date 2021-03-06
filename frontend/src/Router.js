/* Import Pre Headers */
import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { changeActiveDrawer } from '@actions/config';
import { sessionCheck } from "@actions/auth/signin";
import { IntlProvider } from "react-intl";
import { history } from "./history.js";
import { connect } from "react-redux";

import clsx from "clsx";
import Configure from "@config";
import Spinner from "@components/Spinner";
import Scrollbars from "react-custom-scrollbars";

/* Import Premixed Components */
const Header = lazy(() => import("@components/Header"));

/* Import Pages */
const News = lazy(() => import("@pages/News"));
const Signin = lazy(() => import("@pages/Signin"));
const Signup = lazy(() => import("@pages/Signup"));
const Profile = lazy(() => import("@pages/Profile"));
const Overview = lazy(() => import("@pages/Overview"));
const Chat = lazy(() => import("@pages/Chat"));
const Members = lazy(() => import("@pages/Members"));
const Groups = lazy(() => import("@pages/Groups"));
const Badges = lazy(() => import("@pages/Badges"));
const Trophy = lazy(() => import("@pages/Trophy"));
const Events = lazy(() => import("@pages/Events"));
const Forum = lazy(() => import("@pages/Forum"));
const Landing = lazy(() => import("@pages/Landing"));
const Page404 = lazy(() => import("@pages/Page404"));

const RouteConfig = ({
    component : Component,
    fullLayout,
    config,
    ...rest
}) => (
    <IntlProvider locale={config.locale} messages={Configure.locale[config.locale]}>
        <Route 
            {...rest}
            render = {props => {
                return (    
                        <main className="app-route-main">
                            <Header />
                            <div className={clsx("app-route-content", {"app-route-content-shift": config.drawerOpen})}>
                                <Scrollbars 
                                    autoHide 
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    thumbMinSize={0}
                                    universal
                                    className="app-styles-scroll-bar"
                                >
                                    <div className="app-route-container">
                                        <Component {...props} />
                                    </div>
                                </Scrollbars>
                            </div>
                        </main>
                )
            }}
        />
    </IntlProvider>
)
const mapStateToProps = state => {
    return {
        config : state.config
    }
}
const AppRoute = connect(mapStateToProps)(RouteConfig)

/* Declear Main App Router */
class AppRouter extends React.Component {
    async componentDidMount(){
        history.push('/')
        const location = window.location.pathname.split("/");
        this.props.changeActiveDrawer(location[1]);
        await this.props.sessionCheck();
    }
    componentDidUpdate(){
        if(!this.props.auth.session.isSession){
            if(window.location.pathname.indexOf("signup") >= 0)
                return;
            if(window.location.pathname.indexOf("landing") >= 0)
                return;
            history.push("/landing");
        }
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Suspense fallback={<Spinner />}>
                        <AppRoute exact path="/" component={News}/>
                        <AppRoute path="/news" component={News} />
                        <AppRoute path="/profile" component={Profile} />
                        <AppRoute path="/overview" component={Overview} />
                        <AppRoute path="/members" component={Members} />
                        <AppRoute path="/groups" component={Groups} />
                        <AppRoute path="/events" component={Events} />
                        <AppRoute path="/trophy" component={Trophy} />
                        <AppRoute path="/chat" component={Chat} />
                        <AppRoute path="/badges" component={Badges} />
                        <AppRoute path="/forum" component={Forum} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/landing" component={Landing} />
                        <Route component={Page404} />
                    </Suspense>
                </Switch>
            </Router>
        )
    }
}
const mapAppStateToProps = state => {
    return {
        auth : state.auth
    }
}
export default connect(mapAppStateToProps, {
    changeActiveDrawer,
    sessionCheck
})(AppRouter)



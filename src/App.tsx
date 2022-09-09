import * as React from 'react';
import './styles/App.scss';
import { getDashboardList } from './components/library/index';
import DashboardsList from './components/dashboards-list/DashboardsList';
import SignIn from './components/sign-in/Sign-In';
import { WynIntegration } from '@grapecity/wyn-integration';

export default class App extends React.Component<any, any> {

    ins: any;
    dashboardId: any;
    dashboardName: any;

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            username: '',
            serverUrl: '',
            dashboardID: '',
            docTitle: '',
            documentType: 'dbd',
            dashboardsList: null
        };

        this.selectedDashboard = this.selectedDashboard.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.createNewDashboard = this.createNewDashboard.bind(this);
        this.createViewer = this.createViewer.bind(this);
        this.openDashboardInDesigner = this.openDashboardInDesigner.bind(this);
        this.createDesigner = this.createDesigner.bind(this);
    }

    selectedDashboard = (dashboardId, name) => {        
        this.dashboardId = dashboardId;
        this.dashboardName = name;
        this.ins?.destroy?.();
        this.createViewer();
    }

    signIn = async (serverUrl, token, username) => {
        var dashboardsList = await getDashboardList(serverUrl, token);
        this.setState({ token: token, serverUrl: serverUrl, username: username, dashboardsList: dashboardsList });
    }

    signOut() {
        this.setState({ token: null });
    }

    createViewer = () => {
        WynIntegration.createDashboardViewer({
            baseUrl: this.state.serverUrl,
            dashboardId: this.dashboardId,
            //theme: 'red',
            token: this.state.token,
            // for v5.0, v5.1 ignore
            //version: '5.0.21782.0',
        }, '#wyn-root').then(ins => {
            this.ins = ins;            
        });
    }

    createNewDashboard = () => {
        this.ins?.destroy?.();       
        this.dashboardId = '';
        this.createDesigner();
    }

    openDashboardInDesigner = () => {
        this.ins?.destroy?.();
        if (this.dashboardId === '')
            alert('Please select a Dashboard');
        else
            this.createDesigner();
    }

    createDesigner = () => {
        WynIntegration.createDashboardDesigner({
            baseUrl: this.state.serverUrl,
            dashboardId: this.dashboardId,
            lng: 'en',
            token: this.state.token,
            // for v5.0, v5.1 ignore
            //version: '5.0.21782.0',
        }, '#wyn-root').then(ins => {
            this.ins = ins;
            //this.loading = false;
        });
    }

    render() {
        const { token, serverUrl, username, dashboardsList, dashboardID } = this.state;

        const Application = (
            <div className="app">
                {token == null && (
                    <SignIn signIn={this.signIn} />
                )}
                {token != null && (
                    <div className="app-root">
                        <div className="app-sidebar">
                            <div className="app-sidebar-header">
                                <div className="app-sidebar-header-group">
                                    <div id="app-portal-url">{serverUrl}</div>
                                </div>
                                <div className="app-sidebar-header-group app-user-info">
                                    <div>
                                        <div id="app-username">{username}</div>
                                    </div>
                                    <button id="app-logout-button" className="app-sidebar-btn app-logout-button" onClick={this.signOut}>Log Out</button>
                                </div>
                                <div className="app-sidebar-header-group">
                                    <button id="app-create-dashboard" className="app-sidebar-btn app-create-report-btn" type="button" onClick={this.createNewDashboard}>Create New Dashboard</button>
                                    <button id="app-open-dashboard-designer" className="app-sidebar-btn app-create-report-btn" type="button" onClick={this.openDashboardInDesigner}>Design Selected Dashboard</button>
                                </div>
                            </div>
                            <div className="app-sidebar-content">
                                <DashboardsList selectedDashboard={this.selectedDashboard} dashboardsList={dashboardsList} />
                            </div>                            
                        </div>
                        <div id='wyn-root'></div>
                    </div>
                )
                }
            </div>
        );
        return Application;
    }
}

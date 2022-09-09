import * as React from "react";
import "../../styles/DashboardsList.scss";

export default class DashboardsList extends React.Component<any, any> {

    dashboardIconSrc = "/images/dashboard.svg";

    constructor(props) {
        super(props);       
    }

    getIconSrc = (rpt: any) => {
        return this.dashboardIconSrc;
    }

    onDashboardClick = (dbd) => {        
        this.props.selectedDashboard(dbd.id, dbd.name);
    }

    public render() {
        const { dashboardsList } = this.props;

        return (
            <div className="dashboardsList">
                {dashboardsList.map((dbd, index) => {
                    return (
                        <div className="listItem" key={index} onClick={() => this.onDashboardClick(dbd)}>
                            <img src={this.getIconSrc(dbd)} alt={dbd.name} />
                            <h3>{dbd.name}</h3>
                        </div>)
                })}
            </div>
        )
    }
}

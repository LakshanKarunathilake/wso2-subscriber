import React from "react";
import PropTypes from "prop-types";
//Stylings
import "../css/PreLoader.css";
import "../css/Message.css";
import "../css/Selector.css";
//Widget configuration source
import widgetConf from "../../resources/widgetConf.json";
import VizG from "react-vizgrammar";
import moment from "moment";

import Widget from "../../mocking/Widget";

export class MyWidget extends Widget {
  state = {
    hasInfo: true,
    xAxis: "",
    colorCategorization: "",
    filter: "",
    metadata: {},
    dataSet: [],
    filteredDataSet: [],
    hasError: false,
    errorMsg: "",
    loading: "true",
    theme: "dark"
  };

  componentWillMount() {
    if (
      widgetConf.chartConfigs.xAxis &&
      widgetConf.chartConfigs.colorCategorization
    ) {
      this.state.xAxis = widgetConf.chartConfigs.xAxis;
      this.state.colorCategorization =
        widgetConf.chartConfigs.colorCategorization;
    } else {
      this.state.hasError = true;
      this.state.errorMsg =
        "Error in loading chart configurations from the widgetConf file ";
    }
  }

  componentDidMount() {
    try {
      if (this.state.dataSet.length === 0)
        super
          .getWidgetChannelManager()
          .subscribeWidget(
            this.props.id || "dummyID",
            this.formatDataToVizGrammar,
            widgetConf.configs.providerConfig
          );

      super.subscribe(message => {
        const filteredDataSet = this.filterDataForColumn(message);
        this.setState({
          filter: message,
          filteredDataSet,
          hasInfo: false
        });
      });
    } catch (error) {
      this.setState(
        {
          hasError: "true",
          errorMsg: "Error in @wso2-DashboardWidget" + error.message,
          loading: "false"
        },
        () => {
          console.error(
            "Error in loading the data using Dashboard Widget",
            error.message
          );
        }
      );
    }
  }

  componentWillReceiveProps() {
    if (this.props.glContainer) {
      this.props.glContainer.on("resize", () =>
        this.setState({
          width: this.props.glContainer.width,
          height: this.props.glContainer.height
        })
      );
    }
    if (this.props.muiTheme) {
      this.state.theme = this.props.muiTheme.name === "dark" ? "dark" : "light";
    }
  }

  formatDataToVizGrammar = stats => {
    if (stats.metadata != undefined) {
      const metaName_arr = [];
      const metaType_arr = [];
      stats.metadata.names.map(el => {
        metaName_arr.push(el);
      });
      stats.metadata.types.map(el => {
        metaType_arr.push(el.toLowerCase());
      });
      const metaVals = { ...this.state.metadata };
      metaVals.names = metaName_arr;
      metaVals.types = metaType_arr;

      this.setState({
        loading: false,
        metadata: metaVals,
        dataSet: stats.data
      });
    }
  };

  filterDataForColumn = filter => {
    const dateColumnIndex = this.state.metadata.names.indexOf(
      widgetConf.chartConfigs.dateColumn
    );

    const filterFromInSeconds = moment(filter.from).format("X");
    const filterToInSeconds = moment(filter.to).format("X");

    return this.state.dataSet.filter(element => {
      const dateValueInSeconds = moment(element[dateColumnIndex]).format("X");
      return (
        filterFromInSeconds < dateValueInSeconds &&
        filterToInSeconds > dateValueInSeconds
      );
    });
  };

  renderErrorMessage = () => {
    if (this.state.hasError === true)
      return (
        <div className="error message">
          <h2>Error</h2>
          <p>{this.state.errorMsg}</p>
        </div>
      );
  };

  renderInfoMessage = () => {
    if (this.state.hasInfo && !this.state.hasError) {
      return (
        <div className="information message">
          <h2>Info</h2>
          <p>Waiting until your first publish to subscribe.....</p>
        </div>
      );
    }
  };

  renderBarChart = () => {
    const {
      xAxis,
      metadata,
      colorCategorization,
      filteredDataSet,
      theme,
      dataSet,
      hasInfo
    } = this.state;
    if (dataSet.length != 0 && !hasInfo) {
      console.log("theme is ", theme);
      return (
        <VizG
          config={{
            charts: [
              {
                type: "arc",
                x: xAxis,
                color: colorCategorization,
                mode: "pie"
              }
            ],
            legendOrientation: "left",
            legend: true,
            style: {
              legendTextBreakLength: 50,
              legendTextSize: 12,
              legendTextColor: theme === "dark" ? "white" : "black"
            }
          }}
          metadata={metadata}
          data={filteredDataSet}
          theme={theme}
          height={this.props.glContainer.height}
          width={this.props.glContainer.width}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderInfoMessage()}
        {this.state.hasError && this.state.hasInfo
          ? undefined
          : this.renderBarChart()}
      </div>
    );
  }
}

// Verifying that the dashboard availability to register the widget in the portal
if (global.dashboard != undefined) {
  global.dashboard.registerWidget(widgetConf.name, MyWidget);
}

MyWidget.propTypes = {
  muiTheme: PropTypes.object
};

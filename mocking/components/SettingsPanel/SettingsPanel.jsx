import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  Grid,
  Tabs,
  Tab,
  AppBar,
  ExpansionPanelActions,
  IconButton,
  Typography,
  CssBaseline,
  ListItem,
  List,
  ListItemText,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import EventStack from "../EventStack/EventStack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const styles = {
  root: {
    // border: '1px solid red',
    // marginBottom: "10px",
    padding: "0px"
  },
  content: {
    margin: "0px",
    padding: "0px"
  },
  expanded: {
    margin: "0px",
    padding: "0px"
  }
};

export class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openExpansion: false,
      tabIndex: 0,
      subscriberModel: "Dummy publisher",
      startDate: "2018-01-01",
      endDate: "2018-12-31"
    };
  }

  syncTheEventStacks = eventStack => {
    this.setState({ eventStack });
  };

  changeTheme = theme => {
    this.setState({ theme });
    this.props.changeTheme(theme);
  };

  renderThemeConfigs = () => {
    return (
      <div style={{ width: "100%" }}>
        <p>
          Select the theme applied for the widget you can default theme
          configurations are dark and light{" "}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              backgroundColor: "#18242a",
              color: "white",
              marginLeft: "30px"
            }}
            size={"small"}
            onClick={() => this.changeTheme("dark")}
          >
            Dark Theme
          </Button>
          <Button
            size={"small"}
            style={{
              borderColor: "#18242a",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "#18242a",
              marginLeft: "30px"
            }}
            onClick={() => this.changeTheme("light")}
          >
            Light Theme
          </Button>
        </div>
      </div>
    );
  };

  renderPublisherConfigs = () => {
    const publisherEventStack = JSON.parse(
      localStorage.getItem("publisherEventStack")
    );
    return (
      // <List component="nav">
      <div>
        <Typography>Event Stack</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.calories}</TableCell>
                  <TableCell numeric>{row.fat}</TableCell>
                  <TableCell numeric>{row.carbs}</TableCell>
                  <TableCell numeric>{row.protein}</TableCell>
                </TableRow>
              );
            })} */}
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell numeric>Calories</TableCell>
              <TableCell numeric>Fat (g)</TableCell>
              <TableCell numeric>Carbs (g)</TableCell>
              <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };

  renderSubscriberConfigs = eventStack => {
    console.log("eventStack", eventStack);
    const { setSimulationModel } = this.props;
    return (
      <div>
        <Typography style={{ fontWeight: "bold" }}>Simulation Model</Typography>
        <FormControl component="fieldset" style={{ marginLeft: "20px" }}>
          <RadioGroup
            style={{ display: "inline", justifyContent: "space-between" }}
            value={this.state.subscriberModel}
            onChange={event => {
              const value = event.target.value;
              this.setState({ subscriberModel: value }, () => {
                setSimulationModel(value);
              });
            }}
          >
            <FormControlLabel
              value="Custom values"
              control={<Radio />}
              label="Custom values"
            />
            <FormControlLabel
              value="Dummy publisher"
              control={<Radio />}
              label="Dummy publisher"
            />
          </RadioGroup>
        </FormControl>
        {this.state.subscriberModel === "Custom values" &&
          this.renderCustomPublisher(eventStack)}
        <Typography style={{ fontWeight: "bold" }}>Event Stack</Typography>
        <EventStack eventStack={eventStack} />
      </div>
    );
  };

  renderCustomPublisher = () => {
    const { startDate, endDate } = this.state;
    return (
      <div>
        <Typography>You can publish your own name value pair</Typography>
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          <span>
            <DatePicker
              selected={startDate}
              onChange={date => {
                this.setState({ startDate: date });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <DatePicker
              selected={endDate}
              onChange={date => {
                this.setState({ endDate: date });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
          </span>

          <Button
            size={"small"}
            color={"primary"}
            style={{ float: "right" }}
            onClick={this.handleCustomDateEventPublish}
          >
            Publish
          </Button>
        </div>
      </div>
    );
  };

  handleCustomDateEventPublish = () => {
    const { startDate, endDate } = this.state;
    const { updateEventStack } = this.props;
    const dateRange = {
      from: startDate,
      to: endDate
    };
    global.callBackFunction(dateRange);
    const eventStack = JSON.parse(localStorage.getItem("eventStack"));
    eventStack.events.push(dateRange);
    console.log("events", eventStack.events);
    updateEventStack(eventStack);
    localStorage.setItem("eventStack", JSON.stringify(eventStack));
  };

  render() {
    const { classes, publisherSimulation } = this.props;
    const { tabIndex, openExpansion } = this.state;
    console.log("states of settings panel", this.state);
    return (
      <div>
        <ExpansionPanel
          style={{ marginBottom: "5px" }}
          expanded={this.state.openExpansion}
        >
          <ExpansionPanelSummary
            classes={{
              root: classes.root,
              content: classes.content,
              expanded: classes.expanded
            }}
            style={{ padding: "0px", margin: "0px" }}
          >
            <AppBar
              position="static"
              style={{
                backgroundColor: "#222425",
                margin: "0px",
                padding: "0px"
              }}
            >
              <Tabs
                style={{
                  margin: "0px",
                  padding: "0px"
                }}
                value={tabIndex}
                onChange={(value, event) => {
                  if (tabIndex === event && openExpansion) {
                    this.setState({
                      openExpansion: false
                    });
                  } else {
                    this.setState({ tabIndex: event, openExpansion: "true" });
                  }
                }}
                fullWidth
              >
                <Tab label="Theme" style={{ color: "#fe5200" }} />
                <Tab label="Publisher" style={{ color: "#fe5200" }} />
                <Tab
                  label="Publisher Simulations"
                  style={{ color: "#fe5200" }}
                />
              </Tabs>
            </AppBar>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{
              border: "1px solid #222425",
              padding: "15px",
              display: "block"
            }}
          >
            {tabIndex === 0 && this.renderThemeConfigs()}
            {tabIndex === 1 && this.renderPublisherConfigs()}
            {tabIndex === 2 &&
              this.renderSubscriberConfigs(publisherSimulation.eventStack)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(SettingsPanel);

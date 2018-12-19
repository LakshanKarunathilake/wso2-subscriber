import {
  Card,
  CardHeader,
  CardContent,
  MuiThemeProvider,
  createMuiTheme,
  IconButton,
  Fab,
  Tooltip,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import widgetConf from "../../../resources/widgetConf.json";
import Resizable from "re-resizable";
import TuneIcon from "@material-ui/icons/Tune";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import TabIcon from "@material-ui/icons/Tab";
import SettingsModal from "../Settings/SettingsModal.jsx";
import SettingsPanel from "../SettingsPanel/SettingsPanel.jsx";

const style = {
  resizableBox: {
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  },
  cardHeader: {
    // height: "10%",
    // padding: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleOptionsTray: {
    float: "right",
    display: "inline",
    fontSize: "1rem"
  },
  cardContent: {
    padding: "0px",
    backgroundColor: "#1a262e",
    height: "100%",
    border: "1px solid black"
  },
  optionsMenuIcon: {
    position: "absolute",
    right: "20px",
    bottom: "20px",
    color: "#ffffff"
  },
  iconButton: {
    padding: "8px"
  }
};
const Theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 0
      }
    },
    MuiCardHeader: {
      root: {
        border: "1px solid black",
        height: "4%",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingRight: "0px",
        minHeight: "30px"
      },
      title: {
        fontSize: "0.5rem",
        color: "#ffffff"
      }
    },
    MuiButtonBase: {
      margin: "0px"
    },
    MuiExpansionPanelSummary: {
      content: {
        padding: "0px",
        margin: "0px"
      }
    }
  }
});

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glContainer: undefined,
      modalView: false,
      maximizeButtonColor: "white",
      exportButtonColor: "white",
      buttonBaseColor: "white",
      theme: "dark",
      defaultContainer: undefined,
      glContainer: { width: "100%", height: "100%", on: event => {} },
      publisherSimulation: {
        eventStack: undefined,
        simulationModel: "Dummy publisher"
      }
    };
    window.addEventListener("resize", () => {
      console.log("resizing");
      this.setState({
        glContainer: {
          width: this.cardContent.clientWidth,
          height: this.cardContent.clientHeight,
          on: event => {}
        }
      });
    });
  }

  componentWillReceiveProps() {
    console.log("will reciewve props in frame");
  }

  componentDidMount() {
    this.setState({
      glContainer: {
        width: this.cardContent.clientWidth,
        height: this.cardContent.clientHeight,
        on: event => {}
      }
    });
  }

  toggleConfigMenu = () => {
    this.state.modalView
      ? this.setState({ modalView: false })
      : this.setState({ modalView: true });
  };

  changeTheme = theme => {
    theme === "dark"
      ? this.setState({
          theme: "dark",
          exportButtonColor: "white",
          maximizeButtonColor: "white",
          buttonBaseColor: "white"
        })
      : this.setState({
          theme: "light",
          exportButtonColor: "black",
          maximizeButtonColor: "black",
          buttonBaseColor: "black"
        });
  };

  setGLContainerSize = () => {
    this.setState(
      {
        glContainer: {
          width: this.cardContent.clientWidth,
          height: this.cardContent.clientHeight,
          on: event => {}
        }
      },
      () => {
        console.log("setGlContainer");
      }
    );
  };

  setSimulationModel = model => {
    console.log("model", model);
    const { publisherSimulation } = this.state;
    publisherSimulation.simulationModel = model;
    this.setState({ publisherSimulation });
  };

  updateEventStack = eventStack => {
    const { publisherSimulation } = this.state;
    publisherSimulation.eventStack = eventStack;
    this.setState({ publisherSimulation });
  };

  render() {
    console.log("frame states", this.state);
    const { publisherSimulation } = this.state;
    //Mapping additional to the props.children
    const childrenWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        glContainer: this.state.glContainer,
        muiTheme: {
          name: this.state.theme
        },
        publisherSimulation: {
          updateEventStack: this.updateEventStack,
          simulationModel: this.state.publisherSimulation.simulationModel
        }
      });
    });

    return (
      <MuiThemeProvider theme={Theme}>
        <SettingsPanel
          publisherSimulation={publisherSimulation}
          setSimulationModel={this.setSimulationModel}
          updateEventStack={this.updateEventStack}
          changeTheme={this.changeTheme}
        />
        <Resizable
          ref={c => {
            this.resizable = c;
          }}
          onResizeStop={(e, direction, ref, d) => {
            this.setState({
              glContainer: {
                width: this.cardContent.clientWidth,
                height: this.cardContent.clientHeight,
                on: event => {}
              }
            });
          }}
          style={style.resizableBox}
          defaultSize={{
            height: "96%",
            width: "100%"
          }}
          maxWidth={"100%"}
          maxHeight={"96%"}
        >
          <Card style={{ height: "100%" }}>
            <CardHeader
              title={
                <div style={style.cardHeader}>
                  <Typography
                    style={
                      this.state.theme === "dark"
                        ? {
                            color: "white",
                            fontSize: "0.5rem",
                            float: "left"
                          }
                        : {
                            color: "black",
                            fontSize: "0.5rem",
                            float: "left"
                          }
                    }
                  >
                    {widgetConf.name.toUpperCase()}
                  </Typography>
                  <div style={style.titleOptionsTray}>
                    <IconButton
                      style={{
                        ...style.iconButton,
                        color: this.state.exportButtonColor
                      }}
                      onMouseEnter={() =>
                        this.setState({ exportButtonColor: "#ee6c09" })
                      }
                      onMouseLeave={() =>
                        this.setState({
                          exportButtonColor: this.state.buttonBaseColor
                        })
                      }
                    >
                      <SaveAltIcon />
                    </IconButton>
                    <IconButton
                      style={{
                        ...style.iconButton,
                        color: this.state.maximizeButtonColor
                      }}
                      onMouseEnter={() =>
                        this.setState({ maximizeButtonColor: "#ee6c09" })
                      }
                      onMouseLeave={() =>
                        this.setState({
                          maximizeButtonColor: this.state.buttonBaseColor
                        })
                      }
                      onClick={() => {
                        this.resizable.updateSize({
                          width: "100%",
                          height: "100%"
                        });
                        window.setTimeout(() => {
                          this.setState({
                            glContainer: {
                              width: this.cardContent.clientWidth,
                              height: this.cardContent.clientHeight,
                              on: event => {}
                            }
                          });
                        }, 0);
                      }}
                    >
                      <TabIcon />
                    </IconButton>
                  </div>
                </div>
              }
              style={
                this.state.theme === "dark"
                  ? { backgroundColor: "#1f2c33" }
                  : { backgroundColor: "#ffffff" }
              }
            />
            <div
              ref={content => {
                this.cardContent = content;
              }}
              style={{
                height: "96%"
              }}
            >
              <CardContent
                style={
                  this.state.theme === "dark"
                    ? {
                        ...style.cardContent,
                        backgroundColor: "#1a262e"
                      }
                    : {
                        ...style.cardContent,
                        backgroundColor: "#ffffff"
                      }
                }
              >
                {childrenWithProp}
              </CardContent>
            </div>
          </Card>
        </Resizable>

        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "100%"
          }}
        />
        <Tooltip title={"Options"}>
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            variant="outlined"
            style={style.optionsMenuIcon}
            onClick={this.toggleConfigMenu}
          >
            <TuneIcon />
          </Fab>
        </Tooltip>
        {this.state.modalView && (
          <SettingsModal
            open={this.state.modalView}
            modalClose={this.toggleConfigMenu}
            changeTheme={this.changeTheme}
          />
        )}
      </MuiThemeProvider>
    );
  }
}

export default Frame;

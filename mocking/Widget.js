import { Component } from 'react';
import ChannelManager from './ChannelManager';

export default class Widget extends Component {
  componentWillUpdate(nextProps, nextState) {
    this.state.theme = nextProps.muiTheme.name;
    const { publisherSimulation } = nextProps.simulation;
    const { randomPublisherRunningStatus, subscribeCallBack } = this.state;
    this.state.publishModel = publisherSimulation.simulationModel;
    if (publisherSimulation.simulationModel === 'Custom values') {
      clearInterval(this.intervalFunction);
      this.state.randomPublisherRunningStatus = false;
    }
    if (
      randomPublisherRunningStatus === false
      && publisherSimulation.simulationModel === 'Dummy publisher'
    ) {
      this.publishEventsWithInterval(subscribeCallBack);
      this.state.randomPublisherRunningStatus = true;
    }
  }

  getWidgetChannelManager() {
    return ChannelManager;
  }

  publish(message) {
    console.log('Published Message :', message);
  }

  subscribe(callBackFunction) {
    const { simulationModel } = this.props.simulation.publisherSimulation;
    this.setState({
      subscribeCallBack: callBackFunction,
      randomPublisherRunningStatus: true,
      publishModel: simulationModel,
    });
    // localStorage.clear();
    // localStorage.setItem('eventStack', JSON.stringify({ events: [] }));
    if (simulationModel === 'Dummy publisher') {
      this.publishEventsWithInterval(callBackFunction);
    }

    global.callBackFunction = callBackFunction;
  }

  publishEventsWithInterval(callBackFunction) {
    this.intervalFunction = setInterval(() => {
      const { simulation } = this.props;
      const { publisherSimulation } = simulation;

      const randomStart = this.randomDate(
        new Date('2018', '01', '01'),
        new Date(),
      );
      const randomEnd = this.randomDate(randomStart, new Date());

      // const eventStack = JSON.parse(localStorage.getItem('eventStack'));
      const eventStack = publisherSimulation.eventStack;
      eventStack.push({ from: randomStart, to: randomEnd });
      // localStorage.setItem('eventStack', JSON.stringify(eventStack));
      simulation.updateEventStack(eventStack);
      callBackFunction({ from: randomStart, to: randomEnd });
    }, 5000);
  }

  getRandomData() {
    const random = Math.floor(Math.random() * 1546280999000) + 3153600000;
    return random;
  }

  randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }
}

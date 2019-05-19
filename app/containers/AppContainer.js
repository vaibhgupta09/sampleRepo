import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, AppRegistry } from "react-native";
import PeopleList from "../components/ContactList";
import { fetchCNList } from '../redux/actions/listActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BackgroundFetch from "react-native-background-fetch";

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Configure it.
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,   // <-- Android-only,
      startOnBoot: true         // <-- Android-only
    }, () => {
      //	
      console.log("[js] Received background-fetch event");
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          this.props.fetchCNList();
          break;
      }
    });
  }

  render() {

    let content = <PeopleList people={this.props.listItem.people} />;
    if (this.props.listItem.isFetching) {
      content = <ActivityIndicator size="large" />;
    }
    return <View style={styles.container}>{content}</View>;
  }
}
AppContainer.propTypes = {
  fetchCNList: PropTypes.func.isRequired,
  listItem: PropTypes.object.isRequired
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#093339"
  }
});
const mapStateToProps = state => {
  return {
    listItem: state
  };
};
export default connect(mapStateToProps, { fetchCNList })(AppContainer);
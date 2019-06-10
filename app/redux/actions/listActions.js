import {
  FETECHING_CNLIST_REQUEST,
  FETECHING_CNLIST_SUCCESS,
  FETECHING_CNLIST_FAILURE
} from './types'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
export const fetechingCNListRequest = () => ({ type: FETECHING_CNLIST_REQUEST });
export const fetechingCNListSuccess = json => ({
  type: FETECHING_CNLIST_SUCCESS,
  payload: json
});
export const fetechingCNListFailure = error => ({
  type: FETECHING_CNLIST_SUCCESS,
  payload: error
});
export const fetchCNList = () => {
  return async dispatch => {
    dispatch(fetechingCNListRequest());
    try {
      var pushedContacts = [];
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.'
        }
      ).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
            alert('Permission denied');
          } else {
           
            var i = 0;
            while (i < 2) {
              alert(JSON.stringify(contacts[i]))
              if (contacts[i].givenName != null) {
                if (0 in contacts[i].phoneNumbers) {
                  const phone = contacts[i].phoneNumbers[0].number;
                  const name = contacts[i].givenName;
                  //pushedContacts.push({ contact });
                  pushedContacts.push(contacts[i]); 
                }
              }
            
              i++;
            }

            dispatch(fetechingCNListSuccess(pushedContacts));         
            let formdata = new FormData();         
            formdata.append("func", 'neo4j');
            formdata.append('data', JSON.stringify(pushedContacts));          
            fetch('https://www.softwareapuestasonline.com/ApiNeo4j/index.php ', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formdata,
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
            })  
            .catch((error) => {
              console.error(error);
            });
          
          }
        })
      })


    }
    catch (error) {
      dispatch(fetechingCNListFailure(error));
    }
  }
}

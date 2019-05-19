import {
    FETECHING_CNLIST_REQUEST,
FETECHING_CNLIST_SUCCESS,
FETECHING_CNLIST_FAILURE
} from './types'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
export const fetechingCNListRequest =() =>({type:FETECHING_CNLIST_REQUEST});
export const fetechingCNListSuccess =json =>({
    type:FETECHING_CNLIST_SUCCESS,
    payload:json
});
export const fetechingCNListFailure =error =>({
    type:FETECHING_CNLIST_SUCCESS,
    payload:error
});
export const fetchCNList =()=>{
    return async dispatch =>{
        dispatch(fetechingCNListRequest());
        try{
            var pushedContacts=[];
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                  'title': 'Contacts',
                  'message': 'This app would like to view your contacts.'
                }
              ).then(() => {
                Contacts.getAll((err, contacts) => {
                  if (err === 'denied'){
                    // error
                  }  else {
                    var i = 0;
                    while (i < 20) {
                      if (contacts[i].givenName != null) {
                        if (0 in contacts[i].phoneNumbers) {
                          const phone = contacts[i].phoneNumbers[0].number;
                          const name = contacts[i].givenName;
                          pushedContacts.push({name:name,phone:phone});
                        }
                      }
                      i++;
                    }
                  
                  dispatch(fetechingCNListSuccess(pushedContacts));
                }
                })
              })
             
           
        }
        catch(error)
        {
            dispatch(fetechingCNListFailure(error));
        }
    }
}
import {
    FETECHING_CNLIST_REQUEST,
FETECHING_CNLIST_SUCCESS,
FETECHING_CNLIST_FAILURE
} from '../actions/types'

const initialState={
    isFetching:false,
    errorMessage:'',
    people:[]
}
const listReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETECHING_CNLIST_REQUEST:
        return{...state,isFetching:true};
        case FETECHING_CNLIST_FAILURE:
        return{...state,isFetching:false,errorMessage:action.payload};
        case FETECHING_CNLIST_SUCCESS:
        return{...state,isFetching:false,people:action.payload};
        default:
        return state;
    }
}
export default listReducer;

import { handleActions } from 'redux-actions';
import { uploadContacts } from './upload-contacts';

const initialState = {
  error: false,
  message: null,
  success: false,
  isFetching: true,
};

export default handleActions(
  {
    ...uploadContacts,
  },
  initialState
)
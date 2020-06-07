export const updateBatch = {
  UPDATE_CAMPAIGN:
    (state, action) => {
      return Object.assign({}, state, {
        error: action.payload.error,
        success: action.payload.success,
        message: action.payload.message,
        response_data: action.payload.data,
        isFetching: action.payload.isFetching,
      });
    },
}

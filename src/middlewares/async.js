export default function({ dispatch }){
  return next => action => {

    // if action does not have payload or does not have a .then property,
    // we don't care about it, send it on to next middleware
    if (!action.payload || !action.payload.then) {
      // next = next middleware in the pipeline
      return next(action)
    }

    // PROMISE EXISTS! Make sure the action's promise resolves
    action.payload
      .then(response => {
        // Create a new action with the old type, but replace with new payload
        // (no promise, just response data)
        const newAction = { ...action, payload: response }

        // dispatch = return to top most call and re-run action through
        // all middleware again
        dispatch(newAction);
      })
  }
}

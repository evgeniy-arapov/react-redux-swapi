export default store => next => action => {
  console.log(action.type)
  console.log("action.name: ", action.name)
  try {
    next(action)
  } catch (error) {
    console.error(error)
    return error
  }
}
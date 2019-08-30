export default store => next => action => {
  try {
    next(action)
  } catch (error) {
    console.error(error)
    return error
  }
}
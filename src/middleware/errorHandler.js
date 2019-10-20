export default store => next => action => {
  console.log("============================================")
  console.log(action.type)
  console.log("action.name: ", action.name)
  console.log(action.payload)
  console.log("============================================")

  try {
    next(action)
  } catch (error) {
    console.error(error)
    return error
  }
}
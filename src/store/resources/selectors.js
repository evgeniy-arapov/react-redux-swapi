export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  return state.resources[name]
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}
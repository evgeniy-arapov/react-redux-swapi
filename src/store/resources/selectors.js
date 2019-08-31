export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  const resources = (state.resources[name] && state.resources[name].data) || {}
  return Object.keys(resources).map(el => resources[el])
}

export function getResourcesMeta (state, name) {
  return state.resources[name] && {page: state.resources[name].page, count: state.resources[name].count}
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}
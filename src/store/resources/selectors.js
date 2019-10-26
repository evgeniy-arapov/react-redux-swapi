export function getResourcesNames (state) {
  return Object.keys(state.resources.resourcesMap)
}

export function getResources (state, name) {
  const resources = (state.resources[name] && state.resources[name].data) || {}
  return Object.keys(resources).map(el => resources[el])
}

export function getPageResources (state, name, params) {
  const resources = state.resources[name]
  let resourcesPage
  if (resources) {
    const search = params ? params.search : resources.search

    if (search) {
      resourcesPage = resources.searchMap.pageIndexes
    } else {
      const page = params ? params.page : resources.pageMap.page
      resourcesPage = resources.pageMap && resources.pageMap.pagesIndexes && resources.pageMap.pagesIndexes[page]
    }
  }
  return resourcesPage ? resourcesPage.map(el => resources.data[el]) : []
}

export function getResourcesMeta (state, name) {
  const resources = state.resources[name]

  if (resources) {
    const search = resources.search
    const currentMap = search ? resources.searchMap : resources.pageMap
    if (currentMap) {
      const page = +currentMap.page
      const count = +currentMap.count
      const perPage = 10
      const lastPage = Math.ceil(count / perPage)

      return {
        page,
        count,
        perPage,
        lastPage,
        search
      }
    }
  }
  return {}
}

export function getResource (state, name, id) {
  return state.resources[name] && state.resources[name].data[id]
}
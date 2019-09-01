import { Model, attr, ORM} from "redux-orm"

class Resource extends Model {
  toString () {
    return this.name || this.title || super.toString()
  }
}

Resource.modelName = "Resource"
Resource.fields = {
  id: attr(),
  url: attr(),
  created: attr(),
  edited: attr()
}

const orm = new ORM()
orm.register(Resource)

export default orm
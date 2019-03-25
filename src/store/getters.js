const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  items: state => state.table.items,
  listQuerys: state => state.table.listQuery,
  totals: state => state.table.total
}
export default getters

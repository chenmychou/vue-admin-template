import { stat } from "fs";

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  curAdminType: state => state.user.adminType,
  items: state => state.table.items,
  listQuerys: state => state.table.listQuery,
  totals: state => state.table.total,
  detailData: state => state.table.detailData,
  companyData: state => state.table.companyData,
  excelFile: state => state.table.excelFile,
  loadExcelUrl: state => state.table.loadExcelUrl
}
export default getters

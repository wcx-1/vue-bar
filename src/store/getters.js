const getters = {
  // 就是一个中转站，所有的公共数据都从getters调，getters再根据名称去别处调
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

// may need to import router here for redirect

module.exports = {
  login(email, pass, cb) {
    //TODO: connectSocket and login to get token
    // may need to redirect
    //
    // cb = arguments[arguments.length - 1]
    // if (localStorage.token) {
    //   if (cb) cb(true)
    //   this.onChange(true)
    //   return
    // }
    // pretendRequest(email, pass, (res) => {
    //   if (res.authenticated) {
    //     localStorage.token = res.token
    //     if (cb) cb(true)
    //     this.onChange(true)
    //   } else {
    //     if (cb) cb(false)
    //     this.onChange(false)
    //   }
    // })
  },

  getToken() {
    return window.sessionStorage.getItem('token');
  },

  logout(cb) {
    //TODO: delete token
    // if (cb) cb()
    // this.onChange(false)
  },

  loggedIn() {
    return !!window.sessionStorage.getItem('token');
  },

  onChange() {}
}
// some helper function:
// function pretendRequest(email, pass, cb) {
//   setTimeout(() => {
//     if (email === 'joe@example.com' && pass === 'password1') {
//       cb({
//         authenticated: true,
//         token: Math.random().toString(36).substring(7)
//       })
//     } else {
//       cb({ authenticated: false })
//     }
//   }, 0)
// }

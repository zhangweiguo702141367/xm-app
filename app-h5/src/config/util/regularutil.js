// 校验用户名是否合法
export const loginName = name => {
  if (!name) return '请输入登录名'
  if (name.match('@') == null) {
    if (!(/^1[34578]\d{9}$/.test(name))) {
      return '登录名不合法，请重新输入'
    } else {
      return '合法'
    }
  } else {
    if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+.)+(com|cn|net|org)$/.test(name))) {
      return '登录名不合法，请重新输入'
    } else {
      return '合法'
    }
  }
}
// 校验注册用户名是否合法
export const registerName = name => {
  if (!name) return '请输入登录名'
  if (name.match('@') == null) {
    if (!(/^1[34578]\d{9}$/.test(name))) {
      return '登录名不合法，请重新输入'
    } else {
      return '合法'
    }
  }
}
// 校验注册用户名是否合法
export const password = name => {
  console.debug(name)
  return '合法'
}
export const code6 = code => {
  if (code.length === 0 || code.length !== 6) {
    return '请输入6位数字验证码！'
  }
  let pasreg = /\d{6}/
  if (!pasreg.test(code)) {
    return '请输入6位数字验证码！'
  }
  return '合法'
}
export const emailLegal = emailval => {
  if (emailval.length === 0) {
    return '请输入认证邮箱！'
  }
  let pasreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/
  if (!pasreg.test(emailval)) {
    return '请输入合法的邮箱地址！'
  }
  return '合法'
}

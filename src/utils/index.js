export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) { // eslint-disable-line
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [{
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 构建tree
 * @param data
 * @param id
 * @param pid
 * @param name
 * @returns {Array}
 */
export function toTreeData(data, id = 'id', pid = 'pid', name = 'name') {
  let parent = []
  let parentId = 9999
  for (let i = 0; i < data.length; i++) {
    if (data[i][pid] === parentId || data[i][pid] === null || data[i][pid] === '9999_baseMap') {
      let obj = Object.assign({}, data[i])
      obj.label = data[i][name]
      obj.id = data[i][id]
      obj.children = []
      obj.type = data[i].type
      parent.push(obj)
    }
  }
  children(parent)

  // 递归
  function children(parent) {
    if (data.length !== 0) {
      for (let i = 0; i < parent.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (parent[i].id === data[j][pid]) {
            let obj = Object.assign({}, data[j])
            obj.label = data[j][name]
            obj.id = data[j][id]
            obj.children = []
            parent[i].children.push(obj)
          }
        }
        children(parent[i].children)
      }
    }
  }
  return parent
}
/**
 * Filter the routing from customized json
 * @param {Array} menuArr mock/menu.json
 */
export function convertMenu(menuArr) {
  let constantRouterMap = []
  menuArr.forEach((currentItem, menuIndex) => {
    let index = currentItem.id.indexOf('-') + 1
    let firstArr = {}
    let childrenA = currentItem.children
    let folder = currentItem.id.substr(index) === '' ? 'defaultView' : currentItem.id.substr(index)
    childrenA.forEach((item, i) => {
      let compoentPath = item.id.substr(index) === '' ? 'defaultView' : item.id.substr(index)
      let currentObj = {
        path: '/' + item.id.substr(index),
        component: () => import('@/views/' + folder + '/' + `${compoentPath}`),
        meta: { title: item.name, icon: item.id, menuIndex },
        children: item.children.length ? findChild(item.children, folder) : []
      }
      constantRouterMap.push(currentObj)
    })

    function findChild(child) {
      const arr = []
      for (let i = 0; i < child.length; i++) {
        arr.push({
          path: '/' + item.id.substr(index) + '/' + child[i].id.substr(index),
          component: () => import('@/views/' + folder + '/' + `${compoentPath}` + '/' + child[i].id.substr(index)),
          meta: {
            title: child[i].name,
            icon: child[i].id,
            i
          },
          children: child[i].children.length ? findChild(child[i].children) : []
        })
      }
      return arr
    }
    // childrenA.forEach(current => {
    //   let index = current.id.indexOf('-') + 1
    //   let childA = current.children
    //   firstArr = {
    //     path: '/' + current.id.substr(index),
    //     // component: () => import('@/views/layout/components/AppMain'),
    //     component: () => import('@/views/layout/components/AppMain'),
    //     // redirect: childA[0].key,
    //     meta: { title: current.name, icon: current.id, menuIndex },
    //     children: []
    //   }
    //   if (!childA.length) {
    //     let compoentPath = current.id === '' ? 'defaultView' : currentItem.id.substr(index) + '/' + current.id.substr(index)
    //     let rPath = current.id.substr(index) === '' ? 'abcdef' + Math.round(Math.random().toFixed(10) * 10e10) : current.id.substr(index)
    //     firstArr.children.push({
    //       path: '/' + rPath,
    //       name: current.name,
    //       component: () => import('@/views/' + `${compoentPath}`),
    //       meta: { title: current.name, icon: current.id }
    //     })
    //   } else {
    //     // convertChildren(childA)
    //     childA.forEach(cur => {
    //       if (cur.children.length) {
    //         let lastArr = {
    //           path: '/' + cur.id.substr(index),
    //           // component: () => import('@/views/layout/components/AppMain'),
    //           component: () => import('@/views/layout/components/AppMain'),
    //           meta: { title: cur.name, icon: cur.id, menuIndex },
    //           children: []
    //         }
    //         cur.children.forEach(lastItem => {
    //           let compoentPath =
    //             current.id === 'abcdef'
    //               ? 'defaultView'
    //               : lastItem.id +
    //               '/' +
    //               current.id.substr(index) +
    //               '/' +
    //               cur.id
    //           let rPath =
    //             lastItem.id.substr(index) === 'abcdef'
    //               ? 'abcdef' + Math.round(Math.random().toFixed(10) * 10e10)
    //               : lastItem.id.substr(index)
    //           lastArr.children.push({
    //             path: '/' + rPath,
    //             name: lastItem.name,
    //             component: () => import('@/views/' + `${compoentPath}`),
    //             meta: { title: lastItem.name, icon: lastItem.id }
    //           })
    //         })
    //         firstArr.children.push(lastArr)
    //       } else {
    //         let compoentPath =
    //           cur.id === 'abcdef'
    //             ? 'defaultView'
    //             : currentItem.id.substr(index) +
    //             '/' +
    //             current.id.substr(index)
    //         let rPath =
    //           cur.id === 'abcdef'
    //             ? 'abcdef' + Math.round(Math.random().toFixed(10) * 10e10)
    //             : cur.id.substr(index)
    //         firstArr.children.push({
    //           path: '/' + rPath,
    //           name: cur.name,
    //           component: () => import('@/views/' + `${compoentPath}`),
    //           meta: { title: cur.name, icon: cur.id }
    //         })
    //       }
    //     })
    //   }
    //   // currentMenu.children.push(firstArr)
    //   constantRouterMap.push(firstArr)
    // })
    // // constantRouterMap.push(currentMenu)
  })
  return constantRouterMap
}



/**
 * 获取所有组件
 */
export function findComponent(vueInstance, componentTag) {

  let component = null
  let allComp = getAllChildComp(vueInstance)
  let i = allComp.findIndex(function (vm) {
    return vm.$options._componentTag === componentTag
  })
  if (i !== -1) {
    component = allComp[i]
  }
  return component
}
/**
 * 获取当前组件
 */
export function getAllChildComp(instance) {
  let allComp = []
  let child
  if (Object.prototype.toString.call(instance) === '[object Object]') {
    child = instance.$children
  } else if (Object.prototype.toString.call(instance) === '[object Array]') {
    child = instance
  }
  for (let i = 0; i < child.length; i++) {
    allComp.push(child[i])
    if (child[i].$children.length > 0) {
      // 还有孩子
      allComp = allComp.concat(getAllChildComp(child[i].$children))
    }
  }
  return allComp
}

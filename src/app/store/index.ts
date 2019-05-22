export function counterReducer(state = {}, action: {type, payload}) {
  const code = GetQueryString('code');
  sessionStorage.setItem('code', code);
  switch (action.type) {
    case 'SET_BANNERLIST':
      return action.payload;
    case 'GET_BANNERLIST':
      return state;
  }
}

function GetQueryString(name: string) {
  const reg = new RegExp( '(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) { return unescape(r[2]); } return null; // 返回参数值
}

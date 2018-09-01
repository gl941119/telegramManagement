export default class Util {
    dateFormat(date, type = 'date') {
        if (date instanceof Date) {
            let mat = {};
            mat.M = date.getMonth() + 1; // 月份记得加1
            mat.H = date.getHours();
            mat.s = date.getSeconds();
            mat.m = date.getMinutes();
            mat.Y = date.getFullYear();
            mat.D = date.getDate();
            mat.d = date.getDay(); // 星期几
            mat.d = this._check(mat.d);
            mat.H = this._check(mat.H);
            mat.M = this._check(mat.M);
            mat.D = this._check(mat.D);
            mat.s = this._check(mat.s);
            mat.m = this._check(mat.m);
            if (type === 'time') {
                return `${mat.Y}-${mat.M}-${mat.D} ${mat.H}:${mat.m}:${mat.s}`;
            } else {
                return `${mat.Y}-${mat.M}-${mat.D}`;
            }
        } else {
            return date;
        }
    }
    // 检查是不是两位数字，不足补全
    _check(str) {
        str = str.toString();
        if (str.length < 2) {
            str = '0' + str;
        }
        return str;
    }

    // power add and delete
    arrayAddOrDel(sel, ids, list) {
        try {
            let temp = list.filter(item => !ids.includes(item));

            temp.push(...sel);
            return temp;
        } catch (error) {
            console.error('arrayAddOrDel ->', error);
            return [];
        }
    }
    websocketJoin(type,dname,msg='null'){
      return JSON.stringify({
        "device":"mclient",
        "type":type,
        "data":{
          "uid":window.sessionStorage.getItem('userid'),
          "dname":dname,
          "msg":msg
        }
      })
    }
    timeCycle(data){
      if(!data) return ;
      let val=data.map(item=>{
        let d = new Date(item);
        let datetime=d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        return datetime
      })
      return val
    }
    random(n,m){
     return Math.floor(Math.random()*(m-n)+n)
    }
}

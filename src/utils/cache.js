/**
 * username     ->     用户名
 * token        ->     token
 * userid       ->     自己的id
 * user_type    ->     用户类型 1->主账号，2->子账号
 */
export default {
    getSession(name) {
        if (!name) return;
        return window.sessionStorage.getItem(name);
    },
    setSession(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(name, content);
    },
    removeSession(name) {
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },
    getLocal(name) {
        if (!name) return;
        return window.localStorage.getItem(name);
    },
    setLocal(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    removeLocal(name) {
        if (!name) return;
        window.localStorage.removeItem(name);
    },
};

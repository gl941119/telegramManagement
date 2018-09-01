const url = {
    // localTestUrl: 'http://api.bierinc.com:9106/',
    localTestUrl: 'http://192.168.1.15:9003/',
    productUrl: 'http://api.bierinc.com:9106/',
};

export default {
    url,
    pageSize: 10, // 一页的数量
    miniPageSize: 10, // 小量
    pageStart: 1,
    uploadImg:(process.env.NODE_ENV === 'development' ? url.localTestUrl:url.productUrl) +"telegram/corpus/uploadImg",
    uploadVideo:(process.env.NODE_ENV === 'development' ? url.localTestUrl:url.productUrl) +"telegram/corpus/uploadVideo",
    testupload:(process.env.NODE_ENV === 'development' ? url.localTestUrl:url.productUrl) +"telegram/groupManage/importGroupManageUser",
    websocketUrl:'ws://api.bierinc.com:8197/bierinc',//websocket
  importContacts:(process.env.NODE_ENV === 'development' ? url.localTestUrl:url.productUrl)+'telegram/contacts/importContacts',//导入excel
};

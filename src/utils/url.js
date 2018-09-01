export default{
  // 登录
  Login:"telegram/account/login",
  outLogin:'telegram/account/signOut',

  //智能客服
  queryServiceData:'telegram/devices/selectDeviceByUserSid',
  queryAddUser:'telegram/devices/addDeviceMessage',
  queryCheckout:'telegram/devices/updateBelongType',//切换弹窗
  queryFodderList:'telegram/material/getMaterialTitleByUid',//查询素材


  querygetAllUserByUid:'telegram/deviceUser/getAllUserByUid',//根据uid 和手机号 获取所有用户信息
  updateManualWork:'telegram/devices/updateManualWork',//转人工记录状态
  querygetAccountByDeviceId:'telegram/devicesAccount/getAccountByDeviceId',//查询设备下绑定的telegram账号
  updateDeviceAccount:'telegram/devices/updateDeviceAccount',//切换设备账号
  //语料库
  queryCorpusData:'telegram/corpus/getCorpusByUid',//查询子用户账号语料库
  addCorpus:'telegram/corpus/addCorpus',//添加语料库
  getCorpusContentMessage:'telegram/corpus/getCorpusWithId',//根据id获取语料库内容详情
  updataCorpus:'telegram/corpus/updateCorpus',//修改语料库
  delCorpus:'telegram/corpus/deleteCorpus',//删除语料库
  stopCorpus:'telegram/corpus/updateCorpusStatus',//停用语料库
  //素材
  queryMaterialData:'telegram/material/getMaterialByUid',//根据用户Id，查询素材信息
  addMaterial:'telegram/material/addMaterial',//添加素材

  updateMaterial:'telegram/material/updateMaterial',//修改素材信息
  deleteMaterial:'telegram/material/deleteMaterial',//删除 素材
  updateMaterialStatus:'telegram/material/updateMaterialStatus',//修改素材状态
  //群管理
  queryGroupManagementData:'telegram/groupManage/getGroupManageByUid',
  queryGroupMessage:'telegram/groupManage/getGroupManageUserByGid',//根据群id查询用户
  //加密
  DataEncryption:'telegram/machine/encryption',
  //群信息
  groupManageData:'telegram/deviceGroups/getDeviceGroupByUid',
  //用户信息
  // usersMangage:'telegram/deviceUser/getDeviceUserByUid',
  //获取服务升级地址
  querySelectdictionary:'telegram/dictionary/selectdictionary',
  //查询聊天日志
  queryChatlogPageData:'telegram/chatLog/getChatLogByUid',
  //设备管理
  queryfacilityPageData:'telegram/devices/selectAllDevice',//查询所有的设备
  queryfacilityBindData:'telegram/account/getSubs',//获取全部子账号
  querySubById:'telegram/account/getSubById',//根据id查询子账号详情
  queryAllByUserSid:'telegram/devices/getAllByUserSid',//查看子账号下绑定的设备
  deldevicesbyusersid:'telegram/devices/delDevicesByUserSid',//删除子账号下绑定的设备
  queryselectNoBind:'telegram/devices/selectNoBind',//查看未绑定的设备
  amendbindDevices:'telegram/devices/bindDevices',//绑定设备
  getAccountByDeviceIdWithPage:'telegram/devicesAccount/getAccountByDeviceIdWithPage',//查询设备下绑定的telegram账号
  deleteByDeviceId:'telegram/devicesAccount/deleteByDeviceId',//删除设备下的telegram账号
  //通讯录
  querygetAll:'telegram/contacts/getAll',//超级管理 查询好友通讯录
  addressBookupdateLable:'telegram/contacts/updateLable',//编辑标签
  querygetByUid:'telegram/contacts/getByUid',//普通账号下的好友通讯录



  //控制台
  getTelegramBotWithConsole:'telegram/telegramBot/getTelegramBotWithConsole',//查询telegram机器人
  querygetAllGroupByUid:'telegram/deviceGroups/getAllGroupByUid',//根据uid 和手机号 获取所有群信息
  getAllMemberByGroupId:'telegram/groupBuilt/getAllMemberByGroupId',//根据群id查询 群成员
  getMaterialWithId:'telegram/material/getMaterialWithId',//根据素材id获取素材详细信息

  //群管理自建
  chaogetGroupBuiltByUid:'telegram/groupBuilt/getAllGroupBuilt',//超管后台查询全部群管理 自建
  getGroupBuiltByUid:'telegram/groupBuilt/getGroupBuiltByUid',//根据运营账户id查询
  updateGroupBuilt:'telegram/groupBuilt/updateGroupBuilt',//修改群管理自建 接口
  getGroupMemberByGroupId:'telegram/groupBuilt/getGroupMemberByGroupId',// 根据群id查询 群成员


  //群管理素材
  getAllGroupMaterial:'telegram/groupMaterial/getAllGroupMaterial',//超管后查询全部群管理(素材)
  getGroupMaterialByUid:'telegram/groupMaterial/getGroupMaterialByUid',//查询运营账户群管理(素材)
  addGroupMaterial:'telegram/groupMaterial/addGroupMaterial',//新增群管理(素材)
  updateGroupMaterial:'telegram/groupMaterial/updateGroupMaterial',//修改群管理(素材)

  //登录账号管理
  getAllDeviceAccount:'telegram/devicesAccount/getAllDeviceAccount',//管理后台查询
  getDeviceAccountByUid:'telegram/devicesAccount/getDeviceAccountByUid',//运营后台查询


  //telegram机器人
  getAllTelegramBot:'telegram/telegramBot/getAllTelegramBot',//超级管理后台查询telegram机器人
  getTelegramBotByUid:'telegram/telegramBot/getTelegramBotByUid',//查询运营账户telegram机器人
  addTelegramBot:'telegram/telegramBot/addTelegramBot',//添加机器人
  updateTelegramBot:'telegram/telegramBot/updateTelegramBot',//修改机器人


  //聊天日志
  getAllChatRecord:'telegram/chatRecord/getAllChatRecord',//超级管理 查询聊天日志
  getChatRecordByUid:'telegram/chatRecord/getChatRecordByUid',//根据运营uid 查询聊天日志
  clearChatRecord:'telegram/chatRecord/clearChatRecord',//清理聊天日志
  //机器人回复日志
  getAllChatLog:'telegram/chatLog/getAllChatLog',//超级管理 查询回复日志
  getChatLogByUid:'telegram/chatLog/getChatLogByUid',//根据运营uid 查询回复日志
  clearChatLog:'telegram/chatLog/clearChatLog',//清理回复日志


  //客户管理
  getAllDeviceUser:'telegram/deviceUser/getAllDeviceUser',//管理后台查询客户管理
  getDeviceUserByUid:'telegram/deviceUser/getDeviceUserByUid',//根据运营账号id查询客户管理
  updateDeviceUserLable:'telegram/deviceUser/updateDeviceUserLable',//修改客户标签
  deleteByIds:'telegram/deviceUser/deleteByIds',//删除客户

  //计划任务
  getAllTask:'telegram/task/getAllTask',//超级管理 查询计划任务
  getTaskUid:'telegram/task/getTaskUid',//根据运营uid 查询计划任务
  addTask:'telegram/task/addTask',//新增计划任务
  deleteTaskByIds:'telegram/task/deleteTaskByIds',//删除计划任务

};

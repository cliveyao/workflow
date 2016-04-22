UUflow_api = {};

// 新建instance（申请单）
UUflow_api.post_draft = function(flowId) {
  var uobj = {};
  uobj.methodOverride = "POST";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/drafts?" + $.param(uobj);
  var data = 
  {
    "Instances": [
      {
        "flow": flowId,
        "applicant": Meteor.userId(),
        "space": Session.get("spaceId")
      }
    ]
  };
  data = JSON.stringify(data);

  console.log(data);

  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      Session.set("instanceId", responseText.ChangeSet.inserts.Instances[0].id);
      $('#flow_list_modal').modal('hide');
      toastr.success("创建成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 拟稿状态下暂存instance（申请单）
UUflow_api.put_draft = function(instance) {
  var uobj = {};
  uobj.methodOverride = "PUT";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/drafts?" + $.param(uobj);
  var data = {"Instances":[instance]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      toastr.success("保存成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 拟稿状态下删除instance（申请单）
UUflow_api.delete_draft = function(instanceId) {
  var uobj = {};
  uobj.methodOverride = "DELETE";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/drafts?" + $.param(uobj);
  var data = 
  { "Instances": 
    [
      {
      "id": instanceId
      }
    ]
  };
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      box = Session.get("box");
      if (box) {
        if (box == "monitor") {
          FlowRouter.go("/workflow/monitor/" + Session.get("spaceId") + "/" + Session.get("flowId"));
        } else if (box == "draft") {
          FlowRouter.go("/workflow/draft/" + Session.get("spaceId"));
        }
      }
      toastr.success("申请单已删除!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// instance（申请单）的第一次提交
UUflow_api.post_submit = function(instance) {
  var uobj = {};
  uobj.methodOverride = "POST";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/submit?" + $.param(uobj);
  var data = {"Instances":[instance]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      FlowRouter.go("/workflow/draft/" + Session.get("spaceId"));
      toastr.success("提交成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 审核状态下暂存instance（申请单）
UUflow_api.put_approvals = function(approve) {
  var uobj = {};
  uobj.methodOverride = "PUT";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/approvals?" + $.param(uobj);
  var data = {"Approvals":[approve]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      toastr.success("保存成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 待审核提交
UUflow_api.post_engine = function(approve) {
  var uobj = {};
  uobj.methodOverride = "POST";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/engine?" + $.param(uobj);
  var data = {"Approvals":[approve]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      FlowRouter.go("/workflow/inbox/" + Session.get("spaceId"));
      toastr.success("提交成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 取消申请
UUflow_api.post_terminate = function(instance) {
  var uobj = {};
  uobj.methodOverride = "POST";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/terminate?" + $.param(uobj);
  var data = {"Instances":[instance]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      $('#force_end_modal').modal('hide');
      toastr.success("取消申请成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 转签核
UUflow_api.put_reassign = function(instance) {
  var uobj = {};
  uobj.methodOverride = "PUT";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/reassign?" + $.param(uobj);
  var data = {"Instances":[instance]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      $('#reassign_modal').modal('hide');
      toastr.success("转签核成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 重定位
UUflow_api.put_relocate = function(instance) {
  var uobj = {};
  uobj.methodOverride = "PUT";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/relocate?" + $.param(uobj);
  var data = {"Instances":[instance]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      $('#relocate_modal').modal('hide');
      toastr.success("重定位成功!");
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 归档
UUflow_api.post_archive = function(insId) {
  var uobj = {};
  uobj.methodOverride = "POST";
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/archive?" + $.param(uobj);
  var data = {"Instances":[{id: insId}]};
  data = JSON.stringify(data);
  console.log(data);
  $.ajax({
    url: url,
    type: "POST",
    async: true,
    data: data,
    dataType: "json",
    processData: false,
    contentType: "text/plain",

    success: function(responseText, status) {
      
    },
    error: function(xhr, msg, ex) {
      toastr.error(msg);
    }
  })
}

// 导出报表
UUflow_api.get_export = function (spaceId, flowId, type) {
  var uobj = {};
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  uobj.space_id = spaceId;
  uobj.flow_id = flowId;
  uobj.timezoneoffset = new Date().getTimezoneOffset();
  uobj.type = type;
  var url = Meteor.settings.public.webservices.uuflow.url + "/uf/export/excel?" + $.param(uobj);
  window.open(url, "_blank");
}

// 打印
UUflow_api.print = function(instanceId){
  var uobj = {};
  uobj["X-User-Id"] = Meteor.userId();
  uobj["X-Auth-Token"] = Accounts._storedLoginToken();
  uobj.id = instanceId;
  window.open(Meteor.settings.public.webservices.uuflow.url + "/uf/print?" + $.param(uobj));
}

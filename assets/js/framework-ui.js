/*
 *
 *   Responsive Admin Theme
 *   version 2.9.2
 *
 */

$(document).ready(function () {


    // Fast fix bor position issue with Propper.js
    // Will be fixed in Bootstrap 4.1 - https://github.com/twbs/bootstrap/pull/24092
    //Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;


    // Add body-small class if window less than 768px
    if ($(window).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetisMenu
    if ($("#side-menu").length > 0) {
        $('#side-menu').metisMenu();
    }
    urlchange();

    // Minimalize menu
    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });


    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    //$('.full-height-scroll').slimscroll({
    //    height: '100%'
    //})
});

// Minimalize menu when screen is less than 768px
$(window).bind(" resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Fixed Sidebar
$(window).bind("load", function () {
    if ($("body").hasClass('fixed-sidebar')) {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });
    }
});

function urlchange() {       //侧边栏根据url切换右边内容页面，根据自己的html来做修改
    var url = window.location;
    var element = $('ul.nav a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    });
    element.parent().addClass('active');
    element.parent().parent().addClass("in");
    element.parent().parent().parent().addClass('active');
}

// Minimalize menu when screen is less than 768px
$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});
// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}



$.reload = function () {
    location.reload();
    return false;
}
$.loading = function (bool, text) {
    var $loadingpage = top.$("#loadingPage");
    var $loadingtext = $loadingpage.find('.loading-content');
    if (bool) {
        $loadingpage.show();
    } else {
        if ($loadingtext.attr('istableloading') == undefined) {
            $loadingpage.hide();
        }
    }
    if (!!text) {
        $loadingtext.html(text);
    } else {
        $loadingtext.html("数据加载中，请稍后…");
    }
    $loadingtext.css("left", (top.$('body').width() - $loadingtext.width()) / 2 - 50);
    $loadingtext.css("top", (top.$('body').height() - $loadingtext.height()) / 2);
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}
$.request = function (name) {
    var search = location.search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == name) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
$.browser = function () {
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    };
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
        if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
            return "Chrome";
        } else {
            return "360";
        }
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    };
}
$.modalOpen = function (options) {
    var defaults = {
        id: null,
        title: '系统窗口',
        width: "100px",
        height: "100px",
        url: '',
        shade: 0.3,
        btn: ['确认', '关闭'],
        btnclass: ['btn btn-primary', 'btn btn-danger'],
        callBack: null
    };
    var options = $.extend(defaults, options);
    var success = (typeof options.success === 'undefined') ? null : options.success;
    var force = (typeof options.force === 'undefined') ? false : options.force;
    var _width = (force && (typeof options.width !== 'undefined')) ? options.width : (top.$(window).width() > parseInt(options.width.replace('px', '')) ? options.width : top.$(window).width() + 'px');
    var _height = (force && (typeof options.height !== 'undefined')) ? options.height : (top.$(window).height() > parseInt(options.height.replace('px', '')) ? options.height : top.$(window).height() + 'px');
    top.layer.open({
        id: options.id,
        type: 2,
        shade: options.shade,
        title: options.title,
        fix: false,
        area: [_width, _height],
        content: options.url,
        btn: options.btn,
        btnclass: options.btnclass,
        success: success,
        yes: function () {
            options.callBack(options.id)
        },
        cancel: function () {
            return true;
        }
    });
}
//确认对话框
$.modalConfirm = function (content, callBack, title) {
    title = title || "系统提示";
    return top.layer.confirm(content, {
        icon: "fa-exclamation-circle",
        title: title,
        btn: ['确认', '取消'],
        btnclass: ['btn btn-primary', 'btn btn-danger'],
    }, function (index) {
        top.layer.close(index);
        callBack(true);
    }, function () {
        callBack(false)
    });
}
//弹出提示对话框
$.modalAlert = function (content, type) {
    var icon = "";
    if (type == 'success') {
        icon = "fa-check-circle";
    }
    if (type == 'error') {
        icon = "fa-times-circle";
    }
    if (type == 'warning') {
        icon = "fa-exclamation-circle";
    }
    top.layer.alert(content, {
        icon: icon,
        title: "系统提示",
        btn: ['确认'],
        btnclass: ['btn btn-primary'],
    });
}
//提醒消息，3s后自动消失
$.modalMsg = function (content, type, end) {
    if (type != undefined) {
        var icon = "";
        if (type == 'success') {
            icon = "fa-check-circle";
        }
        if (type == 'error') {
            icon = "fa-times-circle";
        }
        if (type == 'warning') {
            icon = "fa-exclamation-circle";
        }
        top.layer.msg(content, { icon: icon, time: 3000, shift: 5 }, function () {
            if (end)
                end();
        });
        top.$(".layui-layer-msg").find('i.' + icon).parents('.layui-layer-msg').addClass('layui-layer-msg-' + type);
    } else {
        top.layer.msg(content);
    }
}
$.modalClose = function () {
    var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    var $IsdialogClose = top.$("#layui-layer" + index).find('.layui-layer-btn').find("#IsdialogClose");
    var IsClose = $IsdialogClose.is(":checked");
    if ($IsdialogClose.length == 0) {
        IsClose = true;
    }
    if (IsClose) {
        top.layer.close(index);
    } else {
        location.reload();
    }
}
//提交对话框
$.submitForm = function (options) {
    var defaults = {
        url: "",
        param: [],
        loading: "正在提交数据...",
        success: null,
        close: true
    };
    var options = $.extend(defaults, options);
    $.loading(true, options.loading);
    $.ajax({
        url: options.url,
        data: options.param,
        type: "post",
        dataType: "json",
        success: function (data) {
            // add J.I for response msg or message from server.
            var msg = (typeof data.msg !== 'undefined') ? data.msg : ((typeof data.message !== 'undefiend') ? data.message : '');
            $.loading(false);
            if (data.state) {
                options.success(data);
                // $.modalMsg(data.msg, "success");
                $.modalMsg(msg, "success");
                if (options.close == true) {
                    $.modalClose();
                }
            } else {
                // $.modalAlert(data.msg, "error");
                $.modalAlert(msg, "error");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.loading(false);
            $.modalMsg(errorThrown, "error");
        },
        beforeSend: function () {
            $.loading(true, options.loading);
        },
        complete: function () {
            $.loading(false);
        }
    });
}
$.deleteForm = function (options) {
    var defaults = {
        prompt: "您确定要删除该项数据吗？",
        url: "",
        param: [],
        loading: "正在删除数据...",
        success: null,
        close: true,
        type: "post"
    };
    var options = $.extend(defaults, options);
    $.modalConfirm(options.prompt, function (r) {
        if (r) {
            $.loading(true, options.loading);
            window.setTimeout(function () {
                $.ajax({
                    url: options.url,
                    data: options.param,
                    type: options.type,
                    dataType: "json",
                    success: function (data) {
                        if (data.state) {
                            if (typeof options.success !== 'undefiend')
                                options.success(data);
                            $.modalMsg(data.msg, "success");
                        } else {
                            $.modalAlert(data.msg, "error");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.loading(false);
                        $.modalMsg(errorThrown, "error");
                    },
                    beforeSend: function () {
                        $.loading(true, options.loading);
                    },
                    complete: function () {
                        $.loading(false);
                    }
                });
            }, 500);
        }
    });

}
//Form表单验证
//2018.04.01 Update J.I 可传给检查参数,
$.fn.formValid = function (_rules_) {
    var rules = $.extend((_rules_ === 'undefined') ? {} : _rules_, {
        errorPlacement: function (error, element) {
            element.parents('.formValue').addClass('has-error');
            element.parents('.has-error').find('i.error').remove();
            element.parents('.has-error').append('<i class="form-control-feedback fa fa-exclamation-circle error" data-placement="left" data-toggle="tooltip" title="' + error + '"></i>');
            $("[data-toggle='tooltip']").tooltip();
            if (element.parents('.input-group').hasClass('input-group')) {
                element.parents('.has-error').find('i.error').css('right', '33px')
            }
        },
        success: function (element) {
            element.parents('.has-error').find('i.error').remove();
            element.parent().removeClass('has-error');
        }
    });
    return $(this).valid(rules);
}
$.fn.formSerialize = function (formdate) {
    var element = $(this);
    if (!!formdate) {
        for (var key in formdate) {
            var $id = element.find('#' + key);
            var value = $.trim(formdate[key]).replace(/&nbsp;/g, '');
            var type = $id.attr('type');
            if ($id.hasClass("select2-hidden-accessible")) {
                type = "select";
            }
            //console.log(type);
            switch (type) {
                case "checkbox":
                    if (value == "true") {
                        $id.attr("checked", 'checked');
                    } else {
                        $id.removeAttr("checked");
                    }
                    break;
                case "select":
                    $id.val(value).trigger("change");
                    break;
                default:
                    $id.val(value);
                    break;
            }
        };
        return false;
    }
    var postdata = {};
    element.find('input,select,textarea').each(function (r) {
        var $this = $(this);
        var id = $this.attr('id');
        var type = $this.attr('type');
        switch (type) {
            case "checkbox":
                postdata[id] = $this.is(":checked");
                break;
            default:
                var value = $this.val();
                if (!$.request("keyId") && value != null) {
                    value = value.replace(/&nbsp;/g, '');
                }
                postdata[id] = value;
                break;
        }
    });
    return postdata;
};
$.fn.bindSelect = function (options) {
    var defaults = {
        id: "id",
        text: "text",
        search: false,
        url: "",
        param: [],
        change: null
    };
    var options = $.extend(defaults, options);
    var $element = $(this);
    if (options.url != "") {
        $.ajax({
            url: options.url,
            data: options.param,
            dataType: "json",
            async: false,
            success: function (data) {
                $.each(data, function (i) {
                    $element.append($("<option></option>").val(data[i][options.id]).html(data[i][options.text]));
                });
                $element.select2({
                    minimumResultsForSearch: options.search == true ? 0 : -1
                });
                $element.on("change", function (e) {
                    if (options.change != null) {
                        options.change(data[$(this).find("option:selected").index()]);
                    }
                    $("#select2-" + $element.attr('id') + "-container").html($(this).find("option:selected").text().replace(/　　/g, ''));
                });
            }
        });
    } else {
        $element.select2({
            minimumResultsForSearch: -1
        });
    }
};
$.fn.bindSelectMultiple = function (options) {
    var defaults = {
        id: "id",
        text: "text",
        url: ""
    };
    var options = $.extend(defaults, options);
    if (options.url != "") {
        $.ajax({
            url: options.url,
            dataType: "json",
            async: false,
            success: function (data) {
                $.each(data, function (i) {
                    var html = '<input type="checkbox" id="' + data[i][options.id] + '" style="margin-left:5px;" name="cDevice" onclick="mapView.getMapLayer(this)"/>' + data[i][options.text];
                    $(".newUl").append($("<li></li>").html(html));
                });
            }
        });
    } else { }
};
$.fn.bindTree = function (options) {
    var defaults = {
        treeName: null, //树div名称
        text: "Name",
        isCheckBox: false, //是否显示复选框
        url: "", //请求url
        loadedfunction: null //树加载完成后回调函数
    };
    var options = $.extend(defaults, options);
    $('#' + options.treeName).data('jstree', false); //清空数据
    var pluginstr = eval('["wholerow"]');
    if (options.isCheckBox) {
        pluginstr.push("checkbox");
    }
    //树列表的初始化
    $('#' + options.treeName).jstree({
        "plugins": pluginstr,
        "core": {
            "themes": {
                "responsive": false
            },
            "check_callback": true,
            'data': function (obj, callback) {
                var jsonstr = "[]";
                var jsonarray = eval('(' + jsonstr + ')');
                $.ajax({
                    url: options.url,
                    dataType: "json",
                    async: false, //同步请求
                    success: function (result) {
                        var arrays = result;
                        for (var i = 0; i < arrays.length; i++) {
                            var arr = {
                                "id": arrays[i].Id,
                                "parent": arrays[i].ParentId == "0" ? "#" : arrays[i].ParentId,
                                "text": arrays[i][options.text],
                                "icon": arrays[i].ParentId == "0" ? "fa fa-folder icon-tree-folder" : "fa fa-folder icon-tree-folder"
                            }
                            jsonarray.push(arr);
                        }
                    }

                });
                callback.call(this, jsonarray);
            }
        }
    }).bind('loaded.jstree', options.loadedfunction);
}

function moneyFormatter(value) {
    var s = value;
    var n = 2;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

//默认为id为#contentTable的bootstrap-table表格提供序号
function indexFormatter(value, row, index) {
    var options = $('#contentTable').bootstrapTable('getOptions');
    return options.pageSize * (options.pageNumber - 1) + index + 1;
}
//刷新默认表格
function refreshTable() {
    $("#contentTable").bootstrapTable('refresh');
}
/**************************************时间格式化处理************************************/
//需要引入moment插件
function dateFormatter(value, row, index) {
    return moment(value).format("YYYY-MM-DD");
}
function dateFtt(fmt, date) { //author: meizz   
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//四舍五入保留2位小数（不够位数，则用0替补）
function keepTwoDecimalFull(num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

/**转化成中文大写金额 */
function capitalsMoney(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
    var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分",
        str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
}
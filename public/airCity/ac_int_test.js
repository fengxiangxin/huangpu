
function onReady() {
    //此时可以调用接口了
    __g.camera.get((r) => {
        var str = `Camera: ${r.x}, ${r.y}, ${r.z}, ${r.pitch}, ${r.yaw}`;
        //或者这样调用
        //var str = `Camera: ${r.camera.join(',')}`;
        log(str);
    })

    __g.misc.setApiVersionReceived(function () {
        var spanVer = document.getElementById('spanVer');
        if (spanVer) {
            spanVer.innerText = ` S${this.apiVersion}C${this.sdkVersion}`;
            if (this.apiVersion != this.sdkVersion) {
                spanVer.innerHTML = ` S${this.apiVersion}<font color=red><b>C${this.sdkVersion}</b></font>`;
                logWithColor('red', '<b>JS SDK版本和云渲染服务器版本不一致，可能造成接口调用错误，请确认!</b>\n');
            }
            else {
                spanVer.innerHTML = ` S${this.apiVersion}C${this.sdkVersion}`;
            }
        }
    })
}

var __fn = null;
var __editor;
var __currentTileLayerActor = null;     //当前点选的TileLayer Actor
var __isFirstClearCode = true;
var __loginDuration;    //用户登录时长限制，到达时长时，自动退出（断开视频流连接），需要重新登录
var __timeLimitOnly = false;


function getQueryVariable(v) {
    let query = location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == v)
            return pair[1];
    }
    return undefined;
}


function getMatchServerConfig(host, fn, callbackIndex) {

    if ('WebSocket' in window) {

        var url = `ws://${host}`;
        __fn = fn;

        var ws = new WebSocket(url);
        ws.onopen = function () {
            this.send(JSON.stringify({
                'command': 6,
                'callbackIndex': callbackIndex
            }));
        }
        ws.onmessage = function (event) {
            var o = JSON.parse(event.data);
            __fn(o);
        }
        ws.onclose = function () {
        }
        ws.onerror = function (event) {
        };
    }
    else {
        this.log('Not Support WebSocket!');
    }
}


function increaseHeight(val, cat) {
    var h = __editor.getScrollInfo().height;
    if (h < 128 && val < 0) {
        logWithColor('Purple', '编辑器最小高度为：128');
        return;
    }

    if (h > 628 && val > 0) {
        logWithColor('Purple', '编辑器最大高度为：628');
        return;
    }

    h += val;
    if (typeof localStorage != 'undefined')
        localStorage.setItem('CodeMirrorHeight', h);
    __editor.setSize('100%', h);

    onResize();
}


//检查用户是否需要用户登录
function checkLogin() {
    if (__timeLimitOnly) {
        //开始计时，时间到了以后，自动跳转到登录界面
        setTimeout(function () {
            test_ac_destroy();
        }, __loginDuration * 60 * 1000);
        alert(`体验时长${__loginDuration}分钟`)
    }
    else {
        let loginDataStr = localStorage.getItem("loginData");
        if (loginDataStr) {
            let loginData = JSON.parse(loginDataStr);
            localStorage.setItem("prevURL", location.href);
            $.ajax({
                url: '/checkLogin',
                type: 'get',
                cache: false,
                headers: {
                    "Authorization": "Bearer " + loginData.token
                },
                success: function (res) {
                    if (res.code == 1) {
                        location.href = "login.html";
                    }
                    else {
                        //开始计时，时间到了以后，自动跳转到登录界面
                        setTimeout(function () {
                            location.href = "login.html";
                        }, res.duration * 60 * 1000);
                        alert(`用户已登录，剩余体验时长${res.duration}分钟`)
                    }
                },
                error: function (e) {
                    location.href = "login.html";
                }
            });
        }
        else
            location.href = "login.html";
    }
}


function init(withPlayer, withInterface) {

    //检查用户权限
    if (location.protocol != 'file:') {
        $.get('/getLoginInfo', function (data) {
            if (data.enableAuth) {
                __loginDuration = data.duration;
                __timeLimitOnly = data.timeLimitOnly;
                checkLogin();
            }
        });
    }

    var spanVer = document.getElementById('spanVer');
    if (spanVer)
        spanVer.innerHTML = ` S300C${AcApiVersion}`;

    ToolTip.init({
        delay: 0,
        fadeDuration: 250,
        textColor: '#fff',
        shadowColor: '#f0fff0',
        fontSize: '9pt',
        theme: 'dark'
    });

    if (typeof CodeMirror != 'undefined') {
        __editor = CodeMirror.fromTextArea(document.getElementById("textAreaCode"), {//定义CodeMirror代码编辑器
            lineNumbers: true,
            lineWrapping: true,    // 自动换行
            styleActiveLine: true, // 当前行背景高亮
            matchBrackets: true,
            indentWithTabs: true,
            theme: "mdn-like",
            mode: "text/typescript"
        });
        __editor.on('focus', function () {
            if (__isFirstClearCode) {
                __isFirstClearCode = false;
                __editor.setValue('');
            }
        });

        if (typeof localStorage != 'undefined') {
            let h = localStorage.getItem('CodeMirrorHeight');
            if (h)
                __editor.setSize('100%', h);
        }
        onResize();

        let str = '';
        str += '使用说明：\n'
        str += '    （1）此处代码编辑区域，可在此处编辑原始JSON、JS代码\n';
        str += '             或者点击左侧超链接，然后在此处修改显示的JS代码\n\n'
        str += '    （2）点击上方的增加高度、减少高度，可以调整编辑器的\n';
        str += '             大小，大小会保存，下次启动会继续有效。\n\n'
        str += '    （3）可以在"ac_conf.js"中修改WebSocket的IP、端口，\n';
        str += '            然后刷新页面生效。 或者可以在左上角修改IP、端口，\n';
        str += '             然后点击连接按钮连接到指定服务器。\n';
        str += ''
        __editor.setValue(str);
    }

    //2021.04.16 解析参数
    let bitrate = getQueryVariable('bitrate');

    if (location.search.indexOf('ms') != -1) { //页面地址加参数： http://192.168.1.222/int.html?ms
        getMatchServerConfig(HostConfig.MatchServer, function (o) {
            if (o.result == 0) {
                if (withPlayer) {
                    let acp = new AirCityPlayer(o.instanceId, 'player', HostConfig.Token, true);
                    bitrate && acp.setBitrate(bitrate);  //2021.04.16 Add 设置码率
                }
                if (withInterface) {
                    var ace = new AirCityAPI(o.instanceId, onReady, log);
                    ace.setEventCallback(onEvent);

                    //更新页面显示
                    let host = AirCityAPI.getHostFromInstanceId(o.instanceId);
                    if (host) {
                        document.getElementById('txtIP').value = host[0];
                        document.getElementById('txtPort').value = host[1];
                    }
                }
            }
            else {
                alert('云渲染资源已满，请稍候再试')
            }
        })
    }
    else {
        if (withPlayer) {
            let host = HostConfig.instanceId ? HostConfig.instanceId : HostConfig.AirCityPlayer;
            let acp = new AirCityPlayer(host, 'player', HostConfig.Token, true, true);
            //AirCityPlayer对象增加方法enableAutoAdjustResolution，可以设置启用或关闭视频窗口缩放时
            //自动调整分辨率的功能。这个功能默认是启用的，如果想关闭此功能，可以在初始化的时候调用enableAutoAdjustResolution(false)
            //acp.enableAutoAdjustResolution(false);
            bitrate && acp.setBitrate(bitrate);  //2021.04.16 Add 设置码率
        }
        if (withInterface) {
            let host = HostConfig.instanceId ? HostConfig.instanceId : HostConfig.AirCityAPI;
            var ace = new AirCityAPI(host, onReady, log);
            ace.useColorLog = true;
            ace.setEventCallback(onEvent);
        }
    }

    //2021.03.18 恢复滚动条的位置
    let scrollY = localStorage.getItem('scrollY');
    if (document.getElementById('leftPanel'))
        document.getElementById('leftPanel').scrollTop = scrollY || 0;
}

function toTop() {
    document.getElementById('leftPanel').scrollTop = 0;
}

var iReconnect = 0;
function log(s, nnl) {
    if (s.indexOf('Reconnecting...') != -1) {
        document.getElementById('infoPanel').className = 'waiting';
        clearScreen();
        s += (++iReconnect);
    }
    if (s.indexOf('Connected!') != -1) {
        iReconnect = 0;
        document.getElementById('infoPanel').className = '';
    }

    var e = document.getElementById('infoPanel');
    var notAutoClear = document.getElementById('cbNotAutoClear').checked;
    e.innerHTML += (s + (nnl ? '' : '\n'));
    if (e.innerHTML.length > 1024 * 10 && !notAutoClear)
        e.innerHTML = '';
    e.scrollTop = e.scrollHeight + 100;
}

function logWithColor(color, text, nnl) {
    log(`<font color="${color}">${text}</font>`, nnl);
}

function clearScreen() {
    document.getElementById('infoPanel').innerHTML = '';
}

function showAllCommands() {
    clearScreen();

    var index = 0;
    var count = 0;
    for (var v in CommandType)
        count++;

    var tmpCmdArr = [];

    log('{');
    log('//按值排序：');
    for (var v in CommandType) {
        ++index;

        if (index < count / 2) {
            log(`\t${v}: ${CommandType[v]}`);
        }
        else if (index == count / 2) {
            log('');
        }
        else {
            tmpCmdArr.push(v);
        }
    }

    log('//按名称排序：');
    tmpCmdArr.sort();
    for (var cmd of tmpCmdArr) {
        log(`\t${cmd}: ${CommandType[cmd]}`);
    }

    log('}');

    var e = document.getElementById('infoPanel');
    e.scrollTop = 0;
}

function onEvent(data) {
    if (data.eventtype == 'LeftMouseButtonClick') {
        if (data.Type == 'TileLayer') {
            __currentTileLayerActor = {
                'id': data.Id,
                'objectId': data.ObjectID
            };

            //2021.03.23 经纬度转换
            __g.coord.pcs2gcs(data.MouseClickPoint, function (res) {
                if (res.coordinates.length > 0) {
                    let posGeo = res.coordinates[0];
                    log(`鼠标点击位置：[${data.MouseClickPoint[0]}, ${data.MouseClickPoint[1]}, ${data.MouseClickPoint[2]}]`)
                    log(`转经纬度坐标：[${posGeo[0]}, ${posGeo[1]}]`);
                }
            });
        }
    }

    //for test
    let str = 'OnEvent: ' + data.eventtype;
    log(str);

}

function call(fn) {

    //2021.03.18 记录滚动条的位置
    let scrollY = document.getElementById('leftPanel').scrollTop;
    localStorage.setItem('scrollY', scrollY)

    var notExec = document.getElementById('cbNotExecute').checked;
    if (!notExec) {
        try {
            fn();
        } catch (e) {
            logWithColor('red', e);
        }
    }

    var str = fn.toString();
    var n1 = str.indexOf('{');
    var n2 = str.lastIndexOf('}');
    var strBody = str.substring(n1 + 1, n2);

    __editor.setValue(strBody);
    __isFirstClearCode = false;
}

function execCode() {
    var text = __editor.getValue();
    try {
        eval('(async ()=>{' + text + '})()');
    } catch (e) {
        logWithColor('red', e.message);
        logWithColor('red', e.stack);
    }
}

function clearCode() {
    __editor.setValue('');
    __isFirstClearCode = false;
}

function testSendJSON() {
    var text = __editor.getValue();

    try {
        var o = JSON.parse(text);
        if (!o) {
            log('JSON解析错误');
            return;
        }

        __g.call(o);
    } catch (e) {
        logWithColor('red', e.message);
        logWithColor('red', e.stack);
    }
}

function onServerChanged() {
    let ip = document.getElementById('txtIP').value;
    let port = document.getElementById('txtPort').value;

    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ip.match(exp);
    if (reg != null) {
        if (/^\+?[1-9][0-9]*$/.test(port)) {
            __g.setHost(ip, port);
        }
    }
}

function onConnect() {
    let ip = document.getElementById('txtIP').value;
    let port = document.getElementById('txtPort').value;
    let valid = false;

    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ip.match(exp);
    if (reg != null) {
        if (/^\+?[1-9][0-9]*$/.test(port)) {
            valid = true;
        }
    }

    if (valid) {
        __g.destroy();
        __g.setHost(ip, port);
        __g.reconnect();
    }
    else {
        alert('IP或端口格式不正确！');
    }
}



/*-------------------------------------------------
  异步接口调用方式测试
--------------------------------------------------*/
function test_calling_with_callback() {
    __g.tag.delete('tag1', function () {
        __g.camera.get(function (cam) {
            let o = new TagData('tag1');
            o.coordinate = [cam.x, cam.y, 25.4];
            o.imagePath = HostConfig.Path + '/images/tag.png';
            o.imageSize = [28, 28];
            o.text = '北京银行';
            o.showLine = true;
            __g.tag.add(o, function () {
                __g.tag.focus(o.id, 500, 0.2, function () {
                    log("Test Finished.");
                }); //focus
            }); //add
        }) //delete
    }); //get
}

function test_calling_with_then() {
    __g.tag.delete('tag1').then(() => __g.camera.get())
        .then((cam) => {
            let o = new TagData('tag1');
            o.coordinate = [cam.x, cam.y, 25.4];
            o.imagePath = HostConfig.Path + '/images/tag.png';
            o.imageSize = [28, 28];
            o.text = '北京银行';
            o.showLine = true;
            __g.tag.add(o);
        })
        .then(() => __g.tag.focus('tag1', 500, 0.2))
        .then(() => {
            log("Test Finished.");
        })
}

async function test_calling_with_await() {

    await __g.tag.delete('tag1')
    let cam = await __g.camera.get();

    let o = new TagData('tag1');
    o.coordinate = [cam.x, cam.y, 25.4];
    o.imagePath = HostConfig.Path + '/images/tag.png';
    o.imageSize = [28, 28];
    o.text = '北京银行';
    o.showLine = true;
    await __g.tag.add(o);
    await __g.tag.focus(o.id, 500, 0.2);
    log("Test Finished.");
}



/*-------------------------------------------------
  ac
--------------------------------------------------*/
function test_ac_reset() {
    __g.reset();
}

function destroyPlayer() {
    if (__p)
        __p.destroy();
}

function test_ac_destroy() {
    __g.destroy();
    destroyPlayer();
}

function test_ac_quit() {
    __g.quit();
}



/*-------------------------------------------------
  camera
--------------------------------------------------*/
function test_camera_get() {
    __g.camera.get(function (res) {
        log('这是camera.get的回调函数的输出信息，可以通过下面的代码重新设置到当前的位置：\n');
        let str = `__g.camera.set(${res.x}, ${res.y}, ${res.z}, ${res.pitch}, ${res.yaw}, 0);\n`;
        log(str);
    })
}

function test_camera_set() {

    //参数：x, y, z, pitch, yaw, flyTime
    __g.camera.set(492035.37, 2488806.75, 402.62, -15.0, -173.0, 0.2);
}

function test_camera_set_byArray() {

    //最后一个元素无用，会忽略
    let cam = [488586.843750, 2486889.750000, 713.141602, -36.353725, -124.556442, -0.000004];
    __g.camera.set(cam, 0.2);
}

function test_camera_set_byObject() {

    let cam = {
        "x": 490088.281250,
        "y": 2485978.750000,
        "z": 1031.461914,
        "pitch": -39.462357,
        "yaw": -152.668823,
        "roll": 0.0     //该参数无用，会自动忽略
    }
    __g.camera.set(cam, 0.2);
}

function test_camera_lookAt() {
    __distance += 200.0;
    //lookAt参数：x, y, z, distance,  pitch, yaw, flyTime
    __g.camera.lookAt(492035.37, 2488806.75, 402.62, __distance, -15.0, -173.0, 0.2);
}

function test_camera_lookAtBBox() {
    //[minx,miny,minz,maxx,maxy,maxz]
    let bbox = [495119.875, 2491031.25, 0.2, 495386.625, 2491245.5, 0.4];

    //lookAtBBox参数：bbox,  pitch, yaw, flyTime
    __g.camera.lookAtBBox(bbox, -15.0, -173.0, 0.5);
}

function test_camera_playAnimation() {
    //参数：导览序号
    __g.camera.playAnimation(0);
}

function test_camera_stopAnimation() {
    __g.camera.stopAnimation();
}

function test_camera_moveForward() {
    __g.camera.moveForward();
}

function test_camera_moveBackward() {
    __g.camera.moveBackward();
}

function test_camera_moveLeft() {
    __g.camera.moveLeft();
}

function test_camera_moveRight() {
    __g.camera.moveRight();
}

function test_camera_moveUp() {
    __g.camera.moveUp();
}

function test_camera_moveDown() {
    __g.camera.moveDown();
}

function test_camera_turnLeft() {
    __g.camera.turnLeft();
}

function test_camera_turnRight() {
    __g.camera.turnRight();
}

function test_camera_turnUp() {
    __g.camera.turnUp();
}

function test_camera_turnDown() {
    __g.camera.turnDown();
}

function test_camera_stop() {
    __g.camera.stop();
}



/*-------------------------------------------------
  coord
--------------------------------------------------*/
let __distance = 100.0;

async function test_coord_screen2World() {
    let res = await __g.coord.screen2World(600, 400);
    log('Screen2World Result: ' + res.worldLocation);
}

async function test_coord_world2Screen() {
    let res = await __g.coord.world2Screen(489843.28, 2488373.5, 170);
    log('World2Screen Result: ' + res.screenPosition);
}

function test_coord_pcs2gcs() {
    __g.coord.pcs2gcs([498326, 3353092]);
}

function test_coord_gcs2pcs() {
    __g.coord.gcs2pcs([30.297492106590411, 113.98259824550810]);
}


/*-------------------------------------------------
  infoTree
--------------------------------------------------*/
function test_layers_show() {
    __g.infoTree.show('A659DF0E404D806CB3511C9DAC22D160');
}

function test_layers_hide() {
    __g.infoTree.hide(['A659DF0E404D806CB3511C9DAC22D160']);
}

function test_layers_enableXRay() {
    let ids = [1, 2];
    let color = [1, 1, 1, 1];
    __g.infoTree.enableXRay(ids, color);
}

function test_layers_disableXRay() {
    let ids = [1, 2];
    __g.infoTree.disableXRay(ids);
}


//生成随机坐标值或者坐标值数组
function getRandCoord() {
    let baseX = 487430.87;
    let baseY = 2489692.75;
    return [baseX + Math.random() * 250, baseY + Math.random() * 250, 8];
}

function getRandCoords(n) {

    var coords = [];
    for (let i = 0; i < n; i++) {
        coords.push(getRandCoord());
    }

    return coords;
}

async function test_layers_addSomeTags() {

    __g.camera.set(487759.78125, 2489952.5, 264.63446, -43.952045, 159.880676, 0);

    let oaTags = new Array();

    for (let i = 0; i < 10; i++) {
        let o = new TagData(i);
        o.coordinate = getRandCoord();
        o.imagePath = HostConfig.Path + '/images/tag.png';;
        o.imageSize = [28, 28];
        o.text = 'T' + i.toString();
        oaTags.push(o);
        o.groupId = 'group0';
    }

    let oaRadiation = new Array();
    for (let i = 0; i < 4; i++) {
        let o = new RadiationPointData(i);
        o.coordinate = getRandCoord();
        o.radius = 50;
        o.rippleNumber = 2;
        o.color = [1, 0, 1, 1];
        o.brightness = 1.0;
        o.groupId = 'group0';
        oaRadiation.push(o);
    }

    let oaODLines = new Array();
    for (let i = 0; i < 4; i++) {
        let o = new ODLineData(i);
        o.color = [0, 0, 1, 1];
        o.coordinates = getRandCoords(2);
        o.flowRate = 1;
        o.brightness = 0.8;
        o.bendDegree = 0.5;
        o.tiling = 0.5;

        o.lineThickness = 2;
        o.flowPointSizeScale = 5;
        o.labelSizeScale = 100;

        o.lineShape = 1;  //ODLine模型样式 0:平面 1:柱体，默认值1
        o.lineStyle = 0;  //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
        o.flowShape = 1;  //ODLine发光点样式 0:无 1:球体，默认值0

        o.startPointShape = 0;
        o.endPointShape = 0;
        o.startLabelShape = 0;
        o.endLabelShape = 0;

        o.groupId = 'group0';
        oaODLines.push(o);
    }

    let oaBeams = new Array();
    for (let i = 0; i < 2; i++) {
        let o = new BeamData(i);
        o.coordinates = getRandCoords(2);//光流的polyline的坐标数组
        o.duration = 3;                  //光流粒子的生命周期
        o.thickness = 0.1;               //光流线的宽度
        o.interval = 0.2;                //光流粒子发射间隔
        o.velocity = 0.1;                //光流粒子的速度
        o.color = [1, 0, 0, 1];          //光流的颜色
        o.groupId = 'group0';
        oaBeams.push(o);
    }

    let oaPolylines = new Array();
    for (let i = 0; i < 2; i++) {
        let o = new PolylineData(i);
        o.coordinates = getRandCoords(3);   //光流的polyline的坐标数组
        o.color = [0, 0, 1, 1];
        o.style = 1;
        o.thickness = 15;
        o.brightness = 0.8;
        o.flowRate = 0.5;
        o.groupId = 'group0';
        oaPolylines.push(o);
    }

    let oaPolygons = new Array();
    for (let i = 0; i < 4; i++) {
        let o = new PolygonData(i);
        o.coordinates = getRandCoords(3);   //光流的polyline的坐标数组
        o.color = Color.Green;              //多边形的填充颜色
        o.frameThickness = 1;
        o.groupId = 'group0';
        oaPolygons.push(o);
    }


    await __g.tag.clear();
    await __g.polyline.clear();
    await __g.odline.clear();
    await __g.beam.clear();
    await __g.radiationPoint.clear();
    await __g.polygon.clear();

    __g.tag.add(oaTags);
    __g.polyline.add(oaPolylines);
    __g.odline.add(oaODLines);
    __g.beam.add(oaBeams);
    __g.radiationPoint.add(oaRadiation);
    __g.polygon.add(oaPolygons);

}

function test_layers_showByGroupId() {
    __g.infoTree.showByGroupId('group0');
}

function test_layers_hideByGroupId() {
    __g.infoTree.hideByGroupId('group0');
}

function test_layers_highlightByGroupId() {
    __g.infoTree.highlightByGroupId('group0');
}

function test_layers_deleteByGroupId() {
    __g.infoTree.deleteByGroupId('group0');
}

async function test_layers_get() {
    let res = await __g.infoTree.get();
    console.log(JSON.stringify(res.infotree));
}



/*-------------------------------------------------
  cameraTour
--------------------------------------------------*/
function test_cameraTour_add() {
    let frames = [];
    frames.push(new CameraTourKeyFrame(0, 1.0, [492501.90625, 2483838.75, 5898.237305], [-55.95829, -89.993935, 0]));
    frames.push(new CameraTourKeyFrame(1, 2.0, [493538.75, 2487061.5, 1166.874878], [-36.769756, -91.261223, 0]));
    frames.push(new CameraTourKeyFrame(2, 3.0, [493364.78125, 2487789.25, 504.430054], [-23.049517, -91.261223, 0]));
    frames.push(new CameraTourKeyFrame(3, 4.0, [495635.78125, 2491133.75, 183.135956], [-24.96583, -172.325165, 0]));
    frames.push(new CameraTourKeyFrame(4, 5.0, [495270, 2491256.75, 67.038582], [-25.314354, 108.269859, 0]));

    let o = new CameraTourData('1', 'test', frames);
    __g.cameraTour.add(o);
}

function test_cameraTour_update() {
}

function test_cameraTour_play() {
    __g.cameraTour.play('1');
}

function test_cameraTour_stop() {
    __g.cameraTour.stop('1');
}

function test_cameraTour_delete() {
    __g.cameraTour.delete('1');
}




/*-------------------------------------------------
  tileLayer
--------------------------------------------------*/
function test_tileLayer_add() {
    let location = [0, 0, 0];
    let rotation = [0, 0, 0];
    let scale = [1, 1, 1];
    let fileName = HostConfig.Path + "\\media\\project\\demo_files\\SDKDemo.3dt";
    let o = new TileLayerData('1', fileName, location, rotation, scale);
    __g.tileLayer.add(o);
}

function test_tileLayer_update() {
    __g.tileLayer.setTranslation('1', [100, 0, 0]);
}

function test_tileLayer_delete() {
    __g.tileLayer.delete('1');
}

function test_tileLayer_focus() {
    __g.tileLayer.focus('1');
}

function checkTileLayerId() {
    if (!__currentTileLayerActor || !__currentTileLayerActor.id) {
        logWithColor('red', '请在场景中先点击一个TileLayer图层，再调用此方法')
        return false;
    }
    return true;
}

function test_tileLayer_show() {
    checkTileLayerId() &&
        __g.tileLayer.show(__currentTileLayerActor.id);
}

function test_tileLayer_hide() {
    checkTileLayerId() &&
        __g.tileLayer.hide(__currentTileLayerActor.id);
}

function test_tileLayer_enableXRay() {
    checkTileLayerId() &&
        __g.tileLayer.enableXRay(__currentTileLayerActor.id, [1, 0, 1, 0.0381]);
}

function test_tileLayer_disableXRay() {
    checkTileLayerId() &&
        __g.tileLayer.disableXRay(__currentTileLayerActor.id);
}

function test_tileLayer_get() {
    __g.tileLayer.get('1');
}


function test_tileLayer_actor_show() {
    checkTileLayerId() &&
        __g.tileLayer.showActor(__currentTileLayerActor.id, __currentTileLayerActor.objectId);
}

function test_tileLayer_actor_hide() {
    checkTileLayerId() &&
        __g.tileLayer.hideActor(__currentTileLayerActor.id, __currentTileLayerActor.objectId);
}

function test_tileLayer_actor_focus() {
    checkTileLayerId() &&
        __g.tileLayer.focusActor(__currentTileLayerActor.id, __currentTileLayerActor.objectId);
}

function test_tileLayer_actor_highlight() {
    checkTileLayerId() &&
        __g.tileLayer.highlightActor(__currentTileLayerActor.id, __currentTileLayerActor.objectId);
}

function test_tileLayer_actor_stopHighlight() {
    checkTileLayerId() &&
        __g.tileLayer.stopHighlightActor(__currentTileLayerActor.id, __currentTileLayerActor.objectId);
}

function test_tileLayer_actor_stopHighlight_all() {
    __g.tileLayer.stopHighlightActor();
}

function test_tileLayer_actor_showAllActors() {
    checkTileLayerId() &&
        __g.tileLayer.showAllActors(__currentTileLayerActor.id);
}

function test_tileLayer_actor_hideAllActors() {
    checkTileLayerId() &&
        __g.tileLayer.hideAllActors(__currentTileLayerActor.id);
}

function test_tileLayer_actor_enableClip() {
    checkTileLayerId() &&
        __g.tileLayer.enableClip(__currentTileLayerActor.id);
}

function test_tileLayer_actor_disableClip() {
    checkTileLayerId() &&
        __g.tileLayer.disableClip(__currentTileLayerActor.id);
}

function test_tileLayer_actor_setStyle() {
    let style = 3; //样式， 0：默认；1：X光；2：纯色；3：水晶体
    checkTileLayerId() &&
        __g.tileLayer.setStyle(__currentTileLayerActor.id, style, Color.Red);
}


/*-------------------------------------------------
  tag
--------------------------------------------------*/
async function test_tag_add() {
    let o = new TagData('p1');
    o.coordinate = [495269.37, 2491073.25, 25.4];
    o.imagePath = HostConfig.Path + '/images/tag.png';
    o.url = HostConfig.Path + '/int_popup.html';
    o.imageSize = [28, 28];
    o.text = '北京银行';
    o.range = [1, 8000.0];
    o.textRange = 3000;
    o.showLine = true;
    o.textColor = Color.Black;
    o.textBackgroundColor = Color.White;
    o.hoverImagePath = HostConfig.Path + '/images/hilightarea.png';
    await __g.tag.add(o);
    __g.tag.focus(o.id, 200, 0);

    o.id = 'p2';
    o.text = "招商银行";
    o.coordinate = [495231.93, 2490962.25, 10.0];
    __g.tag.add(o);
}

function test_tag_update() {
    let id = 'p1';
    let coord = [495304.09375, 2491078.25, 29.39];
    let imagePath = 'data:image/png;base64,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';
    let url = HostConfig.Path + '/int_popup.html';
    let imageSize = [28, 28];
    let text = '北京银行';
    let range = [1, 8000.0];
    let showLine = false;

    let o = new TagData(id, coord, imagePath, imageSize, url, text, range, showLine);
    o.textColor = Color.Blue;
    o.textBackgroundColor = Color.Yellow;

    __g.tag.update(o);
}

function test_tag_focus() {
    __g.tag.focus('p1', 200, 0.2);
}

function test_tag_focusAll() {
    __g.tag.focusAll(200, 0.2);
}

function test_tag_show() {
    __g.tag.show('p1');
}

function test_tag_showAll() {
    __g.tag.showAll();
}

function test_tag_hideAll() {
    __g.tag.hideAll();
}

function test_tag_hide() {
    __g.tag.hide(['p1']);
}

function test_tag_clear() {
    __g.tag.clear();
}

function test_tag_delete() {
    __g.tag.delete(['p1', 'p2']);
}

function test_tag_showPopupWindow() {
    __g.tag.showPopupWindow('p1');
}

function test_tag_hidePopupWindow() {
    __g.tag.hidePopupWindow('p1');
}

function test_tag_showAllPopupWindow() {
    __g.tag.showAllPopupWindow();
}

function test_tag_hideAllPopupWindow() {
    __g.tag.hideAllPopupWindow();
}

async function test_tag_setCoordinate() {
    await __g.tag.setCoordinate('p1', [495254.1875, 2491154.25, 0.400]);
    __g.tag.focus('p1', 200, 0.2);
}

function test_tag_setImagePath() {
    let path = HostConfig.Path + '/images/ctag.png';
    __g.tag.setImagePath('p1', path);
}

function test_tag_setImageSize() {
    __g.tag.setImageSize('p1', [64, 64]);
}

function test_tag_setURL() {
    __g.tag.setURL('p1', 'http://www.163.com');
}

function test_tag_setText() {
    __g.tag.setText('p1', '北京欢迎你');
}

function test_tag_setRange() {
    __g.tag.setRange('p1', [1, 800]);
}

function test_tag_setTextColor() {
    __g.tag.setTextColor('p1', Color.Blue);
}

function test_tag_setTextBackgroundColor() {
    __g.tag.setTextBackgroundColor('p1', Color.Yellow);
}

function test_tag_setTextBorderColor() {
    __g.tag.setTextBorderColor('p1', Color.Red);
}

function test_tag_setShowLine() {
    __g.tag.setShowLine('p1', false);
}

async function test_tag_get() {
    let res = await __g.tag.get('p1');
    let o = res.data[0];
    log(`获取标签：\n id: ${o.id} \n text: ${o.text}`);
}

var __canvas;

function test_tag_add_canvas() {

    // 生成图片
    if (!__canvas)
        __canvas = document.createElement("canvas")

    let img = new Image()
    img.src = __base64_tagBg;
    img.onload = () => {

        __canvas.width = img.width;
        __canvas.height = img.height;

        var ctx = __canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#fff";
        ctx.font = "36px Bold Verdana";
        ctx.textBaseline = "middle";
        ctx.fillText("农村商业银行", 60, 50);


        let o = new TagData('canvas_tag1');
        o.coordinate = [495150.21875, 2490873.75, 0.40];
        o.imagePath = __canvas.toDataURL("image/jpg");
        o.imageSize = [165, 63];
        o.text = '';
        o.url = HostConfig.Path + '/int_popup.html';
        o.range = [1, 8000.0];

        __g.tag.delete('canvas_tag1')
            .then(() => __g.tag.add(o))
            .then(() => __g.tag.focus('canvas_tag1', 200, 0.2));
    }
}



/*-------------------------------------------------
  customTag
--------------------------------------------------*/
async function test_ctag_add() {
    let id = 'ct1';
    let coord = [495113.71875, 2491218, 0.4];
    let page = HostConfig.Path + '/int_custom_tag.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路';
    let contentWeb = new WebUIData(page, 220, 52);
    let popupWeb = new WebUIData(HostConfig.Path + '/int_popup.html', 600, 480);
    let pivot = [0.5, 0.5];
    let range = [1, 5000];
    let o = new CustomTagData(id, coord, contentWeb, popupWeb, pivot, range);

    await __g.ctag.clear();
    await __g.ctag.add(o);
    __g.ctag.focus(o.id, 50, 0.2);
}

function test_ctag_update() {
    let id = 'ct1';
    let coord = [495113.71875, 2491218, 0.4];
    let page = HostConfig.Path + '/int_custom_tag.html?icon=images/ctag2.png&title=北京银行&address=朝阳区外馆斜街';
    let contentWeb = new WebUIData(page, 220, 52);
    let popupWeb = new WebUIData(HostConfig.Path + '/int_popup.html', 600, 480);
    let pivot = [0.5, 0.5];
    let range = [1, 5000];
    let o = new CustomTagData(id, coord, contentWeb, popupWeb, pivot, range);
    __g.ctag.update(o);
}

function test_ctag_delete() {
    __g.ctag.delete('ct1');
}

function test_ctag_clear() {
    __g.ctag.clear();
}

function test_ctag_focus() {
    __g.ctag.focus('ct1', 50, 0.1);
}

function test_ctag_focusAll() {
    __g.ctag.focusAll();
}

function test_ctag_show() {
    __g.ctag.show('ct1');
}

function test_ctag_hide() {
    __g.ctag.hide('ct1');
}

function test_ctag_showAll() {
    __g.ctag.showAll();
}

function test_ctag_hideAll() {
    __g.ctag.hideAll();
}

function test_ctag_get() {
    __g.ctag.get('ct1');
}



/*-------------------------------------------------
  polyline
--------------------------------------------------*/
async function test_polyline_add() {
    let o = new PolylineData('p1');
    o.coordinates = [[493711.15625, 2488656.25, 7.0], [493698.09375, 2490060.25, 8.4], [494434.78125, 2490056, 5.4], [494663.90625, 2491221, 3.8]];
    o.color = Color.Red;
    o.style = 1;
    o.thickness = 150;
    o.brightness = 0.8;
    o.flowRate = 0.5;
    o.depthTest = false;
    __g.camera.set(495161.78125, 2489277, 1362.090454, -48.678974, -152.06279, 0);
    await __g.polyline.delete(o.id);
    __g.polyline.add(o);
}

function test_polyline_update() {
    __g.polyline.updateBegin();
    __g.polyline.setStyle('p1', 4);
    __g.polyline.setColor('p1', Color.Yellow);
    __g.polyline.setThickness('p1', 10);
    __g.polyline.setBrightness('p1', 0.5);
    __g.polyline.setFlowRate('p1', 0.8);
    __g.polyline.setDepthTest('p1', true);
    __g.polyline.updateEnd();
}

function test_polyline_delete() {
    __g.polyline.delete('p1');
}

function test_polyline_clear() {
    __g.polyline.clear();
}

function test_polyline_focus() {
    __g.polyline.focus('p1');
}

function test_polyline_show() {
    __g.polyline.show('p1');
}

function test_polyline_showAll() {
    __g.polyline.showAll();
}

function test_polyline_hide() {
    __g.polyline.hide('p1');
}

function test_polyline_hideAll() {
    __g.polyline.hideAll();
}

function test_polyline_highlight() {

}

function test_polyline_get() {
    __g.polyline.get('p1');
}




/*-------------------------------------------------
  odline
--------------------------------------------------*/
function test_odline_add() {
    let o = new ODLineData('od1');
    o.color = Color.Green;
    o.coordinates = [[492303.65625, 2487534.5, 4.195], [491391.5625, 2487777.5, 4.2]];
    o.flowRate = 1;
    o.brightness = 10;
    o.bendDegree = 0.5;
    o.tiling = 0.5;

    o.lineThickness = 15;
    o.flowPointSizeScale = 30;
    o.labelSizeScale = 1000;

    o.lineShape = 1;  //ODLine模型样式 0:平面 1:柱体，默认值1
    o.lineStyle = 0;  //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
    o.flowShape = 1;  //ODLine发光点样式 0:无 1:球体，默认值0

    o.startPointShape = 1;
    o.endPointShape = 1;
    o.startLabelShape = 1;
    o.endLabelShape = 1;

    __g.camera.set(491433.65625, 2486907.5, 685.200928, -39.472763, -64.888329, 0);
    __g.odline.delete('od1')
        .then(() => __g.odline.add(o));
}

function test_odline_update() {
    let o = new ODLineData('od1');
    o.color = [1, 0, 1, 1];
    o.coordinates = [[492303.65625, 2487534.5, 4.195], [491391.5625, 2487777.5, 4.2]];
    o.flowRate = 1;
    o.brightness = 0.8;
    o.bendDegree = 0.5;
    o.tiling = 1.0;

    o.lineThickness = 15;
    o.flowPointSizeScale = 50;
    o.labelSizeScale = 100;

    o.lineShape = 1;  //ODLine模型样式 0:平面 1:柱体，默认值1
    o.lineStyle = 2  //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
    o.flowShape = 1;  //ODLine发光点样式 0:无 1:球体，默认值0

    o.startPointShape = 1;
    o.endPointShape = 1
    o.startLabelShape = 0;
    o.endLabelShape = 0;

    __g.odline.update(o);
}

function test_odline_delete() {
    __g.odline.delete('od1');
}

function test_odline_clear() {
    __g.odline.clear();
}

function test_odline_focus() {
    __g.odline.focus('od1');
}

function test_odline_show() {
    __g.odline.show('od1');
}

function test_odline_showAll() {
    __g.odline.showAll();
}

function test_odline_hide() {
    __g.odline.hide('od1');
}

function test_odline_hideAll() {
    __g.odline.hideAll();
}

function test_odline_get() {
    __g.odline.get('od1');
}




/*-------------------------------------------------
  polygon
--------------------------------------------------*/
function test_polygon_add() {
    let coords1 = [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]];

    let color = [0, 0, 1, 1];//多边形的填充颜色
    let frameColor = Color.Red;
    let frameThickness = 5;
    let o = new PolygonData('1', color, coords1, frameColor, frameThickness);
    o.depthTest = false;
    __g.polygon.add(o);
}

function test_polygon_update() {
    let coords = [
        [[488545.9375, 2491134.5, 1.0], [488235.9375, 2490811.5, 1.0], [487774.5625, 2491299.25, 1.0], [488081.59375, 2491625.5, 1.0]],
        [[488248.65625, 2491142.25, 1], [488215.46875, 2491330.25, 1], [488057.71875, 2491184.25, 1]]
    ];
    let color = Color.Green;
    let o = new PolygonData('1', color, coords);
    o.depthTest = false;
    __g.polygon.update(o);
}

function test_polygon_glow() {
    let ids = ['1', '2'];
    let duration = 2;
    __g.polygon.glow(ids, duration);
}

function test_polygon_highlight() {
    let ids = ['1', '2'];
    __g.polygon.highlight(ids);
}

function test_polygon_delete() {
    let ids = ['1', '2'];
    __g.polygon.delete(ids);
}

function test_polygon_clear() {
    __g.polygon.clear();
}

function test_polygon_focus() {
    __g.polygon.focus('1');
}

function test_polygon_show() {
    let ids = ['1', '2'];
    __g.polygon.show(ids);
}

function test_polygon_hide() {
    let ids = ['1', '2'];
    __g.polygon.hide(ids);
}

function test_polygon_get() {
    __g.polygon.get('1');
}


/*-------------------------------------------------
  polygon3d
--------------------------------------------------*/
function test_polygon3d_add(fn) {
    let coords = [[489877.9375, 2493053.5, 6.6659374237060547], [489850.5, 2492181.75, 5.6631250381469727], [488457.03125, 2493013.5, 0]];
    let color = [1, 0, 1, 1];   //颜色值
    let height = 500;           //3D多边形的高度
    let intensity = 4.0;        //亮度
    let type = 1;               //3DPolygon的样式
    let o = new Polygon3DData('1', type, coords, color, height, intensity);
    __g.polygon3d.add(o, fn);
}

function test_polygon3d_update() {
    let coords = [
        [[489877.9375, 2493053.5, 6.6659374237060547], [489850.5, 2492181.75, 5.6631250381469727], [488977.84375, 2492411.75, 0], [488457.03125, 2493013.5, 0]],
        [[489536.5625, 2492735.5, 12.10546875], [489228.4375, 2492998.5, 7.3343749046325684], [489008.78125, 2492620.5, 2.504218578338623]]
    ];
    let color = [1, 1, 0, 1];//颜色值
    let height = 300;//3D多边形的高度
    let intensity = 3.0;//亮度
    let type = 1;
    let o = new Polygon3DData('1', type, coords, color, height, intensity);
    __g.polygon3d.update(o);
}

function test_polygon3d_delete() {
    let ids = ['0', '1'];
    __g.polygon3d.delete(ids);
}

function test_polygon3d_clear() {
    __g.polygon3d.clear();
}

function test_polygon3d_glow() {
    let ids = ['0', '1'];
    let duration = 2;
    __g.polygon3d.glow(ids, duration);
}

function test_polygon3d_highlight() {
    let ids = ['0', '1'];
    __g.polygon3d.highlight(ids);
}

function test_polygon3d_focus() {
    __g.polygon3d.focus('1');
}

function test_polygon3d_show() {
    __g.polygon3d.show('1');
}

function test_polygon3d_hide() {
    __g.polygon3d.hide('1');
}

function test_polygon3d_get() {
    __g.polygon3d.get('1');
}


/*-------------------------------------------------
  heatmap
--------------------------------------------------*/
function getRandNumBetween(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

var __tidUpdateHeatMap = undefined;

async function test_heatmap_add() {
    clearInterval(__tidUpdateHeatMap);
    await __g.tag.clear();
    await __g.heatmap.clear();
    await __g.camera.set(492231.9375, 2489968, 2180.598145, -54.192036, -175.195358, 0);

    let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
    let range = [0, 100];
    let data = [];
    let tagData = [];
    for (let i = 0; i < 100; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = 0;
        let coord = [x, y, z];                 //热力点的坐标
        let radius = Math.random() * 400;           //热力点影像半径范围
        let heatValue = Math.random() * 100;        //热力值
        let o = new HeatMapPointData(i, coord, radius, heatValue);
        data.push(o);
    }
    __g.tag.add(tagData);
    __g.heatmap.add('heatmap1', bbox, range, data);
}

function test_heatmap_update() {
    __tidUpdateHeatMap = setInterval(() => {
        let data = [];
        for (let i = 0; i < 100; i++) {
            let o = {};
            o.id = `${i}`;
            o.heatValue = Math.random() * 100;
            data.push(o);
        }
        __g.heatmap.update('heatmap1', null, null, data);
    }, 1000);
}

function test_heatmap_delete() {
    clearInterval(__tidUpdateHeatMap);
    __g.heatmap.delete('heatmap1');
}

function test_heatmap_clear() {
    clearInterval(__tidUpdateHeatMap);
    __g.tag.clear();
    __g.heatmap.clear();
}

function test_heatmap_focus() {
    __g.heatmap.focus('heatmap1', 100);
}

function test_heatmap_show() {
    __g.heatmap.show('heatmap1');
}

function test_heatmap_hide() {
    __g.heatmap.hide('heatmap1');
}

function test_heatmap_get() {
    __g.heatmap.get('heatmap1');
}


/*-------------------------------------------------
  beam
--------------------------------------------------*/
function test_beam_add() {
    let coords = [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492621.1875, 2489262.5, 11.311718940734863]];
    let duration = 3;       //光流粒子的生命周期
    let thickness = 0.8;    //光流线的宽度
    let interval = 0.5;       //光流粒子发射间隔
    let velocity = 5;       //光流粒子的速度
    let color = [1, 0, 0, 1];  //光流的颜色
    let o = new BeamData('1', duration, thickness, interval, velocity, color, coords);
    __g.beam.add(o);
}

function test_beam_update() {
    let coords = [[491599.5, 2490045, 11.3046875], [492483.5, 2490050.5, 8.1779689788818359], [492520.28125, 2490873.25, 9.8798437118530273]];
    let duration = 5;
    let thickness = 3;
    let interval = 0.2;
    let velocity = 5;
    let color = Color.Blue;
    let o = new BeamData('1', duration, thickness, interval, velocity, color, coords);
    __g.beam.update(o);
}

function test_beam_delete() {
    let ids = ['0', '1'];
    __g.beam.delete(ids);
}

function test_beam_focus() {
    __g.beam.focus('1');
}

function test_beam_clear() {
    __g.beam.clear();
}

function test_beam_get() {
    __g.beam.get(['1', '2']);
}

function test_beam_setThickness() {
    __g.beam.setThickness('1', 5);
}



/*-------------------------------------------------
  highlightArea
--------------------------------------------------*/
function test_highlightArea_add() {
    let coords = [[488509.90625, 2487479.5, 59], [487133.5, 2486976, 17], [486509.21875, 2488715.25, 5], [488062.3125, 2489276, 8]];
    let color = [1, 0, 0, 0.8];//多边形高亮颜色
    let heightRange = [0.0, 100.0];//高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
    let intensity = 5.0;//高亮颜色的强度
    let o = new HighlightAreaData('1', coords, color, heightRange, intensity);
    __g.highlightArea.add(o);
}

function test_highlightArea_delete() {
    __g.highlightArea.delete('1');
}

function test_highlightArea_update() {
    let coords = [
        [[488509.90625, 2487479.5, 59], [487133.5, 2486976, 17], [486509.21875, 2488715.25, 5], [488062.3125, 2489276, 8]],
        [[487930.0625, 2488807.5, 4.0], [487628.3125, 2488703.25, 9.0], [487524.5625, 2488938.25, 8.0], [487846, 2489052.5, 6.0]]
    ];
    let color = [1, 0, 1, 0.5];
    let heightRange = [0.0, 200.0];
    let intensity = 8.0;
    let o = new HighlightAreaData('1', coords, color, heightRange, intensity);
    __g.highlightArea.update(o);
}

function test_highlightArea_clear() {
    __g.highlightArea.clear();
}

function test_highlightArea_focus() {
    __g.highlightArea.focus('1');
}

function test_highlightArea_show() {
    __g.highlightArea.show('1');
}

function test_highlightArea_hide() {
    __g.highlightArea.hide('1');
}

function test_highlightArea_get() {
    __g.highlightArea.get('1');
}



/*-------------------------------------------------
  radiationPoint
--------------------------------------------------*/
function test_radiationPoint_add() {
    let coordinate = [495113.71875, 2491218, 0.4];
    let radius = 300;
    let rippleNumber = 2;
    let color = [1, 0, 1, 1];
    let brightness = 0.8;
    let o = new RadiationPointData('1', coordinate, radius, rippleNumber, color, brightness);
    __g.radiationPoint.add(o);
}

function test_radiationPoint_update() {
    let coordinate = [495113.71875, 2491218, 0.4];
    let radius = 300;
    let rippleNumber = 2;
    let color = [1, 0, 0, 1];
    let brightness = 0.5;
    let o = new RadiationPointData('1', coordinate, radius, rippleNumber, color, brightness);
    __g.radiationPoint.update(o);
}

function test_radiationPoint_delete() {
    let ids = ['0', '1'];
    __g.radiationPoint.delete(ids);
}

function test_radiationPoint_clear() {
    __g.radiationPoint.clear();
}

function test_radiationPoint_focus() {
    __g.radiationPoint.focus('1');
}

function test_radiationPoint_focusAll() {
    __g.radiationPoint.focusAll();
}

function test_radiationPoint_hide() {
    __g.radiationPoint.hide('1');
}

function test_radiationPoint_show() {
    __g.radiationPoint.show('1');
}

function test_radiationPoint_get() {
    __g.radiationPoint.get('1');
}



/*-------------------------------------------------
  customObject
--------------------------------------------------*/
let __co_location;
function test_customObject_add() {
    let pakFilePath = HostConfig.Path + '/media/custom.pak';
    let assetPath = '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe';
    __co_location = [495490.90625, 2490908, 0.25009766221046448];
    let rotation = [0, 0, 0];
    let scale = [1, 1, 1];
    let smoothMotion = 1;   //1: 平滑插值，0: 跳跃
    let o = new CustomObjectData('o1', pakFilePath, assetPath, __co_location, rotation, scale, smoothMotion);
    __g.customObject.add(o);
}

function test_customObject_update() {
    __g.customObject.setRotation('o1', [])
}

function test_customObject_delete() {
    __g.customObject.delete('o1');
}

function test_customObject_clear() {
    __g.customObject.clear();
}

function test_customObject_focus() {
    __g.customObject.focus('o1', -1);  //-1:自动跟随
}

function test_customObject_show() {
    __g.customObject.show('o1');
}

function test_customObject_hide() {
    __g.customObject.hide('o1');
}

function test_customObject_highlight() {
    __g.customObject.highlight('o1', Color.Red);
}

function test_customObject_unhighlight() {
    __g.customObject.unhighlight();
}

function test_customObject_get() {
    __g.customObject.get('o1');
}


function test_customObject_addByTileLayer() {
    let o = new CustomObjectData2('o1', __currentTileLayerActor.id, __currentTileLayerActor.objectId,
        [-148.14, -7370.16, 9.47], [0, 0, 0], [1, 1, 1], 0);
    __g.customObject.addByTileLayer(o);
}

function test_customObject_callFunction() {
    __g.customObject.callFunction('o1', 'funName', BPFuncParamType.Int32, 10002, () => {

    });
}

function test_customObject_setPos() {
    __co_location[0] += 5.0;
    __g.customObject.updateBegin();
    __g.customObject.setSmoothMotion('o1', 1);
    __g.customObject.setLocation('o1', __co_location);
    __g.customObject.updateEnd();
}

var __co_scale = [1, 1, 1];
function test_customObject_setScale() {
    __co_scale[0] += 0.2;
    __co_scale[1] += 0.2;
    __co_scale[2] += 0.2;
    __g.customObject.setScale('o1', __co_scale);
}



/*-------------------------------------------------
  videoProjection
--------------------------------------------------*/
function test_vp_add() {
    let o = new VideoProjectionData();
    o.id = "vp1";
    o.videoURL = HostConfig.Path + "/media/video2.mov";
    o.location = [495333.59375, 2490901, 20.0];
    o.rotation = [-50, 0, 0];
    o.fov = 90;
    o.aspectRatio = 1.77;
    o.distance = 100;
    __g.vp.add(o);
}

function test_vp_update() {
    let o = new VideoProjectionData();
    o.id = "vp1";
    o.videoURL = HostConfig.Path + "/media/video2.mov";
    o.location = [495333.59375, 2490901, 20.0];
    o.rotation = [-50, 0, 0];
    o.fov = 90;
    o.aspectRatio = 2;
    o.distance = 100;
    __g.vp.update(o);
}

function test_vp_focus() {
    __g.vp.focus('vp1');
}

function test_vp_show() {
    __g.vp.show('vp1');
}

function test_vp_hide() {
    __g.vp.hide('vp1');
}

function test_vp_get() {
    __g.vp.get('vp1');
}

function test_vp_delete() {
    __g.vp.delete('vp1');
}




/*-------------------------------------------------
  panorama
--------------------------------------------------*/
function test_panorama_add() {
    let o = new PanoramaData('p1', HostConfig.Path + '/media/panorama1.jpg', [495302.625, 2491061.5, 30.15234375], 75);
    __g.panorama.add(o);
}

function test_panorama_update() {
    let o = new PanoramaData('p1', HostConfig.Path + '/media/panorama2.jpg', [495302.625, 2491061.5, 30.15234375], 75);
    __g.panorama.update(o);
}

function test_panorama_delete() {
    __g.panorama.delete('p1');
}

function test_panorama_clear() {
    __g.panorama.clear();
}

function test_panorama_focus() {
    __g.panorama.focus('p1');

}

function test_panorama_get() {
    __g.panorama.get('p1');
}




/*-------------------------------------------------
  decal
--------------------------------------------------*/
function test_decal_add() {
    let o = new DecalData('d1');
    o.order = 1;
    o.texturePath = HostConfig.Path + '/media/decal1.png';
    o.location = [494219.3125, 2490657, -0.001054687425494194];
    o.rotation = [-90, 180, 0];
    o.scale = [1, 1, 1];
    __g.decal.add(o);
}

function test_decal_update() {
    let o = new DecalData('d1');
    o.order = 1;
    o.texturePath = HostConfig.Path + '/media/decal2.png';
    o.location = [494219.3125, 2490657, -0.001054687425494194];
    o.rotation = [-90, 180, 0];
    o.scale = [0.5, 0.5, 0.5];
    __g.decal.update(o);
}

function test_decal_delete() {
    __g.decal.delete('d1');
}

function test_decal_clear() {
    __g.decal.clear();
}

function test_decal_focus() {
    __g.decal.focus('d1');
}

function test_decal_focusAll() {
    __g.decal.focusAll();
}

function test_decal_get() {
    __g.decal.get('d1');
}



/*-------------------------------------------------
  viewshed
--------------------------------------------------*/
function test_viewshed_add() {
    let o = new ViewshedData('v1');
    o.coordinate = [495189.71875, 2490901.75, 10];
    o.fov = 70;
    o.radius = 400;
    o.direction = -50;
    __g.viewshed.add(o);
}

function test_viewshed_update() {
    let o = new ViewshedData('v1');
    o.coordinate = [495189.71875, 2490901.75, 10];
    o.fov = 70;
    o.radius = 500;
    o.direction = -60;
    __g.viewshed.update(o);
}

function test_viewshed_delete() {
    __g.viewshed.delete('v1');
}

function test_viewshed_clear() {
    __g.viewshed.clear();
}

function test_viewshed_focus() {
    __g.viewshed.focus('v1');
}

function test_viewshed_focusAll() {
    __g.viewshed.focusAll();
}

function test_viewshed_get() {
    __g.viewshed.get('v1');
}




/*-------------------------------------------------
  dynamicWater
--------------------------------------------------*/
function test_dynamicWater_add() {
    let coords = [[493878.9375, 2490438.25, 0], [494153.09375, 2490915, 0], [494413.875, 2490763.25, 0], [494286.21875, 2490366.25, 0]];
    let o = new DynamicWaterData('dy1', coords, 0);
    __g.dynamicWater.add(o);
}

function test_dynamicWater_update() {
    let o = new DynamicWaterData('dy1');
    o.style = 1;
    __g.dynamicWater.update(o);
}

function test_dynamicWater_delete() {
    __g.dynamicWater.delete('dy1');
}

function test_dynamicWater_clear() {
    __g.dynamicWater.clear();
}

function test_dynamicWater_focus() {
    __g.dynamicWater.focus('dy1');
}

function test_dynamicWater_focusAll() {
    __g.dynamicWater.focusAll();
}

function test_dynamicWater_get() {
    __g.dynamicWater.get('dy1');
}





/*-------------------------------------------------
  misc
--------------------------------------------------*/
function test_misc_setDateTime() {
    //参数：year, month, day, hour, minute, second, daynightLoop
    __g.misc.setDateTime(2019, 1, 1, 10, 0, 0, false);
}

function test_misc_addImageButton() {
    let x = 100;
    let y = 100;
    let width = 64;
    let height = 64;
    let normalImage = 'D:/Data/1.jpg';
    let hoverImage = 'D:/Data/2.jpg';
    let tooltip = '测试';
    let o = new ImageButtonData(1, x, y, width, height, normalImage, hoverImage, tooltip);
    __g.misc.addImageButtons(o);
}

function test_misc_deleteImageButton() {
    let ids = [0, 1];
    __g.misc.deleteImageButtons(ids);
}

function test_misc_addAnimatedImageButton() {
    let x = 100;//图片按钮的位置:x坐标
    let y = 100;//图片按钮的位置:y坐标
    let width = 208;//图片按钮的宽度，单位像素
    let height = 150;//图片按钮的高度，单位像素
    let imageSequecePath = 'D:/tmp3/loopplay2s';//序列贴图的目录
    let imageSequeceLength = 2;//序列贴图的图片数量，也就是帧数
    let loop = true;//是否循环播放序列贴图
    let interactable = true;//是否可以用鼠标点击操作
    let o = new AnimatedImageButtonData(1, x, y, width, height, imageSequecePath, imageSequeceLength, loop, interactable);
    __g.misc.addAnimatedImageButtons(o);
}

let __uiVisible = true;
function test_misc_setMainUIVisibility() {
    __uiVisible = !__uiVisible;
    __g.misc.setMainUIVisibility(__uiVisible);
}


function test_misc_setMousePickMask() {
    //此处可以用枚举，也可以直接设置数字，数字含义如下：
    //7: click, move, hover: 全开 
    //0: click, move, hover: 全关 
    let mask = MousePickMask.MouseClick | MousePickMask.MouseMove | MousePickMask.MouseHover;
    __g.misc.setMousePickMask(mask);
}

function test_misc_playVideo() {
    __g.misc.playVideo(1, 20, 20, 400, 300, HostConfig.Path + '/media/video2.mov');
}

function test_misc_stopPlayVideo() {
    __g.misc.stopPlayVideo(1);
}

function test_misc_playMovie() {
    __g.misc.playMovie(HostConfig.Path + '/media/video1.mp4', true);
}

function test_misc_stopMovie() {
    __g.misc.stopMovie();
}

function test_misc_callBPFunction() {
    let f = new BPFunctionData();
    f.actorTag = 'custombpactor';
    f.objectName = 'BlueprintCube_2';
    f.functionName = 'TestBPFunction';
    f.paramType = BPFuncParamType.Vector;
    f.paramValue = [1, 0, 0];
    __g.misc.callBPFunction(f);
}

function test_misc_setWindowResolution() {
    __g.misc.setWindowResolution(800, 600);
}

function test_misc_enterReportMode() {
    __g.misc.enterReportMode();
}

function test_misc_exitReportMode() {
    __g.misc.exitReportMode();
}

function test_misc_showAllFoliages() {
    __g.misc.showAllFoliages();
}

function test_misc_hideAllFoliages() {
    __g.misc.hideAllFoliages();
}




/*-------------------------------------------------
  tools
--------------------------------------------------*/
async function test_tools_startPolygonClip() {

    await __g.camera.set(489438.625, 2486334.75, 636.202454, -67.643913, -154.078171, 0);
    await __g.tileLayer.enableClip('A659DF0E404D806CB3511C9DAC22D160');

    let coords = [
        [488912.3125, 2486257.75, 16.357500076293945],
        [489164.1875, 2486585, 186.87702941894531],
        [489389.28125, 2486518.75, 44.41058349609375],
        [489260.15625, 2486184.5, 6.065742015838623]
    ]
    __g.tools.startPolygonClip(coords);
}

function test_tools_stopPolygonClip() {
    __g.tools.stopPolygonClip();
}

async function test_tools_startPlaneClip() {
    __g.tools.startPlaneClip([489399.15625, 2487092.5, 19.214374542236328], [0, 0, 0]);
}

function test_tools_stopPlaneClip() {
    __g.tools.stopPlaneClip();
}

async function test_tools_startVolumeClip() {
    __g.tools.startVolumeClip([489787.90625, 2488905.5, 289.4771728515625], 0);
}

function test_tools_stopVolumeClip() {
    __g.tools.stopVolumeClip();
}



function test_misc_setMeasurement() {
    //options的每个属性都是可选的
    let options = {
        'lineSize': 3.0,
        'pointSize': 8.0,
        'textColor': Color.Yellow,
        'pointColor': [0, 0, 1, 0.3],
        'lineColor': Color.Red,
        'areaColor': [0, 1, 0, 0.3],
        'showCoordinateText': false
    };
    __g.tools.setMeasurement(MeasurementMode.Coordinate, options);
}

function test_misc_startMeasurement() {
    __g.tools.startMeasurement();
}

function test_misc_stopMeasurement() {
    __g.tools.stopMeasurement();
}

function test_misc_lineIntersect() {
    __g.tools.lineIntersect([1068.1212158203125, 4493.12060546875, 188.63694763183594], [1379.934326171875, 5068.63818359375, 6.7398433685302734]);
}


function test_misc_startSkylineAnalysis() {
    let options = {
        showOutline: true,
        outlineThickness: 3.0,
        outlineColor: Color.Red,
        useSceneColor: false,
        sceneColor: Color.Black,
        showSkyline: true,
        windowSize: [400, 200],
        skylineColor: Color.Green,
        backgroundColor: Color.Gray,
        height: 50.0,
        tileLayers: [
            {
                color: Color.Blue,
                ids: ['B1C4E5BD4888DA841D690AA396B061C3', 'A659DF0E404D806CB3511C9DAC22D160']
            }
        ]
    }
    __g.tools.startSkylineAnalysis(options);
}


function test_misc_stopSkylineAnalysis() {
    __g.tools.stopSkylineAnalysis();
}


function test_misc_exportSkyline() {
    __g.tools.exportSkyline('d:/skyline.png', [400, 200], Color.Green, Color.Gray);
}

function test_misc_startViewshedAnalysis() {
    let options = {
        fov_h: 150,
        fov_v: 45,
        height: 10.0,
        visibleColor: Color.Green,
        invisibleColor: Color.Red
    }
    __g.tools.startViewshedAnalysis(options);
}

function test_misc_stopViewshedAnalysis() {
    __g.tools.stopViewshedAnalysis();
}





/*-------------------------------------------------
  settings
--------------------------------------------------*/
function test_settings_setMapMode() {
    __g.settings.setMapMode(MapMode.BigMap, {
        //地图模式相关的参数，具体请参考API帮助文档
        'coordType': 0,
        'mapPont': [0, 0],
        'longitude': 0.0,
        'latitude': 0.0,
        'style': 'http://192.168.1.29:82/B34兴趣点_居名点',
        'renderMode': 0
    }, () => {
        log('设置大地图模式完成');
    });
}

function test_settings_getMapMode() {
    __g.settings.getMapMode();
}

function test_settings_setMapURL() {
    __g.settings.setMapURL('mapbox://styles/mapbox/streets-v10');
}

function test_settings_setHighlightColor() {
    __g.settings.highlightColor(Color.Red);
}

function test_settings_setFovX() {
    __g.settings.setFovX(75);
}

function test_settings_setOceanColor() {
    __g.settings.setOceanColor(Color.Blue);
}




/*-------------------------------------------------
  weather
--------------------------------------------------*/
function test_weather_getParams() {
    __g.weather.getParams();
}

function test_weather_setDateTime() {
    __g.weather.setDateTime(2020, 9, 9, 16, 8, false);
}

function test_weather_setRainParam() {
    __g.weather.setRainParam(1, 1, 1);
}

function test_weather_setSnowParam() {
    __g.weather.setSnowParam(1, 1, 1);
}

function test_weather_disableRainSnow() {
    __g.weather.disableRainSnow();
}

function test_weather_setFogParam() {
    __g.weather.setFogParam(1, 1, 0);
}

function test_weather_setCloudDensity() {
    __g.weather.setCloudDensity(0.8);
}

let __isDarkMode = false;
function test_weather_setDarkMode() {
    __isDarkMode = !__isDarkMode;
    __g.weather.setDarkMode(__isDarkMode);
}




/*-------------------------------------------------
  editHelper
--------------------------------------------------*/
function test_editHelper_setParam() {
    let lineType = 0;           //0：直线，1：曲线
    let buildType = 1;          //0：画多点线段， 1：画多边形
    let drawType = 1;           //0：线  1：平面
    let color = Color.Red;      //绘制颜色
    let drawThickness = 10.0;   //当DrawType为线时设置无效
    __g.editHelper.setParam(lineType, buildType, drawType, color, drawThickness);
}

function test_editHelper_start() {
    __g.editHelper.start();
}

function test_editHelper_cancel() {
    __g.editHelper.cancel();
}

async function test_editHelper_finish() {
    let res = await __g.editHelper.finish(true);
    buildType = res.buildType;

    switch (buildType) {
        case 0: {
            let o = new PolylineData(Math.random());
            o.coordinates = res.coordinates;
            o.color = Color.Red
            o.style = 2;
            o.thickness = 10;
            o.brightness = 1;
            o.flowRate = 0.5;
            __g.polyline.add(o);
        } break;

        case 1: {
            let color = Color.Blue;       //多边形的填充颜色
            let frameColor = Color.Red;
            let frameThickness = 1;
            let o = new PolygonData(Math.random(), color, res.coordinates, frameColor, frameThickness);
            __g.polygon.add(o);
        } break;
    }
}




/*-------------------------------------------------
  测试用例
--------------------------------------------------*/
function testcase_simulate_building_process() {

    __g.camera.set(495271.03125, 2491192, 71.168579, -37.002457, 91.473381, 0);

    let tileLayerId = 'B1C4E5BD4888DA841D690AA396B061C3';
    __g.tileLayer.hideAllActors(tileLayerId);

    let index = 0;
    let timer = setInterval(() => {
        __g.tileLayer.showActor(tileLayerId, __buildingActors[index]);
        if (++index > __buildingActors.length) {
            clearInterval(timer);
            __g.tileLayer.showAllActors(tileLayerId);
        }
    }, 300);
}



async function testcase_simulate_gps_location() {
    await __g.customObject.delete('co1');
    let o = new CustomObjectData('co1');
    o.pakFilePath = HostConfig.Path + '/media/custom.pak';
    o.assetPath = '/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe';
    o.location = __gps_pos[0];
    o.rotation = [0, 0, 0];
    o.scale = [1, 1, 1];
    o.smoothMotion = 1;   //1: 平滑插值，0: 跳跃
    o.coordinateType = 1;   //设置坐标系：0(Projection), 1(WGS84)
    await __g.customObject.add(o);
    await __g.customObject.focus(o.id, -1);

    let index = 0;
    setInterval(async () => {
        if (++index > __gps_pos.length)
            index = 0;
        let pos = __gps_pos[index];
        __g.customObject.setLocation(o.id, pos)
    }, 1200);
}



/*-------------------------------------------------
  压力测试
--------------------------------------------------*/
async function test_stress_add_1000_tags() {
    clearScreen();
    await __g.tag.clear();
    await __g.camera.set(491757.5625, 2490132.25, 126.055817, -82.87175, 178.001175, 0);

    let baseX = 491615.03;
    let baseY = 2490023.75;
    let oa = new Array();

    for (let i = 0; i < 1000; i++) {

        let x = Math.ceil(baseX + Math.random() * 200)
        let y = Math.ceil(baseY + Math.random() * 200)

        let o = new TagData(i);
        o.coordinate = [x, y, 15.0];
        o.imagePath = HostConfig.Path + '/images/tag.png';
        o.url = HostConfig.Path + '/int_popup.html';
        o.imageSize = [28, 28];
        o.text = i.toString();
        oa.push(o);
    }
    await __g.tag.add(oa);
}

async function test_stress_update_1000_tags() {

    __g.tag.updateBegin();  //updateBegin不是异步调用，不需要await

    for (let i = 0; i < 1000; i++)
        __g.tag.setTextBackgroundColor(i, Color.Yellow);

    await __g.tag.updateEnd();
    log('update finished!');
}

async function test_stress_update_tagpos_200() {

    let o = new TagData('t1');
    o.coordinate = [491274.65625, 2489124, 21.0]
    o.imagePath = HostConfig.Path + '/images/tag.png';
    o.text = '北京银行';
    o.range = [1, 10000];

    await __g.tag.clear();
    await __g.camera.set(492472.750000, 2487660.750000, 1637.308838, -49.619568, -93.635345, 0);
    await __g.tag.add(o);

    let i = 0;
    let tid = setInterval(() => {
        if (i++ > 200)
            clearInterval(tid);
        log(`${i} times`);

        o.coordinate[0] += 10;

        __g.tag.setCoordinate('t1', o.coordinate);
    }, 50);
}

async function test_stress_add_heatmap_3000() {
    clearInterval(__tidUpdateHeatMap);
    await __g.tag.clear();
    await __g.heatmap.clear();
    await __g.camera.set(490577.4375, 2489508.75, 2100.174561, -76.326889, -160.474792, 0);

    let bbox = [488670.75, 2488165, 5.7, 491659.59375, 2490987.5, 344.58];
    let range = [0, 100];
    let data = [];
    let pointCount = 2000;  //热力点数量
    for (let i = 0; i < pointCount; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]);    //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]);    //minY ~ maxY
        let z = 0;
        let coord = [x, y, z];                 //热力点的坐标
        let radius = Math.random() * 100;           //热力点影像半径范围
        let heatValue = Math.random() * 100;        //热力值
        let o = new HeatMapPointData(`${i}`, coord, radius, heatValue);
        data.push(o);
    }

    await __g.heatmap.add('heatmap1', bbox, range, data);
    __tidUpdateHeatMap = setInterval(() => {
        let data = [];
        for (let i = 0; i < pointCount; i++) {
            let o = {};
            o.id = `${i}`;
            o.heatValue = Math.random() * 100;
            data.push(o);
        }

        //此处的update没有后续依赖所以不需要await
        __g.heatmap.update('heatmap1', null, null, data);
    }, 1000);
}


async function test_stress_add_800_polygon() {
    let color = Color.Yellow;       //多边形的填充颜色
    let frameThickness = 500;
    let o = new PolygonData('p800', color, __coords800, Color.Blue, frameThickness);

    await __g.polygon.clear();
    await __g.polygon.add(o);
    __g.polygon.focus('p800')
}

async function test_stress_add_800_3dpolygon() {
    let color = [1, 0, 1, 1];   //颜色值
    let height = 5000;           //3D多边形的高度
    let intensity = 4.0;        //亮度
    let type = 1;               //3DPolygon的样式
    let o = new Polygon3DData('p800', type, __coords800, color, height, intensity);

    await __g.polygon3d.clear();
    await __g.polygon3d.add(o);
    __g.polygon3d.focus('p800');
}

async function test_stress_add_10000_polygon() {
    let color = Color.Blue;       //多边形的填充颜色
    let frameColor = Color.Red;
    let frameThickness = 500;
    let o = new PolygonData('p1w', color, __coords1w, frameColor, frameThickness);

    await __g.polygon.clear();
    await __g.polygon.add(o);
    __g.polygon.focus('p1w');
}

async function test_stress_add_10000_3dpolygon() {
    let color = Color.Blue;     //颜色值
    let height = 5000;          //3D多边形的高度
    let intensity = 4.0;        //亮度
    let type = 1;               //3DPolygon的样式
    let o = new Polygon3DData('p1w', type, __coords1w, color, height, intensity);

    await __g.polygon3d.clear();
    await __g.polygon3d.add(o);
    __g.polygon3d.focus('p1w');
}

async function test_stress_polygon_from_geojson() {
    await __g.polygon.clear();

    let count = zoneBoundary.geometries.length;
    for (let i = 0; i < count; i++) {
        let coords = zoneBoundary.geometries[i].coordinates[0];
        let color = Color.Yellow;
        let frameColor = Color.Red;
        let frameThickness = 500;
        let o = new PolygonData(i, color, coords, frameColor, frameThickness);
        __g.polygon.add(o);

        if (i == 0)
            __g.polygon.focus(0);
    }
}

async function test_stress_3dpolygon_from_geojson(fn) {
    await __g.polygon3d.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        let coords = zoneBoundary.geometries[i].coordinates[0];
        let color = Color.Blue;     //颜色值
        let height = 8000;          //3D多边形的高度
        let intensity = 4.0;        //亮度
        let type = i;               //3DPolygon的样式
        let o = new Polygon3DData(i, type, coords, color, height, intensity);
        oa.push(o);
    }
    await __g.polygon3d.add(oa);
    await __g.polygon3d.focus(0, 0);
    if (fn)
        fn(oa);
}

function test_stress_polyline_show_hide_frequently() {

    __g.polyline.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        let o = new PolylineData(i);
        o.coordinates = zoneBoundary.geometries[i].coordinates[0];
        o.color = Color.Red
        o.style = 2;
        o.thickness = 1000;
        o.brightness = 1;
        o.flowRate = 0.5;
        oa.push(o);
    }
    __g.polyline.add(oa, function () {
        __g.polyline.focus(0, 0, () => {
            alert('Polyline创建完成，点击OK开始显隐测试');
            for (let i = 0; i < 100; i++) {
                for (let o of oa) {
                    if (i % 2 == 0)
                        __g.polyline.show(o.id);
                    else
                        __g.polyline.hide(o.id);
                }
            }
        });
    });
}

function test_stress_polygon_show_hide_frequently() {
    __g.polygon.clear();

    let count = zoneBoundary.geometries.length;
    let oa = [];
    for (let i = 0; i < count; i++) {
        let color = Color.Blue;       //多边形的填充颜色
        let frameColor = Color.Red;
        let frameThickness = 500;
        let o = new PolygonData(i, color, zoneBoundary.geometries[i].coordinates[0], frameColor, frameThickness);
        oa.push(o);
    }
    __g.polygon.add(oa, function () {
        __g.polygon.focus(0, 0, () => {
            alert('Polygon创建完成，点击OK开始显隐测试');
            for (let i = 0; i < 100; i++) {
                for (let o of oa) {
                    if (i % 2 == 0)
                        __g.polygon.show(o.id);
                    else
                        __g.polygon.hide(o.id);
                }
            }
        });
    });
}

function test_stress_3dpolygon_show_hide_frequently() {
    test_stress_3dpolygon_from_geojson(function (oa) {
        alert('3DPolygon创建完成，点击OK开始显隐测试');
        for (let i = 0; i < 100; i++) {
            for (let o of oa) {
                if (i % 2 == 0)
                    __g.polygon3d.show(o.id);
                else
                    __g.polygon3d.hide(o.id);
            }
        }
    });
}

function test_stress_3dpolygon_show_hide_frequently2() {
    let i = 0;
    test_polygon3d_add(function () {
        test_polygon3d_focus();
        setInterval(() => {
            if (++i % 2)
                test_polygon3d_hide();
            else
                test_polygon3d_show();
        }, 500);
    });
}


async function test_stress_callback_frequently() {

    for (let i = 0; i < 10; i++) {
        let res = await __g.camera.get();
        let str = `get camera callback, callbackIndex: ${res.callbackIndex}`;
        log(str);
    }
}


function test_stress_playVideo_frequently() {
    let isfirst = true;

    setInterval(function () {

        for (let i = 0; i < 3; i++) {
            if (!isfirst)
                __g.misc.stopPlayVideo('test' + i);

            __g.misc.playVideo('test' + i, 400 * i, 0, 400, 300, 'rtsp://192.168.1.4:555/live');
            isfirst = false;
        }
    }, 3000);
}


//频繁添加修改删除3DPolygon
function test_stress_add_update_delete_3dpolygon() {
    __g.camera.set(488673.28125, 2494341.75, 1381.636353, -36.11198, 78.878166, 0);
    setInterval(function () {
        __g.polygon3d.clear(() => {
            test_polygon3d_add(test_polygon3d_update)
        })
    }, 100);
}
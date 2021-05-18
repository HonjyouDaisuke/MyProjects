/* =========================================================
 * main.js (for Characom Imager Ex Online indexPage)
 * =========================================================
 * Making at 2021/04/13
 * Presented by D.Honjyou
 * ========================================================= */
var mamDraw = [];
mamDraw.isMouseDown = false;
mamDraw.level = "";
mamDraw.position = [];
mamDraw.position.x = 0;
mamDraw.position.y = 0;
mamDraw.position.px = 0;
mamDraw.position.py = 0;

let pointX = [];
let pointY = [];

function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}
function LoadImageFile(files, tabRootID, tabPageRootID) {
    var reader = new FileReader();
    var fileName = files[0].name;
    var newImageName = createNewTab_MainImage(tabRootID, tabPageRootID, baseName(fileName));
    reader.onload = function (event) {
        //var tab = document.getElementById("tab_" + newTabID);
        var src_canvas = document.getElementById("src_cnvs_" + newImageName);
        var exr_canvas = document.getElementById("exr_cnvs_" + newImageName);
        var tmp_canvas = document.getElementById("tmp_cnvs_" + newImageName);
        var ctx = src_canvas.getContext('2d');
        //tab.textContent = fileName;           
        var img = new Image();
        img.onload = function () {
            src_canvas.width = img.naturalWidth;
            src_canvas.height = img.naturalHeight;
            exr_canvas.width = img.naturalWidth;
            exr_canvas.height = img.naturalHeight;
            tmp_canvas.width = img.naturalWidth;
            tmp_canvas.height = img.naturalHeight;
            //canvas.style.width = canvas.width + "px";
            //canvas.style.height = canvas.height + "px";    
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
        src_canvas.isDrawingMode = true;
        addListener("tmp_cnvs_" + newImageName);
        deleteAllSideCanvas('rightSide');
    }
    reader.readAsDataURL(files[0]);
    //console.log('.nav-tabs a[href="#' + newTabID + '"]');
    $("#" + newImageName).tab('show');
    //nowID = newTabID;

    //var node = {};
    //node.text = newTabID;
    //node.icon = "bi bi-images";
    //node.nodes = [];
    //ProjectTree[0].nodes.push(node);
    var src_canvas = document.getElementById("src_cnvs_" + newImageName);
    var ctx_canvas = src_canvas.getContext('2d');
    var imageData = ctx_canvas.getImageData(0, 0, src_canvas.width, src_canvas.height);
    add_NewImage(newImageName, imageData);
    $('#tree').change();
}

function addListener(canvasID) {
    //初期設定
    console.log("listener-->" + canvasID);
    if(canvasID.substring(0, 3) == "tmp") mamDraw.level = "image";
    if(canvasID.substring(0, 3) == "chr") mamDraw.level = "chara";
    mamDraw.canvas = document.getElementById(canvasID);
    mamDraw.canvas.addEventListener("touchstart", onDown);
    mamDraw.canvas.addEventListener("touchmove", onMove);
    mamDraw.canvas.addEventListener("touchend", onUp);
    mamDraw.canvas.addEventListener("mousedown", onMouseDown);
    mamDraw.canvas.addEventListener("mousemove", onMouseMove);
    mamDraw.canvas.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", StopShake);
    mamDraw.context = mamDraw.canvas.getContext("2d");
    mamDraw.context.strokeStyle = "#000000";
    mamDraw.context.lineWidth = 5;
    mamDraw.context.lineJoin = "round";
    mamDraw.context.lineCap = "round";
    //document.getElementById("clearCanvas").addEventListener("click",clearCanvas);
}

function OnOffDrawerMenu() {
    var pen = document.getElementById("dm-pen");
    var sci = document.getElementById("dm-sci");
    var era = document.getElementById("dm-era");

    console.log("--------------------");
    console.log("sci--" + sci.checked);
    console.log("pen--" + pen.checked);
    console.log("era--" + era.checked);

    body = document.getElementById("main-body");
    body.classList.replace('drawer-open', 'drawer-close');
}

function onDown(event) {
    var scaleWidth = mamDraw.canvas.clientWidth / mamDraw.canvas.width;
    var scaleHeight = mamDraw.canvas.clientHeight / mamDraw.canvas.height;
    mamDraw.position.px = (event.touches[0].pageX - event.target.getBoundingClientRect().left - mamGetScrollPosition().x) / scaleWidth;
    mamDraw.position.py = (event.touches[0].pageY - event.target.getBoundingClientRect().top - mamGetScrollPosition().y) / scaleHeight;
    if (mamDraw.isMouseDown == true) drawLine();
    mamDraw.position.x = mamDraw.position.px;
    mamDraw.position.y = mamDraw.position.py;
    pointX.push(mamDraw.position.x);
    pointY.push(mamDraw.position.y);
    mamDraw.isMouseDown = true;
    event.preventDefault();
    event.stopPropagation();
}

function onMouseDown(event) {
    var scaleWidth = mamDraw.canvas.clientWidth / mamDraw.canvas.width;
    var scaleHeight = mamDraw.canvas.clientHeight / mamDraw.canvas.height;
    mamDraw.position.px = (event.clientX - event.target.getBoundingClientRect().left) / scaleWidth;
    mamDraw.position.py = (event.clientY - event.target.getBoundingClientRect().top) / scaleHeight;
    if (mamDraw.isMouseDown == true) drawLine();
    mamDraw.position.x = mamDraw.position.px;
    mamDraw.position.y = mamDraw.position.py;
    pointX.push(mamDraw.position.x);
    pointY.push(mamDraw.position.y);
    mamDraw.isMouseDown = true;
    event.stopPropagation();
}

function onMove(event) {
    if (mamDraw.isMouseDown) {
        var scaleWidth = mamDraw.canvas.clientWidth / mamDraw.canvas.width;
        var scaleHeight = mamDraw.canvas.clientHeight / mamDraw.canvas.height;
        mamDraw.position.px = (event.touches[0].pageX - event.target.getBoundingClientRect().left - mamGetScrollPosition().x) / scaleWidth;
        mamDraw.position.py = (event.touches[0].pageY - event.target.getBoundingClientRect().top - mamGetScrollPosition().y) / scaleHeight;
        drawLine();
        mamDraw.position.x = mamDraw.position.px;
        mamDraw.position.y = mamDraw.position.py;
        pointX.push(mamDraw.position.x);
        pointY.push(mamDraw.position.y);
        mamDraw.position.px = mamDraw.position.x;
        mamDraw.position.py = mamDraw.position.y;
        event.stopPropagation();
    }
}
function onMouseMove(event) {
    if (mamDraw.isMouseDown) {
        var scaleWidth = mamDraw.canvas.clientWidth / mamDraw.canvas.width;
        var scaleHeight = mamDraw.canvas.clientHeight / mamDraw.canvas.height;
        mamDraw.position.px = (event.clientX - event.target.getBoundingClientRect().left) / scaleWidth;
        mamDraw.position.py = (event.clientY - event.target.getBoundingClientRect().top) / scaleHeight;
        drawLine();
        mamDraw.position.x = mamDraw.position.px;
        mamDraw.position.y = mamDraw.position.py;
        pointX.push(mamDraw.position.x);
        pointY.push(mamDraw.position.y);
        mamDraw.position.px = mamDraw.position.x;
        mamDraw.position.py = mamDraw.position.y;
        event.stopPropagation();
    }
}
function onUp(event) {
    onMouseUp(event);
    //mamDraw.isMouseDown=false;
    //fillPath();
    //var rect = getRectangle(pointX, pointY);
    //var canvas = document.getElementById("src_cnvs_" + nowID);
    //var rect_canvas = document.getElementById("exr_cnvs_" + nowID);
    //var outImage = GetRectangleImage(canvas, mamDraw.canvas, rect_canvas, rect);
    //createSideCanvas(outImage);
    //pointX = [];
    //pointY = [];
    //event.stopPropagation();
}


function onMouseUp(event) {
    mamDraw.isMouseDown = false;
    var sci = document.getElementById("dm-sci");
    var pen = document.getElementById("dm-pen");
    var era = document.getElementById("dm-era");

    if(sci.checked){
        fillPath();
        var rect = getRectangle(pointX, pointY);
        var canvas = document.getElementById("src_cnvs_" + ProjectObj[nowProjectID].nodes[nowImageID].name);
        var rect_canvas = document.getElementById("exr_cnvs_" + ProjectObj[nowProjectID].nodes[nowImageID].name);
        var outImage = GetRectangleImage(canvas, mamDraw.canvas, rect_canvas, rect);
        var charaID = add_NewChara(outImage);
        createSideCanvas(charaID, outImage);
    }
    
    //var node;
    
	//node = Object.assign({}, NodeSelect(event.target.id));
    console.log("----->" + event.target.id);
    console.log("node level --> " + mamDraw.level);
    setCurrentImage(mamDraw.level, mamDraw.context.getImageData(0, 0, mamDraw.canvas.width, mamDraw.canvas.height));
    deleteAllSideCanvas('rightSide');
	createAllSideCanvas('rightSide');
	pointX = [];
    pointY = [];
    event.stopPropagation();
}

function drawLine() {
    var sci = document.getElementById("dm-sci");
    var pen = document.getElementById("dm-pen");
    var era = document.getElementById("dm-era");

    
    var scaleWidth = mamDraw.canvas.clientWidth / mamDraw.canvas.width;
    var scaleHeight = mamDraw.canvas.clientHeight / mamDraw.canvas.height;
    if(sci.checked){
        mamDraw.context.strokeStyle = "#000000";
        mamDraw.context.setLineDash([2, 2]);
        mamDraw.context.lineWidth = 2 / scaleWidth;
    }
    if(pen.checked){
        mamDraw.context.strokeStyle = "#000000";
        mamDraw.context.setLineDash([1, 0]);
        mamDraw.context.lineWidth = 5 / scaleWidth;
    }
    if(era.checked){
        mamDraw.context.strokeStyle = "#FFFFFF";
        mamDraw.context.lineWidth = 5 / scaleWidth;
    }
    mamDraw.context.lineJoin = "round";
    mamDraw.context.lineCap = "round";
    mamDraw.context.beginPath();
    mamDraw.context.moveTo(mamDraw.position.px, mamDraw.position.py);
    mamDraw.context.lineTo(mamDraw.position.x, mamDraw.position.y);
    mamDraw.context.stroke();
}

function fillPath() {
    mamDraw.context.beginPath();
    mamDraw.context.moveTo(pointX[0], pointY[0]);
    for (i = 1; i < pointX.length; i++) {
        mamDraw.context.lineTo(pointX[i], pointY[i]);
    }
    mamDraw.context.closePath();
    mamDraw.context.fillStyle = 'rgb(0, 0, 255)';
    mamDraw.context.fill();
}

function mamGetScrollPosition() {
    return {
        "x": document.documentElement.scrollLeft || document.body.scrollLeft,
        "y": document.documentElement.scrollTop || document.body.scrollTop
    };
}

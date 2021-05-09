/* =========================================================
 * main.js (for Characom Imager Ex Online indexPage)
 * =========================================================
 * Making at 2021/04/13
 * Presented by D.Honjyou
 * ========================================================= */
function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}
function LoadImageFile(files, tabRootID, tabPageRootID) {        　
    var reader = new FileReader();              
    var fileName = files[0].name;
    var newImageName = createNewTab_MainImage(tabRootID, tabPageRootID, baseName(fileName));
    reader.onload = function(event) {
        //var tab = document.getElementById("tab_" + newTabID);
        var src_canvas = document.getElementById("src_cnvs_" + newImageName);
        var exr_canvas = document.getElementById("exr_cnvs_" + newImageName);
        var tmp_canvas = document.getElementById("tmp_cnvs_" + newImageName);
        var ctx = src_canvas.getContext('2d');          　
        //tab.textContent = fileName;           
        var img = new Image();                 
        img.onload = function() {              
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

function addListener(canvasID){
    //初期設定
    console.log("listener-->" + canvasID);
    mamDraw.canvas=document.getElementById(canvasID);
    mamDraw.canvas.addEventListener("touchstart",onDown);
    mamDraw.canvas.addEventListener("touchmove",onMove);
    mamDraw.canvas.addEventListener("touchend",onUp);
    mamDraw.canvas.addEventListener("mousedown",onMouseDown);
    mamDraw.canvas.addEventListener("mousemove",onMouseMove);
    mamDraw.canvas.addEventListener("mouseup",onMouseUp);
    window.addEventListener("mousemove",StopShake);
    mamDraw.context=mamDraw.canvas.getContext("2d");
    mamDraw.context.strokeStyle="#000000";
    mamDraw.context.lineWidth=5;
    mamDraw.context.lineJoin="round";
    mamDraw.context.lineCap="round";
    //document.getElementById("clearCanvas").addEventListener("click",clearCanvas);
}

function OnOffDrawerMenu(){
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
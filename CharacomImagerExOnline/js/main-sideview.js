/* =========================================================
 * main-sideview.js (for Characom Imager Ex Online indexPage)
 * =========================================================
 * Making at 2021/04/25
 * Presented by D.Honjyou
 * ========================================================= */

// Create Canvas
function CreateCanvas(sideCanvasRootID, newCanvasID){
    var new_canvas = document.createElement('canvas');
    var strCanvasID = "new_canvas" + SideBarNum.toString();
    new_canvas.id = newCanvasID;
    new_canvas.style.width = "100%";
    new_canvas.style.border = "1px";
    new_canvas.style.solid = "#aaa";
    new_canvas.style = "width:'100%' border:1px solid #aaa";
    new_canvas.addEventListener('dblclick', SideBarDblClick, false);
    // <canvas id="chara" style="border:1px solid #aaa" class="img-fluid"></canvas>
    var side_bar = document.getElementById(sideCanvasRootID);
    var thum_div = document.createElement('div');
    thum_div.className = "thumbnail";
    thum_div.appendChild(new_canvas);
    side_bar.appendChild(thum_div);
    
    SideBarNum++;
}

function createSideCanvas(charaID, outImage){
    CreateCanvas('rightSide', charaID);
    var canvas_tmp = document.getElementById(charaID); 
    var ctx_tmp = canvas_tmp.getContext('2d');
    canvas_tmp.height = outImage.height;
    canvas_tmp.width = outImage.width;
    canvas_tmp.style.width = '30%';
    ctx_tmp.putImageData(outImage, 0, 0); 
}

function deleteAllSideCanvas(sideCanvasRootID){
    var sideCanvas = document.getElementById(sideCanvasRootID);
    while(sideCanvas.firstChild){
        sideCanvas.removeChild(sideCanvas.firstChild)
    }
}

function SideBarDblClick(e){
    //console.log(e.target.id);
    // get imageData from SideCanvas
    var cnvs = document.getElementById(e.target.id);
    var ctx = cnvs.getContext('2d');
    var img = ctx.getImageData(0, 0, cnvs.width, cnvs.height);
    var et = exist_TabFromID('tab-root', e.target.id)
    //create charactor tabs
    if(et == false){
        createNewTab_CharaImage('tab-root', 'tabpage-root', e.target.id, img);
    }
}

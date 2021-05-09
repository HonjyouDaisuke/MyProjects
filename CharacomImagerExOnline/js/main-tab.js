/* =========================================================
 * main-tab.js (for Characom Imager Ex Online indexPage)
 * =========================================================
 * Making at 2021/04/13
 * Presented by D.Honjyou
 * ========================================================= */
function createNewTab_MainImage(tabRootID, tabpageRootID, newTabID) {
    var TabRoot = document.getElementById(tabRootID);

    // テキスト情報を作成
    var anchor = document.createElement("a");
    anchor.href = "#img_" + newTabID;
    anchor.id = "tab_" + newTabID;
    anchor.className = 'nav-link';
    anchor.setAttribute('data-bs-toggle', 'tab');
    anchor.setAttribute('data-toggle', 'tab');
    anchor.setAttribute('role', 'tab');
    anchor.setAttribute('aria-controls', 'img_' + newTabID);
    anchor.setAttribute('aria-selected', 'false');
    anchor.textContent = newTabID;
    // close button
    //var span = document.createElement("span");
    //span.className = 'close';
    //span.textContent = '×';
    //anchor.appendChild(span);

    // tab-root要素に追加
    TabRoot.appendChild(anchor);

    // add tab page
    var tabpage_root = document.getElementById(tabpageRootID);
    var tabpage = document.createElement("div");
    tabpage.className = "tab-pane";
    tabpage.id = "img_" + newTabID;

    // add div [canvas-wrapper]
    var wrapper_div = document.createElement("div");
    wrapper_div.className = "canvas-wrapper";

    // add src_canvas
    var src_canvas = document.createElement("canvas");
    src_canvas.id = "src_cnvs_" + newTabID;
    src_canvas.style = "border:1px solid #aaa";
    src_canvas.class = "img-fluid";

    // add exr_canvas
    var exr_canvas = document.createElement("canvas");
    exr_canvas.id = "exr_cnvs_" + newTabID;
    exr_canvas.style = "border:1px solid #aaa";
    exr_canvas.class = "img-fluid";

    // add tmp_canvas
    var tmp_canvas = document.createElement("canvas");
    tmp_canvas.id = "tmp_cnvs_" + newTabID;
    tmp_canvas.style = "border:1px solid #aaa";
    tmp_canvas.class = "img-fluid";

    // add div,tabpage,tabroot
    wrapper_div.appendChild(src_canvas);
    wrapper_div.appendChild(exr_canvas);
    wrapper_div.appendChild(tmp_canvas);

    tabpage.appendChild(wrapper_div);
    tabpage_root.appendChild(tabpage);

    // target tab show
    $("#tab_" + newTabID).tab('show');
    return (newTabID);
}

function createNewTab_CharaImage(tabRootID, tabpageRootID, newTabID, image_data) {
    var TabRoot = document.getElementById(tabRootID);
    // テキスト情報を作成
    var anchor = document.createElement("a");
    anchor.href = '#chr_' + newTabID;
    anchor.id = "tab_" + newTabID;
    anchor.className = 'nav-link';
    anchor.setAttribute('data-bs-toggle', 'tab');
    anchor.setAttribute('data-toggle', 'tab');
    anchor.setAttribute('role', 'tab');
    anchor.setAttribute('aria-controls', 'chr_' + newTabID);
    anchor.setAttribute('aria-selected', 'false');
    anchor.textContent = newTabID + ' ';
    // close button
    var span = document.createElement("span");
    span.className = 'close';
    span.textContent = '×';
    anchor.appendChild(span);

    // tab-root要素に追加
    TabRoot.appendChild(anchor);

    // add tab page
    var tabpage_root = document.getElementById(tabpageRootID);
    var tabpage = document.createElement("div");
    tabpage.className = "tab-pane";
    tabpage.id = "chr_" + newTabID;

    // add canvas
    var new_canvas = document.createElement("canvas");
    new_canvas.id = "chr_cnvs_" + newTabID;
    new_canvas.style = "border:1px solid #aaa";
    new_canvas.class = "img-fluid";

    // canvas copy to new_canvas
    //var src_canvas = document.getElementById(targetID);
    //var src_ctx = src_canvas.getContext('2d');
    var new_ctx = new_canvas.getContext('2d');
    new_canvas.width = image_data.width;
    new_canvas.height = image_data.height;
    //var img = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
    new_ctx.putImageData(image_data, 0, 0);

    tabpage.appendChild(new_canvas);
    tabpage_root.appendChild(tabpage);

    // target tab show
    $("#tab_" + newTabID).tab('show');
}

function exist_TabFromID(tabRootID, tabID) {
    var TabRoot = document.getElementById(tabRootID);
    var bRet = false;
    Array.from(TabRoot.children).forEach(element => {
        console.log("element = " + element.id);
        if(element.id == "tab_" + tabID){
            $("#tab_" + tabID).tab('show');
            bRet = true;
        }
    });
    return(bRet);
}

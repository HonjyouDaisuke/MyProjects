/* =========================================================
 * main-treeview.js (for Characom Imager Ex Online indexPage)
 * =========================================================
 * Making at 2021/04/13
 * Presented by D.Honjyou
 * ========================================================= */

// Global Object (Project Object)
var ProjectObj = [];
var nowProjectID = 0;
var nowImageID = 0;
var nowCharaID = 0;
var newImageID = 0;
var newCharaID = 0;

function init_ProjectObj(prjName) {
    var rootnode = {};
    rootnode.text = prjName;
    rootnode.level = "project";
    rootnode.name = prjName;
    rootnode.id = nowProjectID;

    ProjectObj.push(rootnode);
}

function add_NewImage(ImageName, imageData) {
    if (ProjectObj[nowProjectID].hasOwnProperty('nodes') == false) {
        ProjectObj[nowProjectID].nodes = [];
    }
    var imageNode = {};
    imageNode.text = ImageName;
    imageNode.level = "image";
    imageNode.icon = "bi bi-images";
    imageNode.name = ImageName;
    imageNode.id = newImageID;
    imageNode.projectID = nowProjectID;
    imageNode.imageData = imageData;
    ProjectObj[nowProjectID].nodes.push(imageNode);
    console.log(imageNode);
    newImageID += 1;
}

function add_NewChara(CharaName, imageData) {
    if (ProjectObj[nowProjectID].nodes[nowImageID].hasOwnProperty('nodes') == false) {
        ProjectObj[nowProjectID].nodes[nowImageID].nodes = [];
    }
    var charaNode = {};
    charaNode.text = ProjectObj[nowProjectID].nodes[nowImageID].name + "-" + newCharaID;
    charaNode.level = "chara";
    charaNode.icon = "bi bi-image";
    charaNode.name = charaNode.text;
    charaNode.projectID = nowProjectID;
    charaNode.imageID = nowImageID; 
    charaNode.id = newCharaID;
    ProjectObj[nowProjectID].nodes[nowImageID].nodes.push(charaNode);
    newCharaID += 1;
    $("#tree").change();
}

function SelectNode(e, data){
    if(data.level == "image"){
        nowProjectID = data.projectID;
        nowImageID = data.id;
    }
    if(data.level == "chara"){
        nowProjectID = data.projectID;
        nowImageID = data.imageID;
        nowCharaID = data.id;
    }
    console.log("p - i - c = " + nowProjectID + "," + nowImageID + "," + nowCharaID)
    console.log("level = " + data.level);
    console.log("text = " + data.text);
}
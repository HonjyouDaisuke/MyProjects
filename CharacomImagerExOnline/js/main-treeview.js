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
//var newImageID = 0;
//var newCharaID = 0;

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
    //console.log("newTabID = " + imageTabID);
    var imageNode = {};
    imageNode.text = ImageName;
    imageNode.level = "image";
    imageNode.icon = "bi bi-images";
    imageNode.name = ImageName;
    imageNode.id = ProjectObj[nowProjectID].nodes.length;
    imageNode.projectID = nowProjectID;
    imageNode.imageData = imageData;
    ProjectObj[nowProjectID].nodes.push(imageNode);
    console.log(imageNode);
    nowImageID = imageNode.id;
    //newImageID += 1;
}

function add_NewChara(imageData) {
    if (ProjectObj[nowProjectID].nodes[nowImageID].hasOwnProperty('nodes') == false) {
        ProjectObj[nowProjectID].nodes[nowImageID].nodes = [];
    }
    var charaNode = {};
    charaNode.text = ProjectObj[nowProjectID].nodes[nowImageID].name + "-" + ProjectObj[nowProjectID].nodes[nowImageID].nodes.length;
    charaNode.level = "chara";
    charaNode.icon = "bi bi-image";
    charaNode.name = charaNode.text;
    charaNode.projectID = nowProjectID;
    charaNode.imageID = nowImageID;
    charaNode.imageData = imageData;
    charaNode.id = ProjectObj[nowProjectID].nodes[nowImageID].nodes.length;
    ProjectObj[nowProjectID].nodes[nowImageID].nodes.push(charaNode);
    //newCharaID += 1;
    $("#tree").change();
    return(charaNode.text);
}

function setCurrentImage(level, imageData) {
    if (level == "image") {
        ProjectObj[nowProjectID].nodes[nowImageID].imageData = imageData;
    }
    if (level == "chara") {
        ProjectObj[nowProjectID].nodes[nowImageID].nodes[nowCharaID].imageData = imageData;
    }

}
function NodeSelect(name){
    var i=0;
    var j=0;
    var node;

    //console.log("------" + name + "-----");
    if('nodes' in ProjectObj[0]){
        ProjectObj[0].nodes.forEach(element => {
            if(element.name == name){
                //console.log("Get! element" + name);
                node = Object.assign({}, element);
            }
            //console.log("element check => " + element.name + ":" + name);
            if('nodes' in element){
                element.nodes.forEach(child => {
                    if(child.name == name){
                        //console.log("Get! child" + name);
                        node = Object.assign({}, child);
                    }
                    //console.log("child check => " + child.name + ": " + name);
                });
            }
        });
    }
    return(node);
}

function SelectNode(e, data){
    var prevProjectID = nowProjectID;
    var prevImageID = nowImageID;
    var prevCharaID = nowImageID;
    if(data.level == "image"){
        nowProjectID = data.projectID;
        nowImageID = data.id;

        if(prevImageID != nowImageID){
            deleteAllSideCanvas('rightSide');
            console.log("Delete All SideCanavs(image)");
            if('nodes' in ProjectObj[nowProjectID].nodes[nowImageID]){
                ProjectObj[nowProjectID].nodes[nowImageID].nodes.forEach(charaNode =>{
                    createSideCanvas(charaNode.imageID, charaNode.imageData);
                });
            }
        }
    }
    if(data.level == "chara"){
        nowProjectID = data.projectID;
        nowImageID = data.imageID;
        nowCharaID = data.id;
        if(prevImageID != nowImageID){
            deleteAllSideCanvas('rightSide');
            console.log("Delete All SideCanavs(chara)");
            if('nodes' in ProjectObj[nowProjectID].nodes[nowImageID]){
                ProjectObj[nowProjectID].nodes[nowImageID].nodes.forEach(charaNode =>{
                    createSideCanvas(charaNode.name, charaNode.imageData);
                    console.log("chara side create..." + charaNode.name);
                });
            }
        }
    }
    console.log("p - i - c = " + nowProjectID + "," + nowImageID + "," + nowCharaID)
    console.log("level = " + data.level);
    console.log("text = " + data.text);
}

function getNodeFromID(nodeID){
    var retNode

    if('nodes' in ProjectObj[nowProjectID]){
        ProjectObj[nowProjectID].nodes.forEach(element => {
            if(element.id == nodeID){
                retNode = element;
            }
            if('nodes' in element){
                element.nodes.forEach(child => {
                    if(child.id == nodeID){
                        retNode = child;
                    }
                    //console.log("child check => " + child.name + ": " + name);
                });
            }
        });
    }
    return(retNode);
}
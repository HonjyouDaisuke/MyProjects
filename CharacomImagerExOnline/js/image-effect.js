/* =========================================================
 * image-effect.js (for Characom Imager Ex Online)
 * =========================================================
 * Making at 2021/04/13
 * Presented by D.Honjyou
 * ========================================================= */

// Rectangle function
function struct(func) {
    return function () {
        var f = new func();
        func.apply(f, arguments); // (C)
        return f;
    }; // (B)
}

// Rectangle struct
var Rect = struct(function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
});

// Get Rectangle from Points Data
function getRectangle(point_x, point_y) {
    var r = new Rect(0, 0, 0, 0);
    max_x = 0;
    min_x = 9999999;
    max_y = 0;
    min_y = 9999999;

    for (i = 0; i < pointX.length; i++) {
        if (point_x[i] > max_x) max_x = point_x[i];
        if (point_x[i] < min_x) min_x = point_x[i];
    }
    for (i = 0; i < pointX.length; i++) {
        if (point_y[i] > max_y) max_y = point_y[i];
        if (point_y[i] < min_y) min_y = point_y[i];
    }
    r.x = min_x;
    r.y = min_y;
    r.width = max_x - min_x;
    r.height = max_y - min_y;

    return r;
}

//2値化処理
function BinarizationImage(ImageData) {
    //モノクロ変換
    for (i = 0; i < ImageData.height; i++) {
        for (j = 0; j < ImageData.width; j++) {
            var index = (j + i * ImageData.width) * 4;
            var R = ImageData.data[index + 0];
            var G = ImageData.data[index + 1];
            var B = ImageData.data[index + 2];
            var A = ImageData.data[index + 3];

            ImageData.data[index + 0] = 0.30 * R + 0.59 * G + 0.11 * B;
            ImageData.data[index + 1] = 0.30 * R + 0.59 * G + 0.11 * B;
            ImageData.data[index + 2] = 0.30 * R + 0.59 * G + 0.11 * B;
        }
    }

    //判別分析
    var sb2_max = 0;
    for (t_num = 0; t_num < 256; t_num++) {
        var sb2 = 0.0;
        var w0 = 0.0;
        var w1 = 0.0;
        var m0 = 0.0;
        var m1 = 0.0;
        var class0 = 0;
        var class1 = 0;
        var sum0 = 0;
        var sum1 = 0;
        var ave0 = 0;
        var ave1 = 0;
        for (i = 0; i < ImageData.height; i++) {
            for (j = 0; j < ImageData.width; j++) {
                var index = (j + i * ImageData.width) * 4;
                if (ImageData.data[index + 0] < t_num) {
                    sum0 += ImageData.data[index + 0];
                    class0++;
                } else {
                    sum1 += ImageData.data[index + 0];
                    class1++;
                }
            }
        }
        w0 = class0 / (ImageData.width * ImageData.height);
        w1 = class1 / (ImageData.width * ImageData.height);
        if (class0 == 0) {
            m0 = 0;
        } else {
            m0 = sum0 / class0;
        }
        if (class1 == 0) {
            m1 = 0;
        } else {
            m1 = sum1 / class1;
        }
        sb2 = w0 * w1 * (m0 - m1) * (m0 - m1);
        if (sb2 > sb2_max) {
            sb2_max = sb2;
            t = t_num;
        }
    }

    for (i = 0; i < ImageData.height; i++) {
        for (j = 0; j < ImageData.width; j++) {
            var index = (j + i * ImageData.width) * 4;
            var R = ImageData.data[index + 0];
            var a;
            if (R < t) {
                a = 0;
            } else {
                a = 255;
            }
            ImageData.data[index + 0] = a;
            ImageData.data[index + 1] = a;
            ImageData.data[index + 2] = a;
        }
    }

}

//矩形、モノクロ画像を作り、文字を抽出
function CompRectImage(ocImage, exImage, moImage, width, height) {
    var outImage = new ImageData(width, height);

    for (i = 0; i < ocImage.height; i++) {
        for (j = 0; j < ocImage.width; j++) {
            var index = (j + i * width) * 4;
            var ocR = ocImage.data[index + 0];
            var ocG = ocImage.data[index + 1];
            var ocB = ocImage.data[index + 2];
            var ocA = ocImage.data[index + 3];
            var exR = exImage.data[index + 0];
            var exG = exImage.data[index + 1];
            var exB = exImage.data[index + 2];
            var moB = moImage.data[index + 0];

            if (exB > 250 && moB == 0) {
                outImage.data[index + 0] = ocR;
                outImage.data[index + 1] = ocG;
                outImage.data[index + 2] = ocB;
                outImage.data[index + 3] = ocA;
            }
        }
    }

    return (outImage);
}

// Get Rectangle Image From originalCanvas return outImage
function GetRectangleImage(originalCanvas, extractionCanvas, rectCanvas, rect) {
    var ocContext = originalCanvas.getContext('2d');
    var exContext = extractionCanvas.getContext('2d');
    var moContext = originalCanvas.getContext('2d');
    var reContext = rectCanvas.getContext('2d');
    var ocImage = ocContext.getImageData(rect.x, rect.y, rect.width, rect.height);
    var exImage = exContext.getImageData(rect.x, rect.y, rect.width, rect.height);
    var moImage = moContext.getImageData(rect.x, rect.y, rect.width, rect.height);

    BinarizationImage(moImage);
    var outImage = CompRectImage(ocImage, exImage, moImage, ocImage.width, ocImage.height);
    drawRect(rectCanvas, reContext, rect);
    clearCanvas(extractionCanvas);

    return (outImage);
}

function drawRect(rectCanvas, rectContext, rect) {
    var scaleWidth = rectCanvas.clientWidth / rectCanvas.width;
    var scaleHeight = rectCanvas.clientHeight / rectCanvas.height;
    rectContext.strokeStyle = "red";
    rectContext.setLineDash([5 / scaleWidth, 5 / scaleWidth]);
    rectContext.lineWidth = 2 / scaleWidth;
    rectContext.lineJoin = "round";
    rectContext.lineCap = "round";
    rectContext.beginPath();

    rectContext.rect(rect.x, rect.y, rect.width, rect.height);

    rectContext.stroke();
    //console.log("aaaa");
}

function clearCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

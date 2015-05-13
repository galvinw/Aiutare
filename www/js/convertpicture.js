function convertpicture(image) {

	// var img = document.createElement("img");
 //        img.src = image;

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);
	dataURL = canvas.toDataURL("image/png");
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

}

// return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

function resizeImg(img) {
    
    width = img.width;
    img.height = 0.6 * width;
    }


function getImageDataURL(local_name, callback) {    
var data, canvas, ctx;
	// var img = document.createElement("img");
 //        img.src = local_name;
         
        canvas = document.createElement('canvas');
		canvas.width = local_name.width;
		canvas.height = local_name.height;
        canvas.getContext("2d").drawImage(local_name, 0, 0);
		dataURL = canvas.toDataURL("image/png");
        callback(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    
}

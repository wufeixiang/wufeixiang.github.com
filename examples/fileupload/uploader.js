
function previewfile(file) {
  if (acceptedTypes[file.type] === true) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;
      image.width = 250; // a fake resize
      holder.appendChild(image);
    };

    reader.readAsDataURL(file);
  }  else {
    holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
    console.log(file);
  }
}

function readfiles(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      previewfile(files[i]);
    }
	upload_file(formData);
}

function upload_file(formData)
{
	// now post a new XHR request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/devnull.php');
	xhr.onload = function() {
	    $("#result").html("上传完成");
	};

	xhr.upload.onprogress = function (event) {
	   $("#result").html("正在上传中...");
	}

	xhr.send(formData);
}
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
var markdownpdf = require("markdown-pdf");
var fs = require("fs");




router.post('/upload', upload.single('file'), function(req, res, next) {
	console.dir(req.file);

  var data = {
    'message': 'File upload complete',
    'fileId': req.file.filename,
    // 'size': req.file.size
  };

	res.jsonp(data);
});


// Converts to MD to PDF
router.get('/convert/:fileId', function(req, res, next) {

  var options = {
    //cssPath: "./KEEPS.css"
  }

  var filename = "uploads/" + req.params.fileId;

  fs.createReadStream(filename)
    .pipe(markdownpdf(options))
    .pipe(res);
  //fs.unlinkSync(filename);
});


module.exports = router;

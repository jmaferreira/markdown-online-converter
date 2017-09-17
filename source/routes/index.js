var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './filestore/' });
var markdownpdf = require("markdown-pdf");
var fs = require("fs");
var base64 = require('base64-stream');
var path = require('path');



router.post('/upload', upload.single('file'), function(req, res, next) {
	console.dir(req.file);

  var data = {
    'message': 'File upload complete',
    'fileId': req.file.filename,
    'size': req.file.size
  };

	res.jsonp(data);
});




router.post('/convert', upload.single('file'), function(req, res, next) {
	console.dir(req.file);

  var data = {
    'id': req.file.filename + '.pdf',
  };

  var markdownFilepath = req.file.path;
  var pdfFilePath = path.join(__dirname, '../filestore/' + req.file.filename + '.pdf');

  var pdfWriteStream = fs.createWriteStream(pdfFilePath);
  convertToPdf(markdownFilepath, pdfWriteStream, true, function() {
    console.log("PDF written at " + pdfFilePath);
    res.jsonp(data);
  });

});





function convertToPdf(markdownFilepath, writeStream, deleteinputFile, callback) {

  var options = {
    //cssPath: "./KEEPS.css"
  }

  var stream = fs.createReadStream(markdownFilepath)
                .pipe(markdownpdf(options))
                .pipe(writeStream);


    stream.on('finish', function () {
      if(deleteinputFile) {
        fs.unlink(markdownFilepath, callback);
      } else {
        callback();
      }
    });

}

// // Converts to MD to PDF
// router.get('/:filename', function(req, res, next) {
//   var filePath =  path.join(__dirname, '../filestore/' + req.params.filename);
// 	//res.type('application/pdf')
// 	//res.setHeader
//   res.sendFile(filePath);
// });


module.exports = router;

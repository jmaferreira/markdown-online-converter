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



// converts and returns the pdf stream imediatly
router.post('/convert2', upload.single('file'), function(req, res, next) {
  var markdownFilepath = req.file.path;
  var pdfFilePath = path.join(__dirname, '../filestore/' + req.file.filename + '.pdf');
  var pdfWriteStream = fs.createWriteStream(pdfFilePath);

	console.info("Starting conversion of " + markdownFilepath);
  convertToPdf(markdownFilepath, res, true, function() {
		console.info("Finished conversion. PDF sent to client.");
  });

});





router.post('/convert', upload.single('file'), function(req, res, next) {
	//console.dir(req.file);

  var markdownFilepath = req.file.path;
  var pdfFilePath = path.join(__dirname, '../filestore/' + req.file.filename + '.pdf');
  var pdfWriteStream = fs.createWriteStream(pdfFilePath);

	console.info("Starting conversion of " + markdownFilepath);
  convertToPdf(markdownFilepath, pdfWriteStream, true, function() {
    console.info("Finished conversion. PDF written at " + pdfFilePath);
    res.jsonp( { 'id': "/pdf/" + req.file.filename + '.pdf' } );
  });

});





function convertToPdf(markdownFilepath, writeStream, deleteinputFile, callback) {

  var options = {
    //cssPath: path.join(__dirname, 'pdf-template.css'),
		cssPath: path.join(__dirname, 'template-keeps.css'),
		paperFormat: 'A4',
		paperBorder: '2cm',
		runningsPath: path.join(__dirname, 'runnings.js'),
		//preProcessHtml: function() {}
  }

  var stream = fs.createReadStream(markdownFilepath)
                .pipe(markdownpdf(options))
                .pipe(writeStream);


    stream.on('finish', function () {
      if(deleteinputFile) {
        fs.unlink(markdownFilepath, function() {
					console.info("Deleted file " + markdownFilepath);
					callback();
				});
      } else {
				callback();
			}
    });

}


router.get('/pdf/:filename', function(req, res, next) {
  var filePath =  path.join(__dirname, '../filestore/' + req.params.filename);
  res.sendFile(filePath, function() {
		fs.unlink(filePath, function() {
			console.info("Deleted file " + filePath);
		});
	});
});



module.exports = router;

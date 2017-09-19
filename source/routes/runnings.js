exports.header = null;
// {
//   height: "1cm",
//   contents: function(pageNum, numPages) {
//     return "<div style='margin-left: -5px;font-size: 7px;font-family: 'opensans', Helvetica, arial, sans-serif;' class='page-header'> <span style='float:left'>KEEP SOLUTIONS</span></div>"
//   }
// }

exports.footer = {
  height: "1cm",
  contents: function(pageNum, numPages) {
    return "<div style='margin-left: 0;font-size: 7px;font-family: 'opensans', Helvetica, arial, sans-serif;' class='page-header'><span style='float:right'>" + pageNum + " / " + numPages + "</span></div>"
  }
}

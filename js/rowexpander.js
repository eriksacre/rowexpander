/* RowExpander */

(function($) {
  var indicator = "<i class='indicator'></i>";
  var loading = "<i class='loading'></i>";
  var openCloseCell = "<td>" + indicator + "</td>";

  $.fn.rowExpander = function(scan) {
    var nodes = scan ? $("body").find("[data-expand]") : this;
    return nodes.each(function() {
      var rows = $(this).find("tr");
      var firstRow = rows.first();
      firstRow.append("<th class='openclose'></th>");
      var colCount = firstRow.find("th").length;

      rows.filter(":odd").addClass('odd');
      rows.slice(1).each(function() {
        var href = $(this).attr("data-href");
        if(href) {
          $(this).addClass("closed");
          $(this).append(openCloseCell);
          $(this).after("<tr class='detail hidden'><td colspan='" + colCount + "'></td></tr>");
          $(this).click(function() {
            $(this).toggleClass("open");
            $(this).next().toggleClass("hidden");
            if($(this).hasClass("open")) {
              $(this).next().children().first().html(loading);
              $(this).next().children().first().load($(this).attr("data-href"));
            }
          });
        } else {
          $(this).append("<td></td>");
        }
      });
    });
  };

  $(function() {
    $.fn.rowExpander(true);
  });
})(jQuery);

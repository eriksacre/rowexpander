/* RowExpander */

(function($) {
  var indicator = "<i class='indicator'></i>";
  var loading = "<i class='loading'></i>";
  var openCloseCell = "<td>" + indicator + "</td>";
  var headerCell = "<th class='openclose'></th>";
  var emptyCell = "<td></td>";
  function detailRow(colCount) {
    return "<tr class='detail hidden'><td colspan='" + colCount + "'></td></tr>";
  }

  function RowExpander(element, options) {
    this.element = element;
    this.options = options;
    this.settings = {};
    this.rows = this.element.find("tr");
    this.colCount = 0;
    this.expand();
  }

  RowExpander.prototype = {
    expand: function() {
      this.overrideOptions();
      this.dataOptions();
      this.expandHeader();
      this.stripeTable();
      this.setupExpandableRows();
    },

    overrideOptions: function() {
      this.settings = $.extend({
        'position': 'right'
      }, this.options);
    },

    dataOptions: function() {
      var attrName, attrValue;
      var expander = this;
      $.each(expander.settings, function(key, value) {
        attrName = "data-" + key;
        attrValue = expander.element.attr(attrName);
        if(attrValue) {
          expander.settings[key] = attrValue;
        }
      });
    },

    addCol: function(element, html) {
      if(this.settings['position'] == 'left') {
        return element.prepend(html);
      } else {
        return element.append(html);
      }
    },

    expandHeader: function() {
      var firstRow = this.rows.first();
      this.addCol(firstRow, headerCell);
      this.colCount = firstRow.find("th").length;
    },

    stripeTable: function() {
      this.rows.filter(":odd").addClass('odd');
    },

    setupExpandableRows: function() {
      var expander = this;
      this.rows.slice(1).each(function() {
        var href = $(this).attr("data-href");
        if(href) {
          $(this).addClass("closed");
          expander.addCol($(this), openCloseCell);
          $(this).after(detailRow(expander.colCount));
          $(this).click(function() {
            $(this).toggleClass("open");
            $(this).next().toggleClass("hidden");
            if($(this).hasClass("open")) {
              $(this).next().children().first().html(loading);
              $(this).next().children().first().load($(this).attr("data-href"));
            }
          });
        } else {
          expander.addCol($(this), emptyCell);
        }
      });
    }
  }

  $.fn.rowExpander = function(options, scan) {
    var nodes = scan ? $("body").find("[data-expand]") : this;

    return nodes.each(function() {
      expander = new RowExpander($(this), options);
    });
  };

  $(function() {
    $.fn.rowExpander({}, true);
  });
})(jQuery);

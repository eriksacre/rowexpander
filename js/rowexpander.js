/*
* RowExpander: jQuery plugin to make table rows expandable, and
* dynamically load detail-rows.
*
* Source: https://github.com/eriksacre/rowexpander
* Copyright 2012 Erik Sacre.
*
* Released under the MIT license.
*/

(function($) {
  var loading = "<i class='re-loading'></i>";
  var headerCell = "<th class='re-openclose'></th>";
  var emptyCell = "<td></td>";
  function openCloseCell(position) {
    return "<td><i class='re-indicator " + position + "'></i></td>";
  }
  function detailRow(colCount) {
    return "<tr class='re-detail re-hidden'><td colspan='" + colCount + "'></td></tr>";
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
      this.rows.filter(":odd").addClass('re-odd');
    },

    setupExpandableRows: function() {
      var expander = this;
      this.rows.slice(1).each(function() {
        var href = $(this).attr("data-href");
        if(href) {
          $(this).addClass("re-collapsible");
          expander.addCol($(this), openCloseCell(expander.settings["position"]));
          $(this).after(detailRow(expander.colCount));
          $(this).click(expander.expandCollapseHandler);
        } else {
          expander.addCol($(this), emptyCell);
        }
      });
    },

    expandCollapseHandler: function() {
      $(this).toggleClass("re-open");
      $(this).next().toggleClass("re-hidden");
      if($(this).hasClass("re-open")) {
        $(this).next().children().first().html(loading);
        $(this).next().children().first().load($(this).attr("data-href"));
      }
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

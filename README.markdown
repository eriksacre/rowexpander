# RowExpander

RowExpander is a jQuery plugin that will turns the rows of a table into
expandable/collapsable rows. The expanded part is loaded dynamically.

## What does it do?

RowExpander makes the rows of a table expandable. When a user clicks on
an expandable row, a detail-row is shown. The content of the detail low
is loaded dynamically through Ajax.

## How does it work?

RowExpander uses data-attributes to determine its behaviour.

* Add a data-expand attribute to the table to use the RowExpander plugin
* Optionally add a data-position attribute to the table. By default the
  expand/collapse-indicator is shown at the right. Set this attribute to
"left" to have the indicators appear at the start of a line
* To make a row expandable, add a data-href attribute. The content
  should point to something that returns the content of the detail row.
It will be loaded via Ajax. 

# License

RowExpander is released under the [MIT license](http://opensource.org/licenses/MIT).

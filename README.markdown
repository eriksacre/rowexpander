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
* Because the expanded table will have additional rows, the standard
  techniques to stripe a table won't work anymore. The plugin helps by
putting the class 're-odd' on odd rows, skipping the additional
detail-rows.
* For more information about styles and markup, please look at the
  example in the demo folder.

It is also possible to call the plugin as follows:

```javascript
$("#people").rowExpander();
```

If you want to override the default options, you can pass the options as
the first argument:

```javascript
$("#people").rowExpander({ 'position': 'left' });
```

The expandable rows still require a data-href.

## Example

You can see an example in the demo folder. Here's the gist of it:

```html
    <table data-expand data-position="left">
      <tr>
        <th>Name</th>
        <th>Skill</th>
      </tr>
      <tr data-href="people-1.html">
        <td>Erik</td>
        <td>Web development</td>
      </tr>
      <tr data-href="people-2.html">
        <td>Katty</td>
        <td>Singing</td>
      </tr>
      <tr>
        <td>Dixie</td>
        <td>Barking</td>
      </tr>
    </table>
```

The table has both the data-expand and data-position
attributes. data-expand does not need a value. It is used by the plugin
to find tables that should be turned into expandable ones.

In this demo the collapse/expand indicators will be displayed left of
the rows, hence the data-position="left".

There are two rows with a data-href. These two rows will become
expandable. The third row does not have a data-href, and will remain
untouched.

# License

RowExpander is released under the [MIT license](http://opensource.org/licenses/MIT).

var current_selected_provider_id = "Provider1";
//var current_selected_diagram_id = "Diagram1";
var current_selected_table_id = "";

var current_selected_row = "";
var current_sel_row_num;

var provider_list = ["Provider1"];

var table_id_list = {"Provider1":[]};

//var diagram_list = { "Provider1": ["Diagram1"] };
//var Schema_SourceFileName_List = { "Provider1": {}};

var table_column_list = { "Provider1": {} };

var res = [];

jsPlumb.ready(function () {
    jsPlumb.importDefaults({
        ConnectionsDetachable: false
    });
});

$(document).ready(function () {
    $(".btn-cancel").click(function () {
        location.href = "#";
    });

    //$("input").focus(function () {
    //    $(this).removeClass("alert-input");
    //});


    $("#btn_load_diagram").click(function () {
        current_selected_provider_id = $("#provider_select").val();

        Display_table_name_list();

        redraw_all_table();
        redraw_all_connection();
    });


    $('#provider_select').change(function () {
        var str = $(this).val();
        $("#diagram_select").val(str);
    });


    $("#btn-insTbl").click(function () {
        var str = '';
        str += '<div class="popup">';
        str += '<h2>Add</h2>';
        str += '<input id="pop_tablename_input" type="text" placeholder="table_name" />';
        str += '<a class="close" href="#">&times;</a>';
        str += '<hr />';
        str += '<div class="content">';
        str += '<div class="row">';
        str += '<input type="text" placeholder="primary-key" />';

        str += '<select type="text">';
        str += '<option>INT</option>';
        str += '<option>VARCHAR</option>';
        str += '<option>TEXT</option>';
        str += '<option>DATE</option>';
        str += '<option>TINYINT</option>';
        str += '<option>SMALLINT</option>';
        str += '<option>MEDIUMINT</option>';
        str += '<option>BIGINT</option>';
        str += '<option>DECIMAL</option>';
        str += '<option>FLOAT</option>';
        str += '<option>DOUBLE</option>';
        str += '<option>REAL</option>';
        str += '<option>BIT</option>';
        str += '<option>BOOLEAN</option>';
        str += '<option>SERIAL</option>';
        str += '<option>DATETIME</option>';
        str += '<option>TIMESTAMP</option>';
        str += '<option>TIME</option>';
        str += '<option>YEAR</option>';
        str += '<option>CHAR</option>';
        str += '<option>TINYTEXT</option>';
        str += '<option>TEXT</option>';
        str += '<option>MEDIUMTEXT</option>';
        str += '<option>LONGTEXT</option>';
        str += '<option>BINARY</option>';
        str += '<option>VARBINARY</option>';
        str += '<option>TINYBLOB</option>';
        str += '<option>MEDIUMBLOB</option>';
        str += '<option>BLOB</option>';
        str += '<option>ENUM</option>';
        str += '<option>SET</option>';
        str += '<option>GEOMETRY</option>';
        str += '<option>POINT</option>';
        str += '<option>LINESTRING</option>';
        str += '<option>POLYGON</option>';
        str += '<option>MULTIPOINT</option>';
        str += '<option>MULTILINESTRING</option>';
        str += '<option>MULTIPOLYGON</option>';
        str += '<option>GEOMETRYCOLLECTION</option>';
        str += '</select>';

        str += '<span><i class="fas fa-key"></i></span>';
        str += '</div>';
        str += '<div class="row">';
        str += '<input type="text" placeholder="column_name" />';
        str += '<select type="text">';
        str += '<option>INT</option>';
        str += '<option>VARCHAR</option>';
        str += '<option>TEXT</option>';
        str += '<option>DATE</option>';
        str += '<option>TINYINT</option>';
        str += '<option>SMALLINT</option>';
        str += '<option>MEDIUMINT</option>';
        str += '<option>BIGINT</option>';
        str += '<option>DECIMAL</option>';
        str += '<option>FLOAT</option>';
        str += '<option>DOUBLE</option>';
        str += '<option>REAL</option>';
        str += '<option>BIT</option>';
        str += '<option>BOOLEAN</option>';
        str += '<option>SERIAL</option>';
        str += '<option>DATETIME</option>';
        str += '<option>TIMESTAMP</option>';
        str += '<option>TIME</option>';
        str += '<option>YEAR</option>';
        str += '<option>CHAR</option>';
        str += '<option>TINYTEXT</option>';
        str += '<option>TEXT</option>';
        str += '<option>MEDIUMTEXT</option>';
        str += '<option>LONGTEXT</option>';
        str += '<option>BINARY</option>';
        str += '<option>VARBINARY</option>';
        str += '<option>TINYBLOB</option>';
        str += '<option>MEDIUMBLOB</option>';
        str += '<option>BLOB</option>';
        str += '<option>ENUM</option>';
        str += '<option>SET</option>';
        str += '<option>GEOMETRY</option>';
        str += '<option>POINT</option>';
        str += '<option>LINESTRING</option>';
        str += '<option>POLYGON</option>';
        str += '<option>MULTIPOINT</option>';
        str += '<option>MULTILINESTRING</option>';
        str += '<option>MULTIPOLYGON</option>';
        str += '<option>GEOMETRYCOLLECTION</option>';
        str += '</select>';
        str += '</div>';
        str += '<hr />';
        str += '<div class="row">';
        str += '<input type="text" id="input-schema" placeholder="Schema" />';
        str += '<input type="text" id="input-sourcefilename" placeholder="Source File Name"/>';
        str += '</div>';
        str += '<hr />';
        str += '</div>';
        str += '<div>';
        str += '<button id="add_tbl_ok">Apply</button>';
        str += '<button class="btn-cancel" style="margin-left: 2%;">Close</button>';
        str += '</div>';
        str += '</div>';

        $("#table_pop").html(str);

        $('.btn-cancel').off('click');
        $('.btn-cancel').on('click');
        $('.btn-cancel').click(function () {
            location.href = "#";
        });

        $("input").off("focus");
        $("input").on("focus");
        $("input").focus(function () {
            $(this).removeClass("alert-input");
        });

        $("#add_tbl_ok").click(function () {
            var table_id = $("#pop_tablename_input").val();

            var flag = 0;
            
            if ($("#pop_tablename_input").val() == "") {
                $("#pop_tablename_input").addClass("alert-input");
                flag = 1;
                return;
            }

            table_id_list[current_selected_provider_id].forEach(function (element) {
                if (element == table_id) {
                    $("#pop_tablename_input").addClass("alert-input");
                    flag = 1;
                    return;
                }
            });

            var first_in = $(this).parent().parent().children('.content').children('.row:nth-child(1)').children('input:nth-child(1)');
            var second_in = $(this).parent().parent().children('.content').children('.row:nth-child(2)').children('input:nth-child(1)');
            var ele_arr = [$(this).parent().parent().children('.content').children('.row:nth-child(1)').children('input:nth-child(1)'), $(this).parent().parent().children('.content').children('.row:nth-child(2)').children('input:nth-child(1)')];

            if (first_in.val() == second_in.val()) {
                first_in.addClass('alert-input');
                second_in.addClass('alert-input');
                flag = 1;
            }

            ele_arr.forEach(function (element) {
                if (element.val() == '') {
                    element.addClass('alert-input');
                    flag = 1;
                }
            });

            if (flag == 1) {
                return;
            }

            var str = '';

            str += '<div class="db_table">';
            str += '<table class="w3-table w3-border" id="' + table_id + '">';
            str += '<tr onclick="display_table_property(' + "'" + table_id + "'" + ')">';
            str += '<th>';
            str += table_id;
            str += '</th>';

            str += '<th>';
            str += '<i class="fas fa-undo-alt" onclick="func_ManageRel(' + "'" + table_id + "'" + ')"></i>';
            str += '<i class="fas fa-trash-alt" onclick="func_removeTbl(' + "'" + table_id + "'" + ')"></i>';
            str += '<i class="fas fa-plus-circle" onclick="func_addColPop(' + "'" + table_id + "'" + ')"></i>';
            str += '<i class="fas fa-key" onclick="func_editPriKey(' + "'" + table_id + "'" + ')"></i>';
            str += '<i class="fas fa-minus-circle" onclick="func_deleteCol(' + "'" + table_id + "'" + ')"></i>';
            str += '</th>';

            str += '<th></th>';
            str += '<th></th>';
            str += '</tr>';

            //insert new id to table_id_list
            table_id_list[current_selected_provider_id].push(table_id);
            table_column_list[current_selected_provider_id][table_id] = new Array();
            //table_column_list[table_id] = {};

            $(this).parent().parent().children('.content').children('.row:nth-child(1)').each(function () {
                str += '<tr class="body-row-primarykey custom-row">';
                str += '<td>';
                str += $(this).children('input').val();
                str += '</td>';
                str += '<td>';
                str += $(this).children('select').val();
                str += '</td>';

                var temp = $("#input-schema").val();
                var temp1 = $("#input-sourcefilename").val();

                var arr = new Object({ "Column Name": $(this).children('input:nth-child(1)').val(), "Data Type": $(this).children('select').val(), "Length": "", "Scale": "", "Nullable": "No", "Default Value": "", "IsIdentify": "No", "IsVersioning": "No", "IsDataStamp": "No", "IsCalculated": "No", "ValidateFor": "", "EnableDate": "2019-01-01", "DisableDate": "2019-01-01", "RenameDate": "2019-01-01", "RenameColumnAs": "", "RenameDWColumnAs": "", "IsIndexed": "No", "Remarks": "", "isPrimary": "Yes", "Schema": temp, "SourceFileName": temp1 });

                //table_column_list[current_selected_provider_id][table_id].push(arr);
                table_column_list[current_selected_provider_id][table_id].push(arr);

                str += '<td>(primary)</td>';
                str += '<td></td>';
                str += '</tr>';
            });

            $(this).parent().parent().children('.content').children('.row:nth-child(2)').each(function () {
                str += '<tr class="body-row custom-row">';
                str += '<td>';
                str += $(this).children('input').val();
                str += '</td>';
                str += '<td>';
                str += $(this).children('select').val();
                str += '</td>';

                var arr = new Object({ "Column Name": $(this).children('input:nth-child(1)').val(), "Data Type": $(this).children('select').val(), "Length": "", "Scale": "", "Nullable": "No", "Default Value": "", "IsIdentify": "No", "IsVersioning": "No", "IsDataStamp": "No", "IsCalculated": "No", "ValidateFor": "", "EnableDate": "2019-01-01", "DisableDate": "2019-01-01", "RenameDate": "2019-01-01", "RenameColumnAs": "", "RenameDWColumnAs": "", "IsIndexed": "No", "Remarks": "", "isPrimary": "No", "Schema": "", "SourceFileName": "" });

                table_column_list[current_selected_provider_id][table_id].push(arr);

                str += '<td></td>';
                str += '<td></td>';
                str += '</tr>';
            });


            str += '</table>';
            str += '</div>';

            $("#mainboard").children('.row').append(str);

            Display_table_name_list();

            $("table#" + table_id).draggable(
            {
                drag: function () {
                    jsPlumb.repaintEverything();
                }
            });

            redraw_all_connection();

            $(".custom-row").off("click");
            $(".custom-row").on("click");
            $(".custom-row").click(function () {
                current_selected_row = $(this);
                $("tr").each(function () {
                    $(this).removeClass("selected-row");
                });
                $(this).addClass("selected-row");
                ~~~~
                display_row_property(this);
            });

            location.href = "#";
        });


        location.href = "#table_pop";
    });

    $(".custom-row").off("click");
    $(".custom-row").on("click");
    $(".custom-row").click(function () {


        current_selected_row = $(this);
        $("tr").each(function () {
            $(this).removeClass("selected-row");
        });
        $(this).addClass("selected-row");

        display_row_property(this);
    });

    $(".popup_add_column").click(function () {
        add_row();
    });

    $("#addOnePop").click(function () {
        var str = "";
        str += '<div class="subrow">';
        str += '<input type="text" placeholder="field_name" />';
        str += '<select type="text">';
        str += '<option>INT</option>';
        str += '<option>VARCHAR</option>';
        str += '<option>TEXT</option>';
        str += '<option>DATE</option>';
        str += '<option>TINYINT</option>';
        str += '<option>SMALLINT</option>';
        str += '<option>MEDIUMINT</option>';
        str += '<option>BIGINT</option>';
        str += '<option>DECIMAL</option>';
        str += '<option>FLOAT</option>';
        str += '<option>DOUBLE</option>';
        str += '<option>REAL</option>';
        str += '<option>BIT</option>';
        str += '<option>BOOLEAN</option>';
        str += '<option>SERIAL</option>';
        str += '<option>DATETIME</option>';
        str += '<option>TIMESTAMP</option>';
        str += '<option>TIME</option>';
        str += '<option>YEAR</option>';
        str += '<option>CHAR</option>';
        str += '<option>TINYTEXT</option>';
        str += '<option>TEXT</option>';
        str += '<option>MEDIUMTEXT</option>';
        str += '<option>LONGTEXT</option>';
        str += '<option>BINARY</option>';
        str += '<option>VARBINARY</option>';
        str += '<option>TINYBLOB</option>';
        str += '<option>MEDIUMBLOB</option>';
        str += '<option>BLOB</option>';
        str += '<option>ENUM</option>';
        str += '<option>SET</option>';
        str += '<option>GEOMETRY</option>';
        str += '<option>POINT</option>';
        str += '<option>LINESTRING</option>';
        str += '<option>POLYGON</option>';
        str += '<option>MULTIPOINT</option>';
        str += '<option>MULTILINESTRING</option>';
        str += '<option>MULTIPOLYGON</option>';
        str += '<option>GEOMETRYCOLLECTION</option>';
        str += '</select>';
        str += '<i class="fas fa-trash-alt colDelCls"></i>';
        str += '</div>';

        $("#mainrow").append(str);

        $("input").focus(function () {
            $(this).removeClass("alert-input");
        });

        $(".colDelCls").click(function () {
            var len = $(".colDelCls").length;
            if (len != 1) {
                $(this).parent().remove();
            }
        });

        //$(ss + ":nth-child(1)").append(str);
    });

    $("#add_col_ok").click(function () {
        var flag = 0;

        $("#mainrow").children('.subrow').each(function () {
            $(this).children('input:nth-child(1)').each(function () {
                var cur_input = $(this);

                for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
                    if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"] == $(this).val() || $(this).val() == "") {
                        cur_input.addClass("alert-input");
                        flag = 1;
                    }
                }
            });
        });

        if (flag == 1) {
            return;
        }

        var str = '';
        $("#mainrow").children('.subrow').each(function () {
            var arr = new Object({ "Column Name": $(this).children('input:nth-child(1)').val(), "Data Type": $(this).children('select').val(), "Length": "", "Scale": "", "Nullable": "No", "Default Value": "", "IsIdentify": "No", "IsVersioning": "No", "IsDataStamp": "No", "IsCalculated": "No", "ValidateFor": "", "EnableDate": "2019-01-01", "DisableDate": "2019-01-01", "RenameDate": "2019-01-01", "RenameColumnAs": "", "RenameDWColumnAs": "", "IsIndexed": "No", "Remarks": "", "isPrimary": "No", "Schema": "", "SourceFileName": "" });

            table_column_list[current_selected_provider_id][current_selected_table_id].push(arr);

            str += '<tr class="body-row custom-row">';
            str += '<td>';
            str += $(this).children('input').val();
            str += '</td>';
            str += '<td>';
            str += $(this).children('select').val();
            str += '</td>';
            str += '<td>';
            str += '</td>';
            str += '<td>';
            str += '</td>';
            str += '</tr>';
        });

        $("#" + current_selected_table_id).children("tbody").append(str);

        $(".custom-row").off("click");
        $(".custom-row").on("click");

        $(".custom-row").click(function () {

            current_selected_row = $(this);
            $("tr").each(function () {
                $(this).removeClass("selected-row");
            });
            $(this).addClass("selected-row");

            display_row_property(this);
        });

        location.href = "#";

    });
});

function add_row() {
    var str = "";
    str += '<div class="row">';
    str += '<input type="text" placeholder="field_name" />';
    str += '<select type="text">';
    str += '<option>INT</option>';
    str += '<option>VARCHAR</option>';
    str += '<option>TEXT</option>';
    str += '<option>DATE</option>';
    str += '<option>TINYINT</option>';
    str += '<option>SMALLINT</option>';
    str += '<option>MEDIUMINT</option>';
    str += '<option>BIGINT</option>';
    str += '<option>DECIMAL</option>';
    str += '<option>FLOAT</option>';
    str += '<option>DOUBLE</option>';
    str += '<option>REAL</option>';
    str += '<option>BIT</option>';
    str += '<option>BOOLEAN</option>';
    str += '<option>SERIAL</option>';
    str += '<option>DATETIME</option>';
    str += '<option>TIMESTAMP</option>';
    str += '<option>TIME</option>';
    str += '<option>YEAR</option>';
    str += '<option>CHAR</option>';
    str += '<option>TINYTEXT</option>';
    str += '<option>TEXT</option>';
    str += '<option>MEDIUMTEXT</option>';
    str += '<option>LONGTEXT</option>';
    str += '<option>BINARY</option>';
    str += '<option>VARBINARY</option>';
    str += '<option>TINYBLOB</option>';
    str += '<option>MEDIUMBLOB</option>';
    str += '<option>BLOB</option>';
    str += '<option>ENUM</option>';
    str += '<option>SET</option>';
    str += '<option>GEOMETRY</option>';
    str += '<option>POINT</option>';
    str += '<option>LINESTRING</option>';
    str += '<option>POLYGON</option>';
    str += '<option>MULTIPOINT</option>';
    str += '<option>MULTILINESTRING</option>';
    str += '<option>MULTIPOLYGON</option>';
    str += '<option>GEOMETRYCOLLECTION</option>';
    str += '</select>';
    str += '<span>Not Null</span>';
    str += '<span class="popup_add_column"><i class="fas fa-plus"></i></span>';
    str += '</div>';
    str += '<hr/>';

    $("#table_pop").children('.popup').children('.content').append(str);

    $(".popup_add_column").click(function () {
        add_row();
    });
}

function display_table_property(param) {

    current_selected_table_id = param;

    var str = '';
    str += '<div class="list-group-item list-group-item-action bg-light">';
    str += '<span class="heading left-span">Table(' + current_selected_table_id + ') properties</span>';
    str += '<div id="info-span">';

    $("#" + current_selected_table_id).children('tbody').children('.body-row-primarykey').each(function () {
        str += '<div class="row">';

        $(this).children('td').each(function () {
            str += '<span class="span">' + $(this).html() + '</span>';
        });
        str += '</div>';
    });

    $("#" + current_selected_table_id).children('tbody').children('.body-row').each(function () {
        str += '<div class="row">';

        $(this).children('td').each(function () {
            str += '<span class="span">' + $(this).html() + '</span>';
        });

        str += '<span class="span">Not Null</span>';
        str += '</div>';
    });
    str += '</div>';
    str += '</div>';

    //$("#right-section").html(str);

    jsPlumb.repaintEverything();
}


function display_row_property(param) {
    current_selected_table_id = $(param).parent().parent().attr('id');
    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if ($(param).children("td:nth-child(1)").html() == table_column_list[current_selected_provider_id][current_selected_table_id][i]['Column Name']) {
            current_sel_row_num = i;
        }
    }

    var t = table_column_list[current_selected_provider_id][current_selected_table_id][current_sel_row_num];

    var str = '';
    str += '<div class="row" id="ColumnName">';
    str += '<span class="col-md-5">Column Name</span>';
    str += '<input class="col-md-5" type="text" value="' + t['Column Name'] + '" />';
    str += '</div>';
    str += '<div class="row" id="DataType">';
    str += '<span class="col-md-5">Data Type</span>';
    str += '<select type="text" class="col-md-5">';
    str += '<option>INT</option>';
    str += '<option>VARCHAR</option>';
    str += '<option>TEXT</option>';
    str += '<option>DATE</option>';
    str += '<option>TINYINT</option>';
    str += '<option>SMALLINT</option>';
    str += '<option>MEDIUMINT</option>';
    str += '<option>BIGINT</option>';
    str += '<option>DECIMAL</option>';
    str += '<option>FLOAT</option>';
    str += '<option>DOUBLE</option>';
    str += '<option>REAL</option>';
    str += '<option>BIT</option>';
    str += '<option>BOOLEAN</option>';
    str += '<option>SERIAL</option>';
    str += '<option>DATETIME</option>';
    str += '<option>TIMESTAMP</option>';
    str += '<option>TIME</option>';
    str += '<option>YEAR</option>';
    str += '<option>CHAR</option>';
    str += '<option>TINYTEXT</option>';
    str += '<option>TEXT</option>';
    str += '<option>MEDIUMTEXT</option>';
    str += '<option>LONGTEXT</option>';
    str += '<option>BINARY</option>';
    str += '<option>VARBINARY</option>';
    str += '<option>TINYBLOB</option>';
    str += '<option>MEDIUMBLOB</option>';
    str += '<option>BLOB</option>';
    str += '<option>ENUM</option>';
    str += '<option>SET</option>';
    str += '<option>GEOMETRY</option>';
    str += '<option>POINT</option>';
    str += '<option>LINESTRING</option>';
    str += '<option>POLYGON</option>';
    str += '<option>MULTIPOINT</option>';
    str += '<option>MULTILINESTRING</option>';
    str += '<option>MULTIPOLYGON</option>';
    str += '<option>GEOMETRYCOLLECTION</option>';
    str += '</select>';
    str += '</div>';
    str += '<div class="row" id="Length">';
    str += '<span class="col-md-5">Length</span>';
    str += '<input type="number" class="col-md-5" value="' + t['Length'] + '"  />';
    str += '</div>';
    str += '<div class="row" id="Scale">';
    str += '<span class="col-md-5">Scale</span>';
    str += '<input type="text" class="col-md-5" value="' + t['Scale'] + '" />';
    str += '</div>';
    str += '<div class="row" id="Nullable">';
    str += '<span class="col-md-5">Nullable</span>';
    if (t['Nullable'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="DefaultValue">';
    str += '<span class="col-md-5">Default Value</span>';
    str += '<input class="col-md-5" type="text" value="' + t["Default Value"] + '" />';
    str += '</div>';
    str += '<div class="row" id="IsIdentity">';
    str += '<span class="col-md-5">IsIdentity</span>';
    if (t['IsIdentify'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="IsVersioning">';
    str += '<span class="col-md-5">IsVersioning</span>';
    if (t['IsVersioning'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="IsDataStamp">';
    str += '<span class="col-md-5">IsDataStamp</span>';
    if (t['IsDataStamp'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="IsCalculated">';
    str += '<span class="col-md-5">IsCalculated</span>';
    if (t['IsCalculated'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="ValidateFor">';
    str += '<span class="col-md-5">ValidateFor</span>';
    str += '<input class="col-md-5" type="text" value="' + t['ValidateFor'] + '" />';
    str += '</div>';
    str += '<div class="row" id="EnableDate">';
    str += '<span class="col-md-5">EnableDate</span>';
    str += '<input class="col-md-5" type="date" value="' + t['EnableDate'] + '" />';
    str += '</div>';
    str += '<div class="row" id="DisableDate">';
    str += '<span class="col-md-5">DisableDate</span>';
    str += '<input class="col-md-5" type="date" value="' + t['DisableDate'] + '" />';
    str += '</div>';
    str += '<div class="row" id="RenameDate">';
    str += '<span class="col-md-5">RenameDate</span>';
    str += '<input class="col-md-5" type="date" value="' + t['RenameDate'] + '" />';
    str += '</div>';
    str += '<div class="row" id="RenameColumnAs">';
    str += '<span class="col-md-5">RenameColumnAs</span>';
    str += '<input class="col-md-5" type="text" value="' + t['RenameColumnAs'] + '" />';
    str += '</div>';
    str += '<div class="row" id="RenameDWColumnAs">';
    str += '<span class="col-md-5">RenameDWColumnAs</span>';
    str += '<input class="col-md-5" type="text" value="' + t['RenameDWColumnAs'] + '" />';
    str += '</div>';
    str += '<div class="row" id="Indexed">';
    str += '<span class="col-md-5">Indexed</span>';
    if (t['IsIndexed'] == "No") {
        str += '<input class="col-md-1" type="checkbox" />';
    }
    else {
        str += '<input class="col-md-1" type="checkbox" checked />';
    }
    str += '</div>';
    str += '<div class="row" id="Remarks">';
    str += '<span class="col-md-5">Remarks</span>';
    str += '<input class="col-md-5" type="text" value="' + t['Remarks'] + '" />';
    str += '</div>';

    str += '<hr />';
    //$("#right-section").html(str);
    $("#main_row").html(str);

    location.href = "#row_pop_up";

    $(".custom-row").off("click");
    $(".custom-row").on("click");

    $(".custom-row").click(function () {

        current_selected_row = $(this);
        $("tr").each(function () {
            $(this).removeClass("selected-row");
        });
        $(this).addClass("selected-row");

        display_row_property(this);
    });

    $("#btn-change-val").click(function () {
        var t1 = ($("div#Nullable").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t2 = ($("div#IsIdentity").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t3 = ($("div#IsVersioning").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t4 = ($("div#IsDataStamp").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t5 = ($("div#IsCalculated").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t6 = ($("div#Indexed").children('input:checked').val() == "on") ? 'Yes' : 'No';
        var t7 = t['isPrimary'];

        var obj = new Object({ "Column Name": $("div#ColumnName").children('input').val(), "Data Type": $("div#DataType").children('select').val(), "Length": $("div#Length").children('input').val(), "Scale": $("div#Scale").children('input').val(), "Nullable": t1, "Default Value": $("div#DefaultValue").children('input').val(), "IsIdentify": t2, "IsVersioning": t3, "IsDataStamp": t4, "IsCalculated": t5, "ValidateFor": $("div#ValidateFor").children('input').val(), "EnableDate": $("div#EnableDate").children('input').val(), "DisableDate": $("div#DisableDate").children('input').val(), "RenameDate": $("div#RenameDate").children('input').val(), "RenameColumnAs": $("div#RenameColumnAs").children('input').val(), "RenameDWColumnAs": $("div#RenameDWColumnAs").children('input').val(), "IsIndexed": t6, "Remarks": $("div#Remarks").children('input').val(), "isPrimary": t7 });

        table_column_list[current_selected_provider_id][current_selected_table_id][current_sel_row_num] = obj;

        redraw_table();
        redraw_all_connection();

        location.href = "#";
    });


    $(".btn-cancel").off("click");
    $(".btn-cancel").on("click");
    $('.btn-cancel').click(function () {
        location.href = "#";
    });
}



function func_addCol(param) {
    current_selected_table_id = param;

}


function func_addColPop(param) {
    var str = "";
    str += '<div class="subrow">';
    str += '<input type="text" placeholder="field_name" />';
    str += '<select type="text">';
    str += '<option>INT</option>';
    str += '<option>VARCHAR</option>';
    str += '<option>TEXT</option>';
    str += '<option>DATE</option>';
    str += '<option>TINYINT</option>';
    str += '<option>SMALLINT</option>';
    str += '<option>MEDIUMINT</option>';
    str += '<option>BIGINT</option>';
    str += '<option>DECIMAL</option>';
    str += '<option>FLOAT</option>';
    str += '<option>DOUBLE</option>';
    str += '<option>REAL</option>';
    str += '<option>BIT</option>';
    str += '<option>BOOLEAN</option>';
    str += '<option>SERIAL</option>';
    str += '<option>DATETIME</option>';
    str += '<option>TIMESTAMP</option>';
    str += '<option>TIME</option>';
    str += '<option>YEAR</option>';
    str += '<option>CHAR</option>';
    str += '<option>TINYTEXT</option>';
    str += '<option>TEXT</option>';
    str += '<option>MEDIUMTEXT</option>';
    str += '<option>LONGTEXT</option>';
    str += '<option>BINARY</option>';
    str += '<option>VARBINARY</option>';
    str += '<option>TINYBLOB</option>';
    str += '<option>MEDIUMBLOB</option>';
    str += '<option>BLOB</option>';
    str += '<option>ENUM</option>';
    str += '<option>SET</option>';
    str += '<option>GEOMETRY</option>';
    str += '<option>POINT</option>';
    str += '<option>LINESTRING</option>';
    str += '<option>POLYGON</option>';
    str += '<option>MULTIPOINT</option>';
    str += '<option>MULTILINESTRING</option>';
    str += '<option>MULTIPOLYGON</option>';
    str += '<option>GEOMETRYCOLLECTION</option>';
    str += '</select>';
    str += '<i class="fas fa-trash-alt colDelCls"></i>';
    str += '</div>';
    $("#mainrow").html(str);

    $("input").focus(function () {
        $(this).removeClass("alert-input");
    });
    current_selected_table_id = param;

    location.href = "#column_pop";
}

function func_deleteCol(param) {
    current_selected_table_id = param;
    //if (table_column_list[current_selected_diagram_id][current_selected_table_id].length == 1)
    //    return;

    if (current_selected_row != "") {
        current_selected_row.remove();

        for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
            if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"] == current_selected_row.children("td:nth-child(1)").html()) {
                if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] == 'Yes' || table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] == 'No')
                    table_column_list[current_selected_provider_id][current_selected_table_id].splice(i, 1);
                else
                    //alert('Something went wrong!\nYou must remove the relation of this column!!!');
                    console.log('Something went wrong!\nYou must remove the relation of this column!!!');
            }
        }
    }
}

function func_ManageRel(param) {
    current_selected_table_id = param;
    var table_list_with_this = [];

    if (table_id_list[current_selected_provider_id].length <= 1) {
        alert('No enough Tables to make Relation!');
        return;
    }

    var str = '';

    str += '<table class="w3-table w3-border">';
    str += '<tr class="body-row">';
    str += '<th>' + current_selected_table_id + '</th>';
    str += '<th></th>';
    str += '<th></th>';
    str += '<th></th>';
    str += '<th></th>';
    str += '</tr>';

    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != "Yes" && table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != "No") {
            str += '<tr class="body-row">';
            var temp;
            temp = table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"].split(".");
            str += '<td>' + table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"] + '</td>';
            str += '<td>' + temp[0] + '</td>';
            str += '<td>' + temp[1] + '</td>';
            str += '<td><i class="fas fa-pencil-alt editRelCol"></i></td>';
            str += '<td><i class="fas fa-trash-alt delRelCol"></i></td>';
            str += '</tr>';
        }
    }

    str += '</table>';
    jQuery("#rel_tbl").html(str);

    $(".delRelCol").off('click');
    $(".delRelCol").on('click');
    $(".delRelCol").click(function () {
        $(this).parent().parent().remove();
        for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
            if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"] == $(this).parent().parent().children("td:nth-child(1)").html()) {
                table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] = "No";
                redraw_all_connection();
                return;
            }
        }
    });

    $("#edit_RelOk").off('click');
    $("#edit_RelOk").on('click');
    $("#edit_RelOk").click(function () {
        var source = $(this).parent().parent().children(".content").children(".row").children('span').html();
        var target = $("#select_edit_rel").val();

        for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
            if (source == table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"]) {
                var temp;
                temp = table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"].split("/");
                var temp1;
                temp1 = target.split('.');
                if (temp[0] == temp1[0] && temp[1] == temp1[1]) {
                    //alert("This relation is already exist!\nPlease select another option!!!");
                    console.log("This relation is already exist!\nPlease select another option!!!");
                    return;
                }
                else {
                    table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] = temp1[0] + '/' + temp1[1];
                    location.href = "#";
                }
            }
        }
    });

    $(".editRelCol").click(function () {
        var temp = $(this).parent().parent().children("td:nth-child(1)").html();
        var str1 = "";
        str1 += '<div class="row">';
        str1 += '<span>' + temp + '</span>';
        str1 += '<select id="select_edit_rel">';

        for (i = 0; i < table_id_list[current_selected_provider_id].length; i++) {
            if (current_selected_table_id != table_id_list[current_selected_provider_id][i]) {
                for (var j = 0; j < table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]].length; j++) {
                    if (table_column_list[current_selected_provider_id][current_selected_table_id][j]['isPrimary'] == 'Yes') {
                        str1 += '<option>' + table_id_list[current_selected_provider_id][i] + '.' + table_column_list[current_selected_provider_id][current_selected_table_id][j]["Column Name"] + '</option>';
                    }
                }
            }
        }

        str1 += '</select>';
        str1 += '</div>';
        str1 += '<hr />';

        $("#edit_rel_panel").html(str1);

        location.href = "#editRel_popup";
    });

    str = "";
    str += '<div>';
    str += '<span>Keys of this table</span>';
    str += '<select id="select_source_id">';
    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != 'Yes') {
            str += '<option>' + table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"] + '</option>';
        }
    }
    str += '</select>';
    str += '</div>';
    str += '<div>';
    str += '<span>Source table</span>';
    str += '<select id="select_target_id">';
    for (i = 0; i < table_id_list[current_selected_provider_id].length; i++) {
        if (current_selected_table_id != table_id_list[current_selected_provider_id][i]) {
            for (var j = 0; j < table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]].length; j++) {
                if (table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]['isPrimary'] == 'Yes') {
                    str += '<option>' + table_id_list[current_selected_provider_id][i] + '.' + table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["Column Name"] + '</option>';
                }
            }
        }
    }
    str += '</select>';

    $("#NewRel_pop").html(str);

    location.href = "#ManRel_pop";

    //$("#add_newRel").click(function () {
    //    $("#add_new_rel_ok").click(function () {
    //        var source_id = current_selected_table_id;
    //        var target_id = $("#select_target_id option:selected").val();

    //        jsPlumb.importDefaults({
    //            ConnectionsDetachable: false
    //        });

    //        jsPlumb.connect({
    //            source: source_id,
    //            target: target_id,
    //            connector: ["Flowchart", { stub: "10", gap: "10" }],
    //            anchors: ["Continuous"],
    //            endpoint: "Rectangle",
    //            endpointStyle: { fillStyle: "balck" }
    //        });
    //    });

    //    location.href = "#NewRel_pop";
    //});

}

function func_removeTbl(param) {
    current_selected_table_id = param;
    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != 'Yes' && table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != 'No') {
            //alert("This table has some foreign key(s)!\nPlease delete relations to remove this table!!!");
            return;
        }
    }

    $("#" + param).remove();
    table_id_list[current_selected_provider_id].pop(param);
    alert(table_id_list);
    delete table_column_list[current_selected_provider_id][param];

    Display_table_name_list();

    redraw_all_connection();
}


//Primary Key Settings
function func_editPriKey(param) {
    current_selected_table_id = param;

    var str = "";
    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (table_column_list[current_selected_provider_id][current_selected_table_id][i]['isPrimary'] == 'Yes') {
            str += '<tr class="body-row">';
            str += '<td>' + table_column_list[current_selected_provider_id][current_selected_table_id][i]['Column Name'] + '</td>';
            str += '<td>' + table_column_list[current_selected_provider_id][current_selected_table_id][i]['Data Type'] + '</td>';
            str += '<td><span class="fas fa-trash-alt colDelPri"></span></td>';
            str += '</tr>';
        }
    }
    $("#pri_settings_tbl").children("tbody").html(str);

    $(".colDelPri").off('click');
    $(".colDelPri").on('click');
    $(".colDelPri").click(function () {
        $(this).parent().parent().remove();
        for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
            if (table_column_list[current_selected_provider_id][current_selected_table_id][i]['Column Name'] == $(this).parent().parent().children("td:nth-child(1)").html()) {
                table_column_list[current_selected_provider_id][current_selected_table_id].splice(i, 1);
                flag = 1;
            }
        }
    });

    location.href = "#pop_primaryKeySettings";

    $("#btn_priAddColOk").click(function () {
        $("input").focus(function () {
            $(this).removeClass("alert-input");
        });

        var flag = 0;

        if ($("#primary_value").val() == "") {
            $("#primary_value").addClass("alert-input");
            flag = 1;
        }

        if ($("#primary_type").val() == "") {
            $("#primary_type").addClass("alert-input");
            flag = 1;
        }


        for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
            if (table_column_list[current_selected_provider_id][current_selected_table_id][i]['Column Name'] == $("#primary_value").val()) {
                $("#primary_value").addClass("alert-input");
                flag = 1;
            }
        }

        $("#pri_settings_tbl").children("tbody").children("tr").each(function () {
            if ($(this).children("td:nth-child(1)").html() == $("#primary_value").val()) {
                $("#primary_value").addClass("alert-input");
                flag = 1;
                return;
            }
        });

        if (flag == 1)
            return;

        var str = '';
        str += '<tr class="body-row">';
        str += '<td>' + $("#primary_value").val() + '</td>';
        str += '<td>' + $("#primary_type").val() + '</td>';
        str += '<td><span class="fas fa-trash-alt colDelPri"></span></td>';
        str += '</tr>';

        $("#pri_settings_tbl").children("tbody").append(str);

        var arr = new Object({ "Column Name": $("#primary_value").val(), "Data Type": $("#primary_type").val(), "Length": "", "Scale": "", "Nullable": "No", "Default Value": "", "IsIdentify": "No", "IsVersioning": "No", "IsDataStamp": "No", "IsCalculated": "No", "ValidateFor": "", "EnableDate": "2019-01-01", "DisableDate": "2019-01-01", "RenameDate": "2019-01-01", "RenameColumnAs": "", "RenameDWColumnAs": "", "IsIndexed": "No", "Remarks": "", "isPrimary": "Yes", "Schema": "", "SourceFileName": "" });

        table_column_list[current_selected_provider_id][current_selected_table_id].push(arr);
        //$("#primary_value").removeClass("alert-input");
        //$("#primary_type").removeClass("alert-input");

        $(".colDelPri").off('click');
        $(".colDelPri").on('click');
        $(".colDelPri").click(function () {
            $(this).parent().parent().remove();
            for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
                if (table_column_list[current_selected_provider_id][current_selected_table_id][i]['Column Name'] == $(this).parent().parent().children("td:nth-child(1)").html()) {
                    table_column_list[current_selected_provider_id][current_selected_table_id].splice(i, 1);
                    flag = 1;
                }
            }
        });
    });

    $("#btn_priSettingOk").click(function () {
        redraw_table();
        redraw_all_connection();

        location.href = "#";
    });
}

function redraw_table() {
    var str = '';
    str += '<tr>';
    str += '<th>';
    str += current_selected_table_id;
    str += '</th>';

    str += '<th>';
    str += '<i class="fas fa-undo-alt" onclick="func_ManageRel(' + "'" + current_selected_table_id + "'" + ')"></i>';
    str += '<i class="fas fa-trash-alt" onclick="func_removeTbl(' + "'" + current_selected_table_id + "'" + ')"></i>';
    str += '<i class="fas fa-plus-circle" onclick="func_addColPop(' + "'" + current_selected_table_id + "'" + ')"></i>';
    str += '<i class="fas fa-key" onclick="func_editPriKey(' + "'" + current_selected_table_id + "'" + ')"></i>';
    str += '<i class="fas fa-minus-circle" onclick="func_deleteCol(' + "'" + current_selected_table_id + "'" + ')"></i>';
    str += '</th>';

    str += '<th></th>';
    str += '</tr>';

    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] == "Yes") {
            str += '<tr class="body-row-primarykey custom-row">';
            str += '<td>';
            str += table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"];
            str += '</td>';
            str += '<td>';
            str += table_column_list[current_selected_provider_id][current_selected_table_id][i]["Data Type"];
            str += '</td>';
            str += '<td>(primary)</td>';
            str += '</tr>';
        }
        else {
            str += '<tr class="body-row custom-row">';
            str += '<td>';
            str += table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"];
            str += '</td>';
            str += '<td>';
            str += table_column_list[current_selected_provider_id][current_selected_table_id][i]["Data Type"];
            str += '</td>';
            str += '<td></td>';
            str += '</tr>';
        }
    }

    $("#" + current_selected_table_id).html(str);

    $(".custom-row").off("click");
    $(".custom-row").on("click");
    $(".custom-row").click(function () {


        current_selected_row = $(this);
        $("tr").each(function () {
            $(this).removeClass("selected-row");
        });
        $(this).addClass("selected-row");

        display_row_property(this);
    });
}

$("#add_newRel").click(function () {
    var source = $("#select_source_id").val();
    var target = $("#select_target_id").val();

    for (var i = 0; i < table_column_list[current_selected_provider_id][current_selected_table_id].length; i++) {
        if (source == table_column_list[current_selected_provider_id][current_selected_table_id][i]["Column Name"]) {
            var temp;
            temp = table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"].split("/");
            var temp1;
            temp1 = target.split('.');
            if (temp[0] == temp1[0] && temp[1] == temp1[1]) {
                //alert("This relation is already exist!!!");
                console.log("This relation is already exist!!!");
                return;
            }
            else if (table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] != 'Yes' && table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] !== 'No') {
                //alert("This column has already relation!\nPlease edit that relation!!!");
                console.log("This column has already relation!\nPlease edit that relation!!!");
                return;
            }
            else {
                table_column_list[current_selected_provider_id][current_selected_table_id][i]["isPrimary"] = temp1[0] + '.' + temp1[1];
                location.href = "#";

                jsPlumb.connect({
                    source: current_selected_table_id,
                    target: temp1[0],
                    connector: ["Flowchart", { stub: "10", gap: "10" }],
                    anchors: ["Continuous"],
                    endpoint: "Rectangle",
                    endpointStyle: { fillStyle: "balck" }
                });
            }
        }
    }
});

function redraw_all_connection() {

    jsPlumb.deleteEveryConnection();
    jsPlumb.deleteEveryEndpoint();

    table_id_list[current_selected_provider_id].forEach(function (element) {

        var cur_table_id = element;

        for (var i = 0; i < table_column_list[current_selected_provider_id][element].length; i++) {

            if (table_column_list[current_selected_provider_id][element][i]["isPrimary"] != "Yes" && table_column_list[current_selected_provider_id][element][i]["isPrimary"] != "No") {
                var temp = table_column_list[current_selected_provider_id][element][i]["isPrimary"].split(".");
                
                jsPlumb.connect({
                    source: element,
                    target: temp[0],
                    connector: ["Flowchart", { stub: "10", gap: "10" }],
                    anchors: ["Continuous"],
                    endpoint: "Rectangle",
                    endpointStyle: { fillStyle: "balck" }
                });
            }
        }

        for (i = 0; i < table_id_list[current_selected_provider_id].length; i++) {
            $("table#" + table_id_list[current_selected_provider_id][i]).draggable(
            {
                drag: function () {
                    jsPlumb.repaintEverything();
                },
                containment: $(this).parent().parent().parent()
            });
        }
    });

}

function Display_table_name_list() {
    var str = '';
    str += '<span class="heading row">Table Names</span>';
    if (table_id_list[current_selected_provider_id].length == 0) {
        str += '<span class="row">No Tables!!!</span>';
    }
    else{
        for (var i = 0; i < table_id_list[current_selected_provider_id].length; i++) {
            str += '<span class="row">' + table_id_list[current_selected_provider_id][i] + '</span>';
        }
    }
    
    $('#table-names').html(str);
}

function New_Provider() {
    location.href = "#new_provider_pop";
}

$("#add_new_provider_ok").click(function () {
    var flag = 0;

    if ($("#new_provider_name").val() == "") {
        $("#new_provider_name").addClass("alert-input");
        flag = 1;
    }

    for (var i = 0; i < provider_list.length; i++) {
        if ($("#new_provider_name").val() == provider_list[i]) {
            $("#new_provider_name").addClass("alert-input");
            flag = 1;
        }
    }

    if (flag == 1)
        return;

    provider_list.push($("#new_provider_name").val());

    var arr = new Object();

    table_column_list[$("#new_provider_name").val()] = arr;

    table_id_list[$("#new_provider_name").val()] = new Array();

    var str = '';
    str += '<option>' + $("#new_provider_name").val() + '</option>';
    $("#provider_select").append(str);

    location.href = "#";
});

function redraw_all_table() {
    $("#mainboard").children('.row').html('');

    var str = '';

    for (var i = 0; i < table_id_list[current_selected_provider_id].length; i++) {
        str += '<div';
        str += ' class="db_table">';

        str += '<table class="w3-table w3-border" id="' + table_id_list[current_selected_provider_id][i] + '">';
        str += '<tr onclick="display_table_property(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')">';
        str += '<th>';
        str += table_id_list[current_selected_provider_id][i];
        str += '</th>';

        str += '<th>';
        str += '<i class="fas fa-undo-alt" onclick="func_ManageRel(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')"></i>';
        str += '<i class="fas fa-trash-alt" onclick="func_removeTbl(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')"></i>';
        str += '<i class="fas fa-plus-circle" onclick="func_addColPop(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')"></i>';
        str += '<i class="fas fa-key" onclick="func_editPriKey(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')"></i>';
        str += '<i class="fas fa-minus-circle" onclick="func_deleteCol(' + "'" + table_id_list[current_selected_provider_id][i] + "'" + ')"></i>';
        str += '</th>';

        str += '<th></th>';
        str += '</tr>';

        //console.log(table_id_list[current_selected_provider_id][i]);

        for (var j = 0; j < table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]].length; j++) {
            if (table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["isPrimary"] == "Yes") {
                str += '<tr class="body-row-primarykey custom-row">';
                str += '<td>';
                str += table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["Column Name"];
                str += '</td>';
                str += '<td>';
                str += table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["Data Type"];
                str += '</td>';
                str += '<td>(primary)</td>';
                str += '</tr>';
            }
            else {
                str += '<tr class="body-row custom-row">';
                str += '<td>';
                str += table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["Column Name"];
                str += '</td>';
                str += '<td>';
                str += table_column_list[current_selected_provider_id][table_id_list[current_selected_provider_id][i]][j]["Data Type"];
                str += '</td>';
                str += '<td></td>';
                str += '</tr>';
            }
        }

        str += '</table>';
        str += '</div>';
    }
    $('#mainboard').children(".row").html(str);

    $(".custom-row").off("click");
    $(".custom-row").on("click");
    $(".custom-row").click(function () {
        current_selected_row = $(this);
        $("tr").each(function () {
            $(this).removeClass("selected-row");
        });
        $(this).addClass("selected-row");
        display_row_property(this);
    });
}

function New_Diagram() {
    var str = '';

    table_id_list[current_selected_provider_id] = new Array();
    table_column_list[current_selected_provider_id] = new Object();

    redraw_all_table();
    jsPlumb.deleteEveryConnection();
    jsPlumb.deleteEveryEndpoint();

    Display_table_name_list();
}

function Export_Diagram() {  
    var export_arr = [];
    /*table_id_list[current_selected_provider_id].forEach(function (element) {
        for (var i = 0; i < table_column_list[current_selected_provider_id][element].length; i++) {
            var tempkey = table_column_list[current_selected_provider_id][element][i]["isPrimary"];
            var foregingkey = (tempkey == 'Yes' || tempkey == 'No') ? "" : (tempkey.split("/"))[1];

            var t = table_column_list[current_selected_provider_id][element][i];
            export_arr.push(new Object({"Provider": current_selected_provider_id, "SourceFile": t["SourceFileName"], "TargetTable": element, "TargetColumn": t["Column Name"], "DataType": t["Data Type"], "Length": t["Length"], "Scale": t["Scale"], "IsNullable": t["Nullable"], "Default": t["Default Value"], "IsIdentity": t["Scale"], "IsVersioning": t["IsVersioning"], "IsCalculated": t["IsCalculated"], "ValidateFor": t["ValidateFor"], "EnableDate": t["EnableDate"], "DisableDate": t["DisableDate"], "RenameDate": t["RenameDate"], "RenameColumnAs": t["RenameColumnAs"], "RenameDWColumnAs": t["RenameDWColumnAs"], "PKColumnRank": t["Scale"], "ClusteredIndexRank": t["IsIndexed"], "ForeignKey": foregingkey, "SurrogateFKName": "", "IsIndexed": t["Scale"], "Remarks": t["Remarks"]}));
        }
    });*/
    for (var property in table_column_list) {
        for (var property1 in table_column_list[property]) {
            for (var i = 0; i < table_column_list[property][property1].length; i++) {
                var isPrimary = table_column_list[property][property1][i]["isPrimary"] == 'Yes' ? 'Yes' : 'No';
                var foregingkey = (table_column_list[property][property1][i]["isPrimary"] == 'Yes' || table_column_list[property][property1][i]["isPrimary"] == 'No') ? '' : table_column_list[property][property1][i]["isPrimary"];
                var t = table_column_list[property][property1][i];
                var t1 = table_column_list[property][property1][0];

                export_arr.push(new Object({ "Provider": property, "SourceFile": t1["SourceFileName"], "TargetTable": "dbo." + property1, "TargetColumn": property1 + "." + t["Column Name"], "DataType": t["Data Type"], "Length": t["Length"], "Scale": t["Scale"], "IsNullable": t["Nullable"], "Default": t["Default Value"], "IsIdentity": t["Scale"], "IsVersioning": t["IsVersioning"], "IsCalculated": t["IsCalculated"], "ValidateFor": t["ValidateFor"], "EnableDate": t["EnableDate"], "DisableDate": t["DisableDate"], "RenameDate": t["RenameDate"], "RenameColumnAs": t["RenameColumnAs"], "IsDataStamp" : t["IsDataStamp"], "RenameDWColumnAs": t["RenameDWColumnAs"], "PKColumnRank": t["Scale"], "ClusteredIndexRank": t["IsIndexed"], "isPrimary":isPrimary, "ForeignKey": foregingkey, "SurrogateFKName": "", "IsIndexed": t["Scale"], "Remarks": t["Remarks"], "Schema": t1["Schema"] }));
            }
        }
    }

    columnDelimiter = ',';
    lineDelimiter = '\n';

    keys = Object.keys(export_arr[0]);

    var result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    export_arr.forEach(function (item) {
        ctr = 0;
        keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    var data, filename, link;

    var csv = result;
    if (csv == null) return;

    filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

function Import_Diagram() {
    var str = '';
    str +='<div class="popup">';
    str +='<h2>Load Your Previous Works</h2>';
    str +='<button class="close btn-cancel">&times;</button>';
    str +='<hr />';

    str +='<div class="content">';
    str +='<div class="row">';
    str +='<div class="subrow">';
    str += '<input type="file" id="csv" multiple accept=".csv">';
    str +='</div>';
    str +='</div>';
    str +='<hr />';
    str +='</div>';

    str +='<div>';
    str +='<button id="btn_load_ok" disabled>Load</button>';
    str +='<button class="btn-cancel">Cancel</button>';
    str +='</div>';
    str +='</div>';
    $("#load_diagram_pop").html(str);
    
    location.href = "#load_diagram_pop";

    $(".btn-cancel").off('click');
    $(".btn-cancel").on('click');
    $(".btn-cancel").click(function () {
        location.href = "#";
        res = "";
    });

    $('#btn_load_ok').off('click');
    $('#btn_load_ok').on('click');
    $('#btn_load_ok').click(function () {
        func_load_func();
        res = [];
    });

    var fileInput = document.getElementById("csv"),
    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            res = csvJSON(reader.result);
            $('#btn_load_ok').removeAttr('disabled');
        };
        reader.readAsText(fileInput.files[0], 'utf8');
        
    };
    fileInput.addEventListener('change', readFile);
}

function csvJSON(csv) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    //console.log(result[0]["Provider"]);

    //return result; //JavaScript object
    //return JSON.stringify(result); //JSON
    return result;
}

function func_load_func() {
    //console.log(res);
    var flag = 0;
    var keys = Object.keys(res[0]);
    //var myArr = ["Provider", "SourceFile", "TargetTable", "TargetColumn", "DataType", "Length", "Scale", "IsNullable", "Default", "IsIdentity", "IsVersioning", "IsCalculated", "ValidateFor", "EnableDate", "DisableDate", "RenameDate", "RenameColumnAs", "RenameDWColumnAs", "PKColumnRank", "ClusteredIndexRank", "isPrimary", "ForeignKey", "SurrogateFKName", "IsIndexed", "Remarks"];
    //for (var i = 0; i < myArr.length; i++) {
    //    if (myArr[i] != keys[i]) {
    //        alert("This csv file is not supported on this site!!!")
    //        flag = 1;
    //    }
    //}
    //if (flag == 1) {
    //    return;
    //}
    
    current_selected_provider_id = res[0]["Provider"];
    current_selected_table_id = "";

    current_selected_row = "";
    current_sel_row_num;

    provider_list = [];
    provider_list.push(res[0]["Provider"]);

    table_id_list = {};
    //table_id_list = { res[0]["Provider"]: [] };
    table_id_list[res[0]["Provider"]] = new Array();


    table_column_list = {};
    //table_column_list = { "Provider1": {} };
    table_column_list[res[0]["Provider"]] = new Object();

    var old_provider = res[0]["Provider"];
    var old_table = (res[0]["TargetTable"].split("."))[1];

    table_column_list[old_provider][old_table] = new Array();
    table_id_list[old_provider].push(old_table);

    res.forEach(function (element) {
        if (element["Provider"] != "") {
            if (old_provider == element["Provider"] && old_table == (element["TargetTable"].split("."))[1]) {
                var foreignKey;
                if (element["isPrimary"] == "Yes") {
                    foreignKey = "Yes";
                }
                else {
                    if (element["ForeignKey"] == "") {
                        foreignKey = "No";
                    }
                    else {
                        foreignKey = element["ForeignKey"];
                    }
                }
                var arr = new Object({ "Column Name": (element["TargetColumn"].split("."))[1], "Data Type": element["DataType"], "Length": element["Length"], "Scale": element["Scale"], "Nullable": element["IsNullable"], "Default Value": element["Default"], "IsIdentify": element["IsIdentity"], "IsVersioning": element["IsVersioning"], "IsDataStamp": element["IsDataStamp"], "IsCalculated": element["IsCalculated"], "ValidateFor": element["ValidateFor"], "EnableDate": element["EnableDate"], "DisableDate": element["DisableDate"], "RenameDate": element["RenameDate"], "RenameColumnAs": element["RenameColumnAs"], "RenameDWColumnAs": element["RenameDWColumnAs"], "IsIndexed": element["ClusteredIndexRank"], "Remarks": element["Remarks"], "isPrimary": foreignKey, "Schema": element["Schema"], "SourceFileName": element["SourceFile"] });
                table_column_list[old_provider][old_table].push(arr);
            }

            else if (old_provider == element["Provider"] && old_table != (element["TargetTable"].split("."))[1]) {
                var foreignKey;
                if (element["isPrimary"] == "Yes") {
                    foreignKey = "Yes";
                }
                else {
                    if (element["ForeignKey"] == "") {
                        foreignKey = "No";
                    }
                    else {
                        foreignKey = element["ForeignKey"];
                    }
                }
                old_table = (element["TargetTable"].split("."))[1];
                console.log(old_table);

                table_id_list[old_provider].push(old_table);
                table_column_list[old_provider][old_table] = new Array();
                var arr = new Object({ "Column Name": (element["TargetColumn"].split("."))[1], "Data Type": element["DataType"], "Length": element["Length"], "Scale": element["Scale"], "Nullable": element["IsNullable"], "Default Value": element["Default"], "IsIdentify": element["IsIdentity"], "IsVersioning": element["IsVersioning"], "IsDataStamp": element["IsDataStamp"], "IsCalculated": element["IsCalculated"], "ValidateFor": element["ValidateFor"], "EnableDate": element["EnableDate"], "DisableDate": element["DisableDate"], "RenameDate": element["RenameDate"], "RenameColumnAs": element["RenameColumnAs"], "RenameDWColumnAs": element["RenameDWColumnAs"], "IsIndexed": element["ClusteredIndexRank"], "Remarks": element["Remarks"], "isPrimary": foreignKey, "Schema": element["Schema"], "SourceFileName": element["SourceFile"] });
                table_column_list[old_provider][old_table].push(arr);
            }

            else if (old_provider != element["Provider"] && element["Provider"] != "") {
                var foreignKey;
                if (element["isPrimary"] == "Yes") {
                    foreignKey = "Yes";
                }
                else {
                    if (element["ForeignKey"] == "") {
                        foreignKey = "No";
                    }
                    else {
                        foreignKey = element["ForeignKey"];
                    }                    
                }
                old_provider = element["Provider"];
                old_table = (element["TargetTable"].split("."))[1];

                provider_list.push(old_provider);
                table_id_list[old_provider] = new Array();
                table_id_list[old_provider].push(old_table);
                table_column_list[old_provider] = new Object();
                table_column_list[old_provider][old_table] = new Array();
                var arr = new Object({ "Column Name": (element["TargetColumn"].split("."))[1], "Data Type": element["DataType"], "Length": element["Length"], "Scale": element["Scale"], "Nullable": element["IsNullable"], "Default Value": element["Default"], "IsIdentify": element["IsIdentity"], "IsVersioning": element["IsVersioning"], "IsDataStamp": element["IsDataStamp"], "IsCalculated": element["IsCalculated"], "ValidateFor": element["ValidateFor"], "EnableDate": element["EnableDate"], "DisableDate": element["DisableDate"], "RenameDate": element["RenameDate"], "RenameColumnAs": element["RenameColumnAs"], "RenameDWColumnAs": element["RenameDWColumnAs"], "IsIndexed": element["ClusteredIndexRank"], "Remarks": element["Remarks"], "isPrimary": foreignKey, "Schema": element["Schema"], "SourceFileName": element["SourceFile"] });
                table_column_list[old_provider][old_table].push(arr);
            }
        }
    });

    location.href = "#";

    var str = "";
    for (var i = 0; i < provider_list.length; i++) {
        str += "<option>" + provider_list[i] + "</option>";
    }    

    $("#provider_select").html(str);

    Display_table_name_list();
    redraw_all_table();
    redraw_all_connection();
    
}

function Edit_Provider() {
    location.href = "#edit_provider_pop";
}

$("#edit_provider_ok").click(function () {
    var flag = 0;

    if ($("#edit_provider_name").val() == "") {
        $("#edit_provider_name").addClass("alert-input");
        flag = 1;
    }

    for (var i = 0; i < provider_list.length; i++) {
        if ($("#edit_provider_name").val() == provider_list[i]) {
            $("#edit_provider_name").addClass("alert-input");
            flag = 1;
        }
    }

    if (flag == 1)
        return;

    location.href = "#";
});
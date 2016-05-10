builder.CreateFile("docx");

var Api = editor;
var oDocument     = Api.GetDocument();
oDocument.CreateNewHistoryPoint();

var oParagraph, oTable, oTableRow, oCell, oCellContent, oRun, oDrawing;


oTable = Api.CreateTable(3, 3);
oDocument.Push(oTable);
oTable.SetJc("right");

builder.SaveFile("docx", "/home/ilya/Documents/temp_docx/default_table_in_paragraph_right.docx");
builder.CloseFile();
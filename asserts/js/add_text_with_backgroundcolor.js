builder.CreateFile("docx");

var Api = editor;
var oDocument     = Api.GetDocument();
oDocument.CreateNewHistoryPoint();

var oParagraph, oTable, oTableRow, oCell, oCellContent, oRun, oDrawing;

oParagraph = Api.CreateParagraph();
oParagraph.SetShd("clear", 0, 255, 0, false);
oParagraph.AddText("Green");
oDocument.Push(oParagraph)

builder.SaveFile("docx", "/home/ilya/Documents/temp_docx/add_text_with_backgroundcolor_in_paragraph.docx");
builder.CloseFile();
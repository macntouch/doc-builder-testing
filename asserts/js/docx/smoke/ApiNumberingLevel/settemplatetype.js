builder.CreateFile("docx");
var oDocument = Api.GetDocument();
var oParagraph, oNumLvl, oNumbering;
oNumbering = oDocument.CreateNumbering("numbered");
oNumLvl = oNumbering.GetLevel(0);
oNumLvl.SetTemplateType("A.");
oParagraph = oDocument.GetElement(0);
oParagraph.SetNumbering(oNumLvl);
oParagraph.AddText("This is the first element of an A.-B.-C. numbered list");
oParagraph = Api.CreateParagraph();
oParagraph.SetNumbering(oNumLvl);
oParagraph.AddText("This is the second element of an A.-B.-C. numbered list");
oDocument.Push(oParagraph);
oParagraph = Api.CreateParagraph();
oParagraph.SetNumbering(oNumLvl);
oParagraph.AddText("This is the third element of an A.-B.-C. numbered list");
oDocument.Push(oParagraph);
builder.SaveFile("docx", "SetTemplateType.docx");
builder.CloseFile();
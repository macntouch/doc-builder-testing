builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var sRange = oWorksheet.GetRange("A1:D5");
builder.SaveFile("xlsx", "SetAlignHorizontal.xlsx");
builder.CloseFile();
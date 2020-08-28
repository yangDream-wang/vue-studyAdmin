import FileSaver from 'file-saver'
import XLSX from 'xlsx'
/**
 * 导出excel
 * @param {表格的id} table_id 
 * 注意:
 * 1. 表格中有field定位属性,将会导出两份(建议去除定位)
 */
function exportExcel(table_id) {
  let xlsxParam = {
    raw: true
  };
  let wb = XLSX.utils.table_to_book(
    document.querySelector(table_id),
    xlsxParam
  );
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      //设置导出文件名称
      "export.xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
}
export default {
  exportExcel
}
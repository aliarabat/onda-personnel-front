export function downloadfile(data: any, type: string, fileName: string) {
  const blob = new Blob([data], {type: type});
  let link = document.createElement("a");
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function saveToFile(fileName, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'text/json'});
    const anchor = document.createElement('a');

    anchor.download = fileName;
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/json', anchor.download, anchor.href].join(':');
    anchor.click();
}

export function isJPEG(file) {
    const reader = new FileReader();
  
  
    return new Promise((resolve, reject) => {
        
        if(file == null) reject();

        
        reader.readAsArrayBuffer(file.slice(0, 2));

        reader.onload = function(e) {
            const arr = new Uint8Array(e.target.result);

            console.log(arr[0] === 0xFF && arr[1] === 0xD8);
        
            if (arr[0] === 0xFF && arr[1] === 0xD8) {
                resolve();
            } else {
                reject();
            }
        }
    });
}
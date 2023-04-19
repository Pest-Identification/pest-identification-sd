export function isJPEG(file) {
    const reader = new FileReader();
  
  
    return new Promise((resolve, reject) => {
        
        if(file == null) reject();

        
        reader.readAsArrayBuffer(file.slice(0, 2));

        reader.onload = function(e) {
            const arr = new Uint8Array(e.target.result);

            //console.log(arr[0] === 0xFF && arr[1] === 0xD8);
        
            if (arr[0] === 0xFF && arr[1] === 0xD8) {
                resolve();
            } else {
                reject();
            }
        }
    });
}



export function compressJPEG(file, maxSizeInBytes) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
            let compressionQuality = 1;
            if (file.size > maxSizeInBytes) {
            compressionQuality = maxSizeInBytes / file.size;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
            resolve(blob);
            }, 'image/jpeg', compressionQuality);
        };
        };
    })
  }
  
  
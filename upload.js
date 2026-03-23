const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dntzxu2tx', 
  api_key: '742422188867985', 
  api_secret: 'htbk54ixwoQi42VgPBO2-uJvBXY' 
});

const files = [
  'ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-1.jpg',
  'ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-2.jpg',
  'ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-3.jpg',
  'ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-4.jpg'
];

async function upload() {
  for (let file of files) {
    try {
        const fullPath = path.join('d:/MINHANH/Admin/src/assets/', file);
        if (fs.existsSync(fullPath)) {
            const res = await cloudinary.uploader.upload(fullPath, {folder: 'minhanh'});
            console.log(file + '=>' + res.secure_url);
        } else {
            console.log(file + '=>NOT_FOUND');
        }
    } catch(e) {
        console.log(file + '=>ERROR:' + e.message);
    }
  }
}
upload();

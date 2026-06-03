import multer from 'multer';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const uploadsDir = resolve(__dirname, '../uploads');

mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null, uploadsDir)
},
    filename:(req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);

    }

}
);

const upload = multer({storage});
export default upload;



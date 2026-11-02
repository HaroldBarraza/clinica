import multer from "multer";
import path from "path";
import crypto from "crypto";
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nombre = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
        cb(null, nombre);
    },
});
const fileFilter = (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        cb(new Error("Solo se permiten imágenes"));
        return;
    }
    cb(null, true);
};
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
//# sourceMappingURL=multer.js.map
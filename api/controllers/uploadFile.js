const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  const uploadPath = path.resolve(process.cwd(), "upload");

  const form = new formidable.IncomingForm();

  form.encoding = "utf-8";
  form.uploadDir = uploadPath;
  form.maxFieldsSize = 20 * 1024 * 1024;

  form.parse(req);

  form.on("file", function(name, file) {
    fs.rename(file.path, `${uploadPath}/${file.name}`, error => {
      if (error) {
        res.json({
          status: "error",
          message: "upload error"
        });
      } else {
        res.json({
          status: "success",
          message: "upload success"
        });
      }
    });
  });
};

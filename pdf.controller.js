import PdfModel from "./Pdf.model.js";
import uploadFileSupabase from "./uploadFileSupabase.js";

export const uploadFileController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file provided",
        success: false
      });
    }

    const uploadedFile = await uploadFileSupabase(file);

    return res.status(200).json({
      message: "File uploaded successfully",
      success: true,
      data: {
        path: uploadedFile.path,
        previewLink: uploadedFile.previewLink,
        original_name: file.originalname
      }
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const uploadPdf = async (req, res) => {
  try {
    const { RedgNo, Branch, Year, Subject, Title, Url } = req.body;
    const uploadPdfData = new PdfModel({RedgNo, Branch, Year, Subject, Url, Title});
    await uploadPdfData.save();
    return res.status(200).json({
      message: "Pdf uploaded successfully",
      success: true,
      data: uploadPdfData
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}

export const getByBranch = async (req, res) => {
  try {
    const {year, branch} = req.params;
    const pdfs = await PdfModel.find({Year: year, Branch: branch});
    return res.status(200).json({
      message: "Pdf fetched by branch successfully",
      success: true,
      data: pdfs
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  
  }
}
export const getBySubject = async (req, res) => {
  try {
    const {year, branch, subject} = req.params;
    const pdfs = await PdfModel.find({Year: year, Branch: branch, Subject: subject});
    return res.status(200).json({
      message: "Pdf fetched by subject successfully",
      success: true,
      data: pdfs
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}
export const getBySearch = async (req, res) => {
  try {
    const {search} = req.query;
    const pdfs = await PdfModel.find({
      $or : [
        {Branch : {$regex : search, $options : "i"}}, 
        {Year : {$regex : search, $options : "i"}},
        {Subject : {$regex : search, $options : "i"}},
        {Title : {$regex : search, $options : "i"}}
      ]
    });
    return res.status(200).json({
      message: "Pdf fetched by search successfully",
      success: true,
      data: pdfs
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}
export const deletePdf = async (req, res) => {
  try {
    const {id} = req.body;
    const pdf = await PdfModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Pdf deleted successfully",
      success: true,
      data: pdf
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}
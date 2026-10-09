import { createBinLabelPdf } from "../services/binLabel.js";

export async function generateBinLabelByBinCode(req, res, next) {
    try {
        const {binCode} = req.body

        if (!binCode) {
            return res.status(400).json({
                success: false,
                message: "Bin Is Required"
            })
        }

        const code = binCode.trim().toUpperCase()
        const pdf = await createBinLabelPdf(code)

        if (!pdf) {
            return res.status(404).json({
                success: false,
                message: "Bin Not Found"
            })
        }

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${code}.pdf"`
        });

        pdf.pipe(res);
        pdf.end();

    } catch (err) {
        err.status = 500
        next(err)
    }
}
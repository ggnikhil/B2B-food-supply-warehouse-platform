import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import { binLocationLabelModel } from "../../models/operation/binLabel.model.js";

const WAREHOUSE_CODE = "MUM3";

// Sticker dimensions in PDF points
const WIDTH = 400;
const HEIGHT = 150;

export async function createBinLabelPdf(binCode) {
    const bin = await binLocationLabelModel.findOne({
        warehouseCode: WAREHOUSE_CODE,
        binCode: binCode.trim().toUpperCase(),
    }).lean();

    if (!bin) return null;

    const qrImage = await QRCode.toBuffer(
        String(bin.binId),
        {
            type: "png",
            width: 400,
            margin: 1,
            errorCorrectionLevel: "M",
        }
    );

    const pdf = new PDFDocument({
        size: [WIDTH, HEIGHT],
        margin: 0,
    });

    // Sticker outer border
    pdf.lineWidth(3);
    pdf.rect(4, 4, WIDTH - 8, HEIGHT - 8).stroke();

    // Divider between bin information and QR section
    const dividerX = 270;

    pdf.lineWidth(3);
    pdf.moveTo(dividerX, 4)
        .lineTo(dividerX, HEIGHT - 4)
        .stroke();

    // Horizontal divider under bin code
    pdf.moveTo(4, 110)
        .lineTo(dividerX, 110)
        .stroke();

    // Bin code
    pdf.font("Helvetica-Bold")
        .fontSize(36)
        .text(bin.binCode, 12, 42, {
            width: dividerX - 24,
            align: "center",
            lineBreak: false,
            ellipsis: true,
        });

    // Warehouse code
    pdf.font("Helvetica-Bold")
        .fontSize(12)
        .text(`WH-${bin.warehouseCode}`, 10, 121, {
            width: dividerX - 20,
            align: "center",
        });

    // QR code centered in the right section
    const qrSize = 105;
    const qrX = dividerX + (WIDTH - 4 - dividerX - qrSize) / 2;
    const qrY = (HEIGHT - qrSize) / 2;

    pdf.image(qrImage, qrX, qrY, {
        width: qrSize,
        height: qrSize,
    });

    return pdf;
}

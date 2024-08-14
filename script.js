// script.js
document.getElementById("export").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  try {
    // html2canvas를 사용하여 콘텐츠를 캡처
    const canvas = await html2canvas(document.getElementById("exportDoc"), {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    // A4 용지 크기 (mm)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // 캔버스와 PDF 페이지 크기 설정
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pageHeight = pdfHeight;
    let position = 0;

    // PDF 생성
    const pdf = new jsPDF({
      orientation: "p", // 'p' for portrait, 'l' for landscape
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    // 첫 페이지 추가
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, pageHeight);
    let heightLeft = imgHeight - pageHeight;

    // 페이지가 넘어갈 경우
    while (heightLeft > 0) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, pageHeight);
      heightLeft -= pageHeight;
    }

    // PDF 저장
    pdf.save("webpage.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
});

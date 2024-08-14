// script.js
document.getElementById("export").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  try {
    // html2canvas를 사용하여 콘텐츠를 캡처
    const canvas = await html2canvas(document.getElementById("exportDoc"), {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    // A4 용지 크기 (mm) - 가로 방향
    const pdfWidth = 297; // A4 width in mm (landscape)
    const pdfHeight = 210; // A4 height in mm (landscape)

    // 캔버스와 PDF 페이지 크기 설정
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: "l", // 'l' for landscape
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    // 페이지 크기에 맞춰 이미지를 나누어 저장
    let position = 0;
    let heightLeft = imgHeight;

    // 첫 페이지 추가
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, pdfHeight);
    heightLeft -= pdfHeight;

    // 페이지가 넘어갈 경우
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, pdfHeight);
      heightLeft -= pdfHeight;
    }

    // PDF 저장
    pdf.save("webpage.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
});

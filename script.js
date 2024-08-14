// script.js
document.getElementById("export").addEventListener("click", () => {
  // jsPDF 라이브러리에서 jsPDF 객체를 가져옵니다.
  const { jsPDF } = window.jspdf;

  // 새로운 PDF 문서 생성(jsPDF 인스턴스 생성)
  const doc = new jsPDF();

  // Base64로 인코딩된 폰트 데이터 (여기에는 실제 Base64 문자열을 넣어야 합니다)
  const base64FontData = ""; // 실제 Base64 인코딩된 폰트 문자열을 여기에 넣으세요

  // 한글 폰트 로드
  doc.addFileToVFS("PretendardVariable.woff2", base64FontData);
  doc.addFont("PretendardVariable.woff2", "PretendardVariable", "normal");
  doc.setFont("PretendardVariable");

  // PDF에 추가할 내용 정의
  const content = document.getElementById("exportDoc").innerText;

  // PDF에 내용 추가
  doc.text(content, 10, 10);

  // PDF 파일 다운로드
  doc.save("guide.pdf");
});

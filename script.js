// script.js
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".g-section");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      const content = document.getElementById(tabId);

      // 모든 탭 버튼과 내용에서 'active' 클래스를 제거
      tabButtons.forEach((btn) => {
        if (btn !== button) {
          btn.classList.remove("active");
        }
      });
      tabContents.forEach((content) => {
        if (content.id !== tabId) {
          content.classList.remove("active");
        }
      });

      // 클릭한 버튼에 'active' 클래스 토글
      button.classList.toggle("active");

      // 해당 탭과 연결된 내용 토글
      content.classList.toggle("active");
    });
  });

  // 기본적으로 첫 번째 탭을 활성화하고 내용 표시
  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }
});

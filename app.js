const documents = [
  {
    id: 1,
    title: "Tài liệu mẫu 1",
    description: "Nội dung minh họa",
    content: "Đây là nội dung tài liệu mẫu thứ nhất."
  },
  {
    id: 2,
    title: "Tài liệu mẫu 2",
    description: "Nội dung minh họa",
    content: "Đây là nội dung tài liệu mẫu thứ hai."
  },
  {
    id: 3,
    title: "Tài liệu mẫu 3",
    description: "Nội dung minh họa",
    content: "Đây là nội dung tài liệu mẫu thứ ba."
  }
];

const list = document.getElementById("documents");
const detail = document.getElementById("detail");
const search = document.getElementById("search");

function render(items) {
  list.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "document";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.append(title, description);

    card.addEventListener("click", () => {
      document.getElementById("detail-title").textContent =
        item.title;

      document.getElementById("detail-content").textContent =
        item.content;

      list.hidden = true;
      search.hidden = true;
      detail.hidden = false;
    });

    list.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const keyword = search.value.toLowerCase();

  render(documents.filter(item =>
    item.title.toLowerCase().includes(keyword)
  ));
});

document.getElementById("back").addEventListener("click", () => {
  detail.hidden = true;
  list.hidden = false;
  search.hidden = false;
});

render(documents);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register(
        "./service-worker.js"
      );

      document.getElementById("status").textContent =
        "Ứng dụng đã đăng ký chế độ offline.";
    } catch (error) {
      document.getElementById("status").textContent =
        "Chưa đăng ký được chế độ offline.";
    }
  });
}
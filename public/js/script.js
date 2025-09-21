document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");

  if (toggleBtn && sidebar && content) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      content.classList.toggle("expanded");
    });
  }});

  // Bill items array
  document.addEventListener("DOMContentLoaded", () => {
  let items = [];

  window.addItem = function() {
    const stockSelect = document.getElementById("stockId");
    const stockId = stockSelect.value;
    const stockName = stockSelect.options[stockSelect.selectedIndex].text;
    const type = document.getElementById("type").value.trim();
    const size = document.getElementById("size").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value) || 0;
    const bundle = parseInt(document.getElementById("bundle").value) || 0;
    const price = parseFloat(document.getElementById("price").value) || 0;

    if (!stockId || quantity <= 0 || price < 0) {
      alert("Please select stock and enter valid quantity/price");
      return;
    }

    const total = quantity * price;
    const itemObj = { stockId, type, size, quantity, bundle, price, total };
    items.push(itemObj);

    const tbody = document.querySelector("#itemsTable tbody");
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${stockName}</td>
      <td>${type}</td>
      <td>${size}</td>
      <td>${quantity}</td>
      <td>${bundle}</td>
      <td>${price.toFixed(2)}</td>
      <td>${total.toFixed(2)}</td>
      <td><button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this)">Remove</button></td>
    `;

    stockSelect.value = "";
    document.getElementById("type").value = "";
    document.getElementById("size").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("bundle").value = "";
    document.getElementById("price").value = "";

    document.getElementById("itemsData").value = JSON.stringify(items);
  };

  window.removeItem = function(button) {
    const row = button.closest("tr");
    const tbody = row.parentNode;
    const index = Array.from(tbody.rows).indexOf(row);
    items.splice(index, 1);
    row.remove();
    document.getElementById("itemsData").value = JSON.stringify(items);
  };

  const billForm = document.getElementById("billForm");
  billForm.addEventListener("submit", (e) => {
    if (items.length === 0) {
      alert("Add at least one item to the bill");
      e.preventDefault();
      return false;
    }
    document.getElementById("itemsData").value = JSON.stringify(items);
  });
});

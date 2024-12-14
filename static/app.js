async function fetchSummary() {
    const dueDateDropdown = document.getElementById('summaryDueDate');
    const dueDate = dueDateDropdown.value;

    const summaryDiv = document.getElementById('summary');
    if (!dueDate) {
        summaryDiv.innerHTML = '';
        return;
    }

    const response = await fetch(`/summary?dueDate=${dueDate}`);
    const data = await response.json();
    summaryDiv.innerHTML = data.html;
}

document.getElementById('summaryDueDate').addEventListener('change', fetchSummary);

function openEditPopup(id, company, amount, paymentDate, status, dueDate, taxRate) {
    document.getElementById('editId').value = id;
    document.getElementById('editCompany').value = company;
    document.getElementById('editAmount').value = amount;
    document.getElementById('editPaymentDate').value = paymentDate;
    document.getElementById('editStatus').value = status;
    document.getElementById('editDueDate').value = dueDate;
    document.getElementById('editTaxRate').value = taxRate;
    document.getElementById('editPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeEditPopup() {
    document.getElementById('editPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

async function saveEdit() {
    const formData = new FormData(document.getElementById('editForm'));
    await fetch('/update', {
        method: 'POST',
        body: formData
    });
    location.reload(true);
    await fetchSummary();
    closeEditPopup();
}

async function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        await fetch(`/delete?id=${id}`, {
            method: 'DELETE'
        });
        location.reload(true);
        await fetchSummary();
    }
}

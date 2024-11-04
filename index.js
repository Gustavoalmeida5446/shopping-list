const item = document.getElementById('input')
item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

    function addItem() {
    const newItem = document.createElement('li');
    newItem.textContent = item.value;
    document.getElementById('list').appendChild(newItem);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newItem.prepend(checkbox);
    item.value = '';

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            newItem.classList.add('checked');
        } else {
            newItem.classList.remove('checked');
        }
    })
}

document.getElementById('btn').addEventListener('click', addItem)

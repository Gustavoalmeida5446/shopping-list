const state = localStorage.getItem('state')
const list = JSON.parse(state) ?? []




const item = document.getElementById('input')
item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        newItem()
        item.value = ''
    }
})

function addItem({ label, isChecked }) {
    const newItem = document.createElement('li')
    // newItem.textContent = item.value
    document.getElementById('list').appendChild(newItem)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = isChecked
    // newItem.appendChild(checkbox)

    const labelSpan = document.createElement('span')
    labelSpan.textContent = label

    // const span = document.createElement('span')
    // span.textContent = item.value
    // newItem.appendChild(span)

    newItem.append(checkbox, labelSpan)


    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            newItem.classList.add('checked')
        } else {
            newItem.classList.remove('checked')
        }
    })
}

document.getElementById('btn').addEventListener('click', newItem)




list.forEach(element => {
    addItem(element)
})

function newItem() {
    addItem({ label: item.value, isChecked: false })
    item.value = ''
}

document.getElementById('save-btn').addEventListener('click', function () {
    // console.log(document.getElementById('list'))
    const savedItems = document.getElementById('list')
    const arr = Array.from(savedItems.children)
    const map = arr.map(function (el) {
        const label = el.innerText
        const checkbox = el.firstChild.checked
        return {
            label: label,
            isChecked: checkbox
        }
    })
    console.log(arr)
    console.log(map)
    localStorage.setItem('state', JSON.stringify(map))
    alert('saved succcesfully')
})

function clear() {
    localStorage.clear()
    document.getElementById('list').replaceChildren('')
}

document.getElementById('clear-btn').addEventListener('click', clear)

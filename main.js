let selected = null;
let sorted = false;
const list = document.querySelector('.list');
const wraper = document.querySelector('.wraper');
const button = document.querySelector('.button');
const sortButton = document.querySelector('.sort_but');

const getRow = str => {
    const row = document.createElement('div');
    const dragbutton = document.createElement('div');
    const input = document.createElement('input');
    input.value = str;
    const removebutton = document.createElement('div');
    row.classList.add('row');
    dragbutton.classList.add('drugbutton');
    input.classList.add('row_input');
    removebutton.classList.add('removebutton');
    removebutton.addEventListener('click', function (e) {
        this.parentElement.remove();
        [...list.children].sort((a, b) => a.style.order - b.style.order).forEach((e, i) => e.style.order = i);

    });
    dragbutton.addEventListener('mousedown', function (e) {
        selected = this.parentElement
        selected.style.position = 'absolute'
        selected.style.backgroundColor = "#FFDC40";
        selected.style.zIndex = 999;
        e.preventDefault();
    });
    row.addEventListener('mousemove', function (e) {
        if (selected) {
            selected.style.left = e.clientX + 10 + 'px';
            selected.style.top = e.clientY + 10 + 'px';
            selected.positon = 'absolute';
            if (e.clientY - this.offsetTop > this.offsetHeight / 2) {
                this.classList.add('bottom--select')
                this.classList.remove('top--select');
            } else {
                this.classList.add('top--select')
                this.classList.remove('bottom--select');
            }
        }
    }, false)
    row.addEventListener('mouseup', function (e) {
        if (selected) {
            const sortedArr = [...list.children].sort((a, b) => a.style.order - b.style.order);
            let moved = sortedArr.splice(selected.style.order, 1)[0];
            if (e.clientY - this.offsetTop > this.offsetHeight / 2) {
                sortedArr.splice(parseInt(this.style.order) + 1, 0, moved)
            } else {
                sortedArr.splice(this.style.order, 0, moved)
            }
            sortedArr.forEach((e, i) => e.style.order = i)
            sorted = false
            selected.style.backgroundColor = '#fff'
            sortButton.style.opacity = 0.2;
            selected.style.zIndex = 5;
        }
    }, false)
    row.addEventListener('mouseleave', function (e) {
        this.classList.remove('bottom--select');
        this.classList.remove('top--select');
    })
    row.appendChild(dragbutton);
    row.appendChild(input);
    row.appendChild(removebutton);
    return row;
}


const addRow = (str = '') => {
    const row = getRow(str);
    row.style.order = list.children.length;
    list.appendChild(row)
    return row
}


button.addEventListener('click', e => addRow())

wraper.addEventListener('mouseup', function (e) {
    if (selected) {
        selected.style.position = 'relative'
        selected.style.left = '0px';
        selected.style.top = '0px';
        selected = null
        e.preventDefault();
    }
}, false);


const sortList = () => {
    let sortedList;
    if (!sorted || sorted === 2) {
        sortedList = [...list.children].sort((a, b) => {
            return a.children.item(1).value.charCodeAt(0) - b.children.item(1).value.charCodeAt(0);
        })
        sorted = 1
        sortButton.style.background = 'no-repeat center url("assets/orderdown.png")'
        sortButton.style.opacity = 1;
    } else {
        sortedList = [...list.children].sort((a, b) => {
            return b.children.item(1).value.charCodeAt(0) - a.children.item(1).value.charCodeAt(0);
        })
        sorted = 2
        sortButton.style.background = 'no-repeat center url("assets/orderup.png")'
        sortButton.style.opacity = 1;
    }
    sortedList.forEach((row, i) => {
        row.style.order = i;
    });
}

sortButton.addEventListener('click', function (e) {
    sortList(sorted)
}, false);

addRow()
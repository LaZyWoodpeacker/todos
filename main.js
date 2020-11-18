
let selected = null;
let sorted = false;
const list = document.querySelector('.list');
const wraper = document.querySelector('.wraper');
const button = document.querySelector('.button');
const sortButton = document.querySelector('.sort_but');

const reorder = () => [...list.children].sort((a, b) => a.style.order - b.style.order).forEach((e, i) => e.style.order = i);

const chInarrs = (arr, trg, src, before) => {
    const tmpArr = [...arr];
    trg = parseInt(trg)
    src = parseInt(src)
    const moved = tmpArr.splice(trg, 1)[0];
    let sliceIdx = src;
    if (trg > src) {
        sliceIdx += (before) ? 0 : 1;
    }
    else {
        sliceIdx += (before) ? -1 : 0;
    }
    tmpArr.splice(sliceIdx, 0, moved);
    return tmpArr;
}

const dragStart = function (e) {
    selected = this;
    setTimeout(() => {
        this.classList.add("row--disbled")
    }, 0);
}
const onDdrop = function (e) {
    if (selected && selected.style.order !== this.style.order) {
        const arr = [...list.children].sort((a, b) => a.style.order - b.style.order);
        const sortedArr = chInarrs(arr, selected.style.order, this.style.order, this.classList.contains('top--select')).forEach((e, i) => e.style.order = i);
        this.classList.remove('top--select');
        this.classList.remove('bottom--select');
    }
}

const dragEnd = function (e) {
    this.classList.remove("row--disbled");
    sorted = false;
    sortButton.style.opacity = 0.2;
    selected = null;
    this.classList.remove('top--select');
    this.classList.remove('bottom--select');
}

const dragOver = function (e) {
    if (e.clientY - this.offsetTop > this.offsetHeight / 2) {
        this.classList.add('bottom--select');
        this.classList.remove('top--select');
    } else {
        this.classList.add('top--select');
        this.classList.remove('bottom--select');
    }
    e.preventDefault()
}

const dragLeave = function (e) {
    this.classList.remove('bottom--select');
    this.classList.remove('top--select');
}

const sortList = () => {
    let sortedList;
    if (!sorted || sorted === 2) {
        sortedList = [...list.children].sort((a, b) => {
            return a.children.item(1).value.charCodeAt(0) - b.children.item(1).value.charCodeAt(0);
        })
        sorted = 1;
        sortButton.style.background = 'no-repeat center url("assets/orderdown.png")';
        sortButton.style.opacity = 1;
    } else {
        sortedList = [...list.children].sort((a, b) => {
            return b.children.item(1).value.charCodeAt(0) - a.children.item(1).value.charCodeAt(0);
        })
        sorted = 2;
        sortButton.style.background = 'no-repeat center url("assets/orderup.png")';
        sortButton.style.opacity = 1;
    }
    sortedList.forEach((row, i) => {
        row.style.order = i;
    });
}


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
        reorder();
    });
    row.addEventListener('dragstart', dragStart);
    row.addEventListener('dragleave', dragLeave);
    row.addEventListener('dragover', dragOver);
    row.addEventListener('dragend', dragEnd);
    row.addEventListener('drop', onDdrop);
    row.appendChild(dragbutton);
    row.appendChild(input);
    row.appendChild(removebutton);
    row.draggable = true;
    return row;
}
const addRow = (str = '') => {
    const row = getRow(str);
    row.style.order = list.children.length;
    list.appendChild(row);
    return row;
}


button.addEventListener('click', e => addRow());
sortButton.addEventListener('click', function (e) {
    sortList(sorted)
}, false);

addRow()

let title = document.getElementById('title');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let creat = document.getElementById('creat');
let total = document.getElementById('total');
let search = document.getElementById('search');
let btndelete = document.getElementById('deleteAll');
let mood = 'Creat';
let temp;

let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.product)
} else {
    data = [];
}
function getTotal() {
    if (price.value != '') {
        let result = (+price.value - +discount.value);
        total.innerHTML = result;
        total.style.background = 'rgb(0 247 221 / 77%)';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

creat.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML
    }
    //count
    if (price.value != '' && count.value < 1000) {
        if (mood === 'Creat') {
            if (count.value > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    data.push(newpro);
                }

            } else {
                data.push(newpro);
            }
        } else {
            data[temp] = newpro;
            mood = 'Creat';
            creat.innerHTML = 'Creat';
            count.style.display = 'block'
        }
        Clerdata();
    }
    //set localStorage
    localStorage.setItem('product', JSON.stringify(data));
    console.log(newpro);
    showdata()
}
function Clerdata() {
    title.value = '';
    price.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';
    total.innerHTML = '';
    total.style.background = 'red';
}
function showdata() {
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].category}</td>
        <td>${data[i].total}</td> 
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;

    if (data.length > 0) {
        btndelete.innerHTML = `
        <button onclick=deleteAll()>delete All(${data.length})</button> `

    } else {
        btndelete.innerHTML = ``;
    }
}
showdata()
//deleteitem
function deletedata(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showdata()
}
//deleteall
function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showdata();
}
function updatedata(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    discount.value = data[i].discount;
    getTotal();
    category.value = data[i].category;
    count.style.display = 'none';
    creat.innerHTML = 'update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0, behavior: 'smooth'
    })

}
let searchmood = 'title';
function Getsearchmode(id) {
    search.focus();
    if (id == 'searchtitle') {
        searchmood = 'title';
    } else {
        searchmood = 'category';
    }
    search.placeholder = 'search by ' + searchmood;
    search.value = '';
    showdata();
}
function searchdata(value) {
    let table = '';
    for (i = 0; i < data.length; i++) {
        if (searchmood == 'title') {
            if (data[i].title.includes(value.tolowercase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].total}</td>
                    <td><button onclick=updatedata(${i}) id=update>update</button></td>
                    <td><button onclick=deletedata(${i}) id=delete>delete</button></td>
                    `
            }
        }
        else {
            if (data[i].category.includes(value.tolowercase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].total}</td>
                    <td><button onclick=updatedata(${i}) id=update>update</button></td>
                    <td><button onclick=deletedata(${i}) id=delete>delete</button></td>
                    `
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
}
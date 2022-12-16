document.getElementById("all").onclick = function () {
    location.href = 'index.html'
}
document.getElementById("active").onclick = function () {
    location.href = 'active.html'
}
document.getElementById("completed").onclick = function () {
    location.href = 'complete.html'
}

const form = document.querySelector('#form-1');
const input = document.querySelector('#input-1');
const mainbtn = document.querySelector('#mainbtn');
const ul = document.querySelector('#ul-set');

if (mainbtn) {
    mainbtn.addEventListener('click', function () {
        count = localStorage.getItem('Count')
        count++;
        localStorage.setItem('Count', count)
    })
}
// SUBMIT EVENT 
form.addEventListener('click', (e) => { 
    e.preventDefault();
    if (e.target.classList.contains('mainbtn')) {
        console.log('aqxar ')
        let count = localStorage.getItem('Count');
        const li = document.createElement('li');
        const task = input.value.trim();
        if (!task) {
            alert("Please Enter Data")
            return;
        }
        else {
            li.setAttribute('id', `${count}`)
            li.innerHTML = `<input type="checkbox" class="chkbox" id="${count}">  <label  for="${count}" id ="label-1"> ${task}</label> <i class="delx fa-regular x-icon fa-trash-can" id="${count}"></i>`;
            ul.appendChild(li)
            localStorage.setItem(`${count}`, `${JSON.stringify(li.outerHTML)}`)
            location.reload();
        }
    }
    
})

//ALL PAGE

if (document.URL.includes('index.html')) {
    window.addEventListener("load", (e) => { 
        for (let item in localStorage) {
            if (item != 'Count' && item != 'length' && item != 'clear' && item != 'getItem' && item != 'setItem' && item != 'key' && item != 'removeItem' && !isNaN(item)) {
                ul.innerHTML +=JSON.parse(localStorage.getItem(`${item}`))
            }
        }
    })
}

ul.addEventListener('click', function (e) { 
    if (e.target.classList.contains('chkbox')) {
        let color = e.target.nextElementSibling;
        color.style.color = 'red';
        let outertext = e.target.parentElement.outerHTML;
        localStorage.setItem(`${e.target.id + 1000000}`, `${JSON.stringify(outertext)}`)
        localStorage.removeItem(`${e.target.id}`)
        location.reload();
    }
})

// ACTIVE PAGE

if (document.URL.includes('active.html')) {
    window.addEventListener("load", (e) => {
        for (let item in localStorage) {
            if (item != 'Count' && item != 'length' && item != 'clear' && item != 'getItem' && item != 'setItem' && item != 'key' && item != 'removeItem' && !isNaN(item) && +item < 1000000) {
                ul.innerHTML += JSON.parse(localStorage.getItem(`${item}`))
            }
        }
    })
    ul.addEventListener('click', function (e) { 
        if (e.target.classList.contains('chkbox')) {
            let color = e.target.nextElementSibling;
            color.style.color = 'red';
            let outertext = e.target.parentElement.outerHTML;
            localStorage.setItem(`${e.target.id + 1000000}`, `${JSON.stringify(outertext)}`)
            localStorage.removeItem(`${e.target.id}`)
            location.reload();
        }
    })
}
    
//COMPLETED PAGE 
if (document.URL.includes('complete.html')) {
    
    window.addEventListener("load", (e) => {
        e.preventDefault();
        for (let item in localStorage) {
            if (item != 'Count' && item != 'length' && item != 'clear' && item != 'getItem' && item != 'setItem' && item != 'key' && item != 'removeItem' && !isNaN(item) && +item > 1000000) {
                ul.innerHTML += JSON.parse(localStorage.getItem(`${item}`))
            }
        }
    })

    ul.addEventListener('click', function (e) {
        if (e.target.classList.contains('chkbox')) { 
            let color = e.target.nextElementSibling;
            color.style.color = 'black';
            let outertext = e.target.parentElement.outerHTML;
            localStorage.setItem(`${e.target.id}`, `${JSON.stringify(outertext)}`)
            console.log(e.target.id)
            localStorage.removeItem(`${e.target.id+1000000}`)
            location.reload()
        }

    })

    const deleteall = document.getElementById('delete')
    deleteall.addEventListener('click', function () { 
        const result = confirm("Whant to delete?")
        if (result) {
            for (let item in localStorage) {
                if (item > 1000000) {
                    localStorage.removeItem(`${item}`)
                    location.reload()
                }
            
                else {
                    console.log("delete all go wrong")
                }
            }
        }
    })

    ul.addEventListener('click', function (e) { 
        if (e.target.classList.contains("delx")) {
            const result = confirm("Whant to delete?")
            if (result) { 
                localStorage.removeItem(`${e.target.id + 1000000}`)
                e.target.parentElement.remove()
            }
        }
    }
)}

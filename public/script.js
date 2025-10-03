function addTitle(){
    let txt = "project";
    document.getElementById("h1").innerText = txt;
}
async function getData(){

    try {
        let response = await fetch('/p');
        let data = await response.json();

        createGrid(data);

    }catch(err){
        alert(err);
    }
}
function createGrid(data){
    let txt = "";
    for(obj of data){
        if(obj){
            txt +=
                `<div class="card">
                    <div>
                        <img src="../images/${obj.myFileName}?t=${Date.now()}" alt="${obj.name}">
                        <p>${obj.name}</p>
                        <div>${obj.Description}</div>
                        <div>👍🏻 ${obj.likes ?? 0} | 👎🏻 ${obj.dislikes ?? 0}</div>
                    </div>
                    <div>
                        <button onclick="deleteProduct(${obj.id})">Delete</button>
                        <button onclick="getById(${obj.id})">Edit</button>
                        <button onclick="ProjectView(${obj.id})">Project-View</button>
                    </div>
                </div>`
        }
    }
    document.getElementById('main').innerHTML = txt;
}
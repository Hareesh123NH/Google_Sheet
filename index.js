let rows=100;
let columns=26;

//head row
const headRow=document.querySelector(".head-row");
for(let i=0;i<columns;i++){
    let headCell=document.createElement("div");
    headCell.innerText=String.fromCharCode(i+65);
    headCell.id=headCell.innerText;
    headCell.classList.add("col-head");
    headRow.appendChild(headCell);
}


//Serial no
const serialNo=document.querySelector(".serial-no");
for(let i=1;i<=rows;i++){
    let headSelCell=document.createElement("div");
    headSelCell.innerText=i;
    headSelCell.id=i;
    headSelCell.classList.add("row-head");
    serialNo.appendChild(headSelCell);
}

//Body
const body=document.querySelector(".body");

for(let j=0;j<rows;j++){
    const row=document.createElement("div");
    row.classList.add("row");
    for(let i=0;i<columns;i++){
        let cell=document.createElement("span");
        cell.contentEditable=true;
        cell.classList.add("cell");
        cell.id=`${String.fromCharCode(i+65)}${j+1}`
        row.appendChild(cell);
    }
    body.appendChild(row);
}


//events
let selectedCell="";
let activeCell=document.querySelector(".selected-cell");
const cells=document.querySelectorAll("span");
const form =document.querySelector(".options form");
const expInput=document.querySelector("#expression");

let state={};

function applyCellInfoFormValues() {
    if(!state[selectedCell.id]){
        form.reset();
        return;
    }
    syncFormOptions(state[selectedCell.id]);

}
function syncFormOptions(cell){
    for(let key in cell){
        if(key==="isBold" || key==="isItalic" || key==="isUnderline"){
            form[key].checked=cell[key];
        }
        else{
            form[key].value=cell[key];
        }
    }
}

let r="";
let c="";
cells.forEach((cell)=>{
    cell.addEventListener("click",()=>{
        if(selectedCell){
            r.classList.remove("active");
            c.classList.remove("active");
            selectedCell.style.border="1px solid #a7a3a3"
        }
        selectedCell=cell;
        selectedCell.style.border="2px solid skyblue";
        activeCell.innerText=selectedCell.id;
        r=document.getElementById(selectedCell.id[0]);
        c=document.getElementById(selectedCell.id.substring(1));
        r.classList.add("active");
        c.classList.add("active");
        applyCellInfoFormValues();
    });
});



//form
// console.log(form);
form.addEventListener("change",()=>{
    if(!selectedCell){
        alert("Please select Cell!");
        form.reset();
        return;
    }
    const formData={
        fontFamily:form["fontFamily"].value,
        fontSize:form["fontSize"].value,
        isBold:form["isBold"].checked,
        isItalic:form["isItalic"].checked,
        isUnderline:form["isUnderline"].checked,
        align:form["align"].value,
        textColor:form["textColor"].value,
        backGroundColor: form["backGroundColor"].value
    }
    state[selectedCell.id]={...formData,innerText:selectedCell.innerText};
    // console.log(state[selectedCell.id]);
    applyStyles(formData);

});

function applyStyles(formData){
    selectedCell.style.fontSize=formData.fontSize+"px";
    selectedCell.style.fontFamily=formData.fontFamily;
    selectedCell.style.fontWeight=(formData.isBold)?"bold":"normal";
    selectedCell.style.fontStyle=(formData.isItalic)?"italic":"normal";
    selectedCell.style.textDecoration=(formData.isUnderline)?"underline":"none";
    selectedCell.style.textAlign=formData.align;
    selectedCell.style.color=formData.textColor;
    selectedCell.style.backgroundColor=formData.backGroundColor;
}

expInput.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        const result=eval(e.target.value);
        selectedCell.innerText=result;
    }
});


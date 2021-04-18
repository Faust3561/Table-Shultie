let table = document.getElementById("fields");
let btn_start = document.getElementById("btn_start");

let activeValue;
let data = [];
let startTime;

btn_start.addEventListener("click", fillTable);

initTable();

function initTable()
{
    table.innerHTML = '';
    for (let i = 0; i < 7; i++)
    {
        table.innerHTML += `<div>`;
        for (let j = 0; j < 7; j++)
        {
            table.innerHTML += `<div class="field" id="${i}_${j}">?</div>`;
        }
        table.innerHTML += `</div>`;
    }
}

function fillTable()
{
    let values = [];
    for (let i = -25; i < 25; i++)
    {
        values.push(i);
    }

    values.splice(values.indexOf(0), 1);

    for (let i = 0; i < 7; i++)
    {
        for (let j = 0; j < 7; j++)
        {
            let field = document.getElementById(`${i}_${j}`);
            let r = values[Math.floor(Math.random() * values.length)];

            field.id = r.toString();

            if (r === -1)
            {
                field.addEventListener("click", logic);
            }

            values.splice(values.indexOf(r), 1);

            field.classList.add((r > 0) ? "red" : "black");
            field.innerText = Math.abs(r).toString();
        }
    }
    btn_start.disabled = true;
    activeValue = -1;
    startTime = Date.now();
}

function tableReset()
{
    initTable();
    btn_start.disabled = false;
}

function logic()
{
    let field = document.getElementById(activeValue.toString());
    field.removeEventListener("click", logic);
    field.classList.add("field-anim");

    setTimeout(function ()
    {
        field.classList.remove("field-anim");
    }, 200);

    nextValue();
    data.push(Date.now());
    if (activeValue !== 0)
    {
        document.getElementById(activeValue.toString()).addEventListener("click", logic);
    }
    else
    {
        printResults();
        tableReset();
    }
}

function nextValue()
{
    if (activeValue < 0)
    {
        activeValue += 25;
    }
    else
    {
        activeValue -= 26;
    }
}

function printResults()
{
    let finalData1 = "";

    for (let i = 0; i < data.length; i++)
    {
        finalData1 += i + 1 + " " + (data[i] - startTime) + "\n";
    }
    copyToClipboard(finalData1);
}

function copyToClipboard(str)
{
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    alert("Тест успешно пройден\nРезульты скопированы в буфер обмена");
}
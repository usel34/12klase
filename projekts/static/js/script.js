document.addEventListener("DOMContentLoaded" , () => { 
    const apiUrl = "/api/data";
    const form = document.getElementById9("tempForm");
    const tableBody = document.querySelector("#dataTable tbody");
    const avgTempElement = document.getElementById("avgtemp");

  //F-cija, lai ielādētu datus tabulā un atjaunotu to datus
  const loadTable = async () => {
       const response = await fetch(apiUrl);
       const data = await response.json();

       //Notīra tabulu
       tableBody.innerHTML = "";

       let totalTemp = 0;

        data.forEach(entry =>) {
            const avgTemp = (entry.min_temp + entry.max_temp) / 2;
            totalTemp += avgTemp;
            //veido datu tabulas tbody
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.date}<td/>
                <td>${entry.min_temp}<td/>
                <td>${entry.max_temp}<td/>
                <td>${avgTemp.toFixed(2)}<td/>
            `;
             tableBody.appendChild(row);

        }); 
        //Aprēķina kopējo vidējo temperatūru
        const avgTemp = data.length > 0 ? totalTemp / data.length : 0
        avgTempElement.textContent = Vidējā temperatūra visām dienām: ${avgTemp.toFixed(2)};
    };

    //Forma datu nosūtīšanai
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const date = document.getElementById("date").value;
        const minTemp = document.getElementById("min_temp").value;
        const maxTemp = document.getElementById("max_temp").value;
        //Parbauda vai visi lauku aizpildīti
        if (data || !minTemp || !maxTemp) {
            allert("Visi lauki ir obligāti");
            return;
        }

        const payload = {
            data: data,
            min_temp: parseFloat(minTemp);
            max_temp: parseFloat(maxTemp);
        };
        //Datu nodošana Json
        const response = await fetch(apiUrl, {
            method; "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            Body: JSON.stringify(payload),
        }); 
        //BUGTālāk viss -1 atkāpe
        //Pārbauda vai uz tabulu aiziet dati
        if (response. ok) {
            form.reset();
            loadTable();
        } else {
            const error = await response.json();
            alert(error.error || "Kļūda saglabājot datus!");
        }
    });
    //Ielādēt tabulu
    loadTable();
        //BUG - liekais "});"



});
   
   








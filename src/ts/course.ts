// KLass och iterface
interface Courses{
    Code;
    Name;
    Pression;
    Syllabus;
}

// kör implements för att säkerställa att de följer varandra
class Course implements Courses {
    private code:string;
    private name:string;
    private progression:'A'|'B'|'C';
    private syllabus:string;

    constructor(Code:string,Name:string,Progression:'A'|'B'|'C',Syllabus:string)
    {
        this.code = Code;
        this.name = Name;
        this.progression = this.validateProgression(Progression);
        this.syllabus = Syllabus;
    }
    //GET och SET
    get Code()
    {
        return this.code;
    }
    set Code(Code:string)
    {
        this.code = Code;
    }
    get Name()
    {
        return this.name;
    }
    set Name(Name:string)
    {
        this.name = Name;
    }
    get Pression()
    {
        return this.progression;
    }
    set Progression(Progression:'A'|'B'|'C')
    {
        this.progression = this.validateProgression(Progression);
    }
  
    get Syllabus()
    {
        return this.syllabus;
    }

    set Syllabus(syllabus:string)
    {
        this.syllabus = syllabus;
    }

    //Funktion som kontrollerar att värde är ok. 
    private validateProgression(Progression:'A'|'B'|'C') :'A'|'B'|'C'
    {
        if(['A','B','C'].includes(Progression))
        {
            return Progression;
        }
        else
        {
            //SÄtter defaultvärde
            console.error('Fel värde på Progression, Ska vara A, B eller C');
            alert("Du måste ange A,B eller C. Nu sätts Defaultvärde A")
            return'A';
        }   
    }
}

//globalavariabler
let coursearray:Course[] = [];
let rownr:number =-1;
//Dom-event

document.addEventListener("DOMContentLoaded",init);

const Rensa = document.getElementById("Rensa") as HTMLFormElement;
//vilken rad som varit i fokus
const updatecellvalue = document.getElementById("tabell") as HTMLFormElement;
updatecellvalue.addEventListener("click",cell_focus);

//hämtar data från form
Rensa.addEventListener("click",deleterow);
const inputform = document.getElementById("inputform") as HTMLFormElement;
//hämtar data från form
inputform.addEventListener("submit",(event)=> {
event.preventDefault();
const codeInput:HTMLInputElement = document.getElementById("code") as HTMLInputElement;
const kursnamnInput:HTMLInputElement = document.getElementById("kursnamn") as HTMLInputElement;
const progressionInput:HTMLInputElement = document.getElementById("progression") as HTMLInputElement;
const syllabusInput:HTMLInputElement = document.getElementById("syllabus") as HTMLInputElement;
//skapar nytt objekt av klassen Course
let newCourse = new Course(codeInput.value,kursnamnInput.value,progressionInput.value as 'A'|'B'|'C',syllabusInput.value);

addrowCourse(newCourse);
if(coursearray)
{
    coursearray.push(newCourse);
}
else
{
    coursearray = [newCourse];
}
storelocal();
});


// Funktion som lägger till indata i tabellen. 
function addrowCourse(course:Course)
{
    //Hämtar tabell
    let tabell:any = document.getElementById("tabell")
    if(tabell)
    {
        //skapar rad   
        let row:Element = document.createElement("tr");
        //skapar cell och sätter värde. samt gör den editerbar
        let colKurskod:Element = document.createElement("td");
        colKurskod.textContent = course.Code;
        colKurskod.setAttribute("contenteditable","true");
        colKurskod.addEventListener("input",tabell_updated);
        row.appendChild(colKurskod);
        //skapar cell och sätter värde. samt gör den editerbar
        let colName:Element = document.createElement("td");
        colName.textContent = course.Name;
        colName.setAttribute("contenteditable","true");
        colName.addEventListener("input",tabell_updated);
        row.appendChild(colName);
        //skapar cell och sätter värde. samt gör den editerbar
        let colProgression:Element = document.createElement("td");
        colProgression.textContent = course.Pression;
        colProgression.setAttribute("contenteditable","true");
        colProgression.addEventListener("input",tabell_updated);
        row.appendChild(colProgression);
        //skapar cell och sätter värde. samt gör den editerbar
        let colsyllabus:Element = document.createElement("td");
        colsyllabus.textContent = course.Syllabus;
        colsyllabus.setAttribute("contenteditable","true");
        colsyllabus.addEventListener("input",tabell_updated);
        row.appendChild(colsyllabus);
        //Skriver data till tabell. 
        tabell.appendChild(row);
    }
    else
    {
        console.error("nåt gick fel vid hämtning av tabell.")
    }
}


function cell_focus(event:any)
{
    const cell:HTMLTableCellElement = event.target as HTMLTableCellElement;
    //hämtar parent(dvs raden för cellen) fär att bestämma vilken rad cellen är på
    const row:HTMLTableRowElement = cell.parentElement as HTMLTableRowElement;
    //-1 eftersom rad index för tabell börjar på 1 och inte 0 som array sedan börjar på. 
    const rownumber:number = row.rowIndex-1;
    rownr = rownumber;
}

function tabell_updated(event:any)
{
    //Plockar ur cell från event. 
    const cell:HTMLTableCellElement = event.target as HTMLTableCellElement;
    //hämtar parent(dvs raden för cellen) fär att bestämma vilken rad cellen är på
    const row:HTMLTableRowElement = cell.parentElement as HTMLTableRowElement;
    //-1 eftersom rad index för tabell börjar på 1 och inte 0 som array sedan börjar på. 
    const rownumber = row.rowIndex-1;
    
    //kontrollerar vilken kolumn det är som är tryckt. skriver värde till objekt i array som hanterar objekten
    if(cell.cellIndex==0)
    {
        coursearray[rownumber].Code = cell.innerText;
    }
    else if(cell.cellIndex==1)
    {
        coursearray[rownumber].Name = cell.innerText;
    }
    else if(cell.cellIndex==2)
    {
        coursearray[rownumber].Progression = cell.innerText as 'A'|'B'|'C';
    }
    else if(cell.cellIndex==3)
    {
        coursearray[rownumber].Syllabus = cell.innerText;
    }
    else
    {
        console.error("nåt har gått fel");
        
    }

    storelocal();
}


function deleterow()
{
    //hämtar tabell
    const table = document.getElementById("tabell");
    const rows = table?.getElementsByTagName("tr");
    //kontrollerar att de finns och inte är odefinerade samt lägger till 1 pågrund att tabell börjar på 1
    if(table && rows && rownr >-1)
    {
    table?.removeChild(rows[rownr+1]);
    //tar bort objekt från array. 
    coursearray.splice(rownr,1);
    storelocal();
    //sätter init på rownr då den berörda raden är borttagen. 
    rownr = -1;
    }
    
}


function storelocal()
{
    //omvandlar till JSON
    const JsonString:string = JSON.stringify(coursearray);
    localStorage.clear();
    localStorage.setItem("Courses",JsonString);
}

function init()
{
    let JsonString:any = localStorage.getItem("Courses");
    let tempcoursearray:any = JSON.parse(JsonString);
    //Måste skapa om JSON objekt till mina objekt. lägger till i array samt skapar rad samtidigt. 
    tempcoursearray.forEach(element => {
        console.log("länk"+element.syllabus);
        let newCourse:Course = new Course(element.code,element.name,element.progression as 'A'|'B'|'C',element.syllabus);
        coursearray.push(newCourse);        
        addrowCourse(newCourse);
    });

}
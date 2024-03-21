// KLass och iterface
interface Courses{

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
    //Funktion som kontrollerar att värde är ok. 
    private validateProgression(Progression:'A'|'B'|'C') 
    {
        if(['A','B','C'].includes(Progression))
        {
            return Progression;
        }
        else
        {
            //SÄtter defaultvärde
            console.error('Fel värde på Progression, Ska vara A, B eller C');
            return'A';
        }   
    }
}


let coursearray:Course[] = [];

//Dom-event
document.addEventListener("DOMContentLoaded",init);

const inputform = document.getElementById("inputform") as HTMLFormElement;
//hämtar data från form
inputform.addEventListener("submit",(event)=> {
event.preventDefault();
const codeInput = document.getElementById("code") as HTMLInputElement;
const kursnamnInput = document.getElementById("kursnamn") as HTMLInputElement;
const progressionInput = document.getElementById("progression") as HTMLInputElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
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
    console.log(course.Code+":datakommer")
    if(tabell)
    {
        let row:any = document.createElement("tr");

        let colKurskod:any = document.createElement("td");
        colKurskod.textContent = course.Code;
        colKurskod.setAttribute("contenteditable","true");
        colKurskod.addEventListener("input",tabell_updated);
        row.appendChild(colKurskod);

        let colName:any = document.createElement("td");
        colName.textContent = course.Name;
        colName.setAttribute("contenteditable","true");
        colName.addEventListener("input",tabell_updated);
        row.appendChild(colName);
        
        let colProgression:any = document.createElement("td");
        colProgression.textContent = course.Pression;
        colProgression.setAttribute("contenteditable","true");
        colProgression.addEventListener("input",tabell_updated);
        row.appendChild(colProgression);
        
        let colsyllabus:any = document.createElement("td");
        colsyllabus.textContent = course.Syllabus;
        colsyllabus.setAttribute("contenteditable","true");
        colsyllabus.addEventListener("input",tabell_updated);
        row.appendChild(colsyllabus);

        tabell.appendChild(row);
        //Lägger till objekt i array för lagring. Rad i tabell ska motsvara vart den ligger i array
        
    }
    else
    {
        console.error("nåt gick fel vid hämtning av tabell.")
    }
}

function tabell_updated()
{
    console.log("datauppdatera");
}


function storelocal()
{

    //omvandlar till JSOM
    const JsonString:string = JSON.stringify(coursearray);
    localStorage.setItem("Courses",JsonString);
}

function init()
{
    let JsonString:any = localStorage.getItem("Courses");
    let tempcoursearray:any = JSON.parse(JsonString);
    console.log("objekts",coursearray);

    tempcoursearray.forEach(element => {
        
        let newCourse = new Course(element.code,element.name,element.progression as 'A'|'B'|'C',element.syllabus);
        coursearray.push(newCourse);        
        addrowCourse(newCourse);
    });

}
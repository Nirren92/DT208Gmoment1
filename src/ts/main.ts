class Person {
    fullname: string;
    constructor(first:string, last: string){
        this.fullname = first + " " + last;
    }
    showname(): string {
        return this.fullname;
    }
}

let pers: Person = new Person("Niklas", "Borg");
console.log(pers.showname());
// Interface för användare
interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

// Funktion för att skriva ut användardetaljer
function printUserDetails(user: User): void {
  const userDetailsDiv = document.getElementById("userDetails");
  if (userDetailsDiv) {
    userDetailsDiv.innerHTML = `
      <h2>Användardetaljer:</h2>
      <p><strong>Namn:</strong> ${user.name}</p>
      <p><strong>E-postadress:</strong> ${user.email}</p>
      <p><strong>Telefonnummer:</strong> ${user.phoneNumber}</p>
    `;
  }
}

// Hämta DOM-element för formulär och användardetaljer
const userForm = document.getElementById("userForm") as HTMLFormElement;

// Lägg till händelselyssnare på formuläret
userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Hämta värden från formuläret
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const phoneNumberInput = document.getElementById(
    "phoneNumber"
  ) as HTMLInputElement;

  // Notering: här borde inputvalidering läggas till

  // Skapa ett användarobjekt
  const newUser: User = {
    name: nameInput.value,
    email: emailInput.value,
    phoneNumber: phoneNumberInput.value,
  };

  // Använd printUserDetails för att skriva ut användardetaljer
  printUserDetails(newUser);
});

//tabs
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-content");
  const tabLinks = document.querySelectorAll("ul.flex a");

  tabLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Sembunyikan semua konten tab
      tabs.forEach((tab) => {
        tab.classList.add("hidden");
      });

      // Hapus kelas 'active' dari semua link tab
      tabLinks.forEach((tabLink) => {
        tabLink.classList.remove("bg-gray-200");
      });

      // Tampilkan konten tab yang sesuai dengan link yang diklik
      tabs[index].classList.remove("hidden");
      link.classList.add("bg-gray-200");
    });
  });
});

//class person
class person {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }
}

//database person
const personList = [new person("Reygan Fadhilah", 20, 1000000)];

window.addEventListener("load", (event) => {
  const nameInput = document.getElementById("input-name");
  const ageInput = document.getElementById("input-age");
  const salaryInput = document.getElementById("input-salary");
  const averageInfo = document.getElementById("average-info");

  const submitButton = document.getElementById("submit-button");
  const tableBody = document.getElementById("table-body");
  renderData(tableBody);

  submitButton.addEventListener("click", (e) => {
    validateAndAddPerson()
      .then(() => {
        // Notifikasi berhasil
        alert("Data berhasil disimpan.");

        // Mengosongkan form input
        nameInput.value = "";
        ageInput.value = "";
        salaryInput.value = "";

        renderData(tableBody);
        renderData(tableBody);
        // Menghitung rata-rata umur dan uang saku
        let totalAge = 0;
        let totalSalary = 0;

        for (let i = 0; i < personList.length; i++) {
          let currentPerson = personList[i];

          totalAge += parseInt(currentPerson.age);
          totalSalary += parseInt(currentPerson.salary);
        }

        const averageAge = Math.floor(totalAge / personList.length);
        const averageSalary = Math.floor(totalSalary / personList.length);

        averageInfo.innerHTML = `Rata-rata pendaftar memiliki uang saku sebesar ${averageSalary} dengan rata-rata umur ${averageAge}`;

        renderData(tableBody);
      })
      .catch((error) => {
        alert(error);
      });
  });
  function validateAndAddPerson() {
    return new Promise((resolve, reject) => {
      const name = nameInput.value;
      const age = parseInt(ageInput.value);
      const salary = parseInt(salaryInput.value);

      if (name.length < 10) {
        reject("Nama harus minimal 10 karakter.");
      } else if (age < 25) {
        reject("Umur harus minimal 25 tahun.");
      } else if (salary < 100000 || salary > 1000000) {
        reject("Uang saku harus antara 100 ribu dan 1 juta.");
      } else {
        const newPerson = new person(name, age, salary);
        personList.push(newPerson);
        resolve();
      }
    });
  }

  renderData(tableBody);
});

//Menambahkan data ke dalam tabel
const renderData = (tableBody) => {
  tableBody.innerHTML = "";
  for (let i = 0; i < personList.length; i++) {
    let row = tableBody.insertRow(i);
    let currentPerson = personList[i];
    let numberCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let ageCell = row.insertCell(2);
    let salaryCell = row.insertCell(3);
    let actionCell = row.insertCell(4);

    numberCell.innerHTML = i + 1;
    nameCell.innerHTML = currentPerson.name;
    ageCell.innerHTML = currentPerson.age;
    salaryCell.innerHTML = currentPerson.salary;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("bg-red-500", "rounded", "px-3", "text-white");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", (e) => {
      const rowElement = e.target.parentElement.parentElement;
      const titleElement = rowElement.children[1];
      // const titleElement = rowElement.child

      // Hapus melalui array bookList

      personList.forEach((person, index) => {
        if (person.name === titleElement.textContent) {
          // HAPUS ROW atau Baris
          personList.splice(index, 1);
        }
      });

      // render ulang
      renderData(tableBody);
    });

    actionCell.append(deleteButton);
  }
};

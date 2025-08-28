import { generateRandomId } from "@/utils/helpers";

export type Employee = {
  id: string;
  name: string;
  phone: string;
  address: string;
  joinedAt: Date;
};

const firstNames = [
  "Andi",
  "Budi",
  "Citra",
  "Dewi",
  "Eka",
  "Fajar",
  "Gita",
  "Hendra",
  "Indah",
  "Joko",
  "Karin",
  "Lutfi",
  "Maya",
  "Nanda",
  "Oscar",
  "Putri",
  "Qori",
  "Rizky",
  "Sari",
  "Tono",
];

const lastNames = [
  "Pratama",
  "Wijaya",
  "Saputra",
  "Santoso",
  "Halim",
  "Susanto",
  "Syah",
  "Hartono",
  "Ramadhan",
  "Utami",
  "Wulandari",
  "Yusuf",
  "Mahendra",
  "Setiawan",
  "Gunawan",
];

const addresses = [
  "Jl. Merdeka No. 10, Jakarta",
  "Jl. Sudirman No. 25, Bandung",
  "Jl. Diponegoro No. 15, Surabaya",
  "Jl. Ahmad Yani No. 88, Yogyakarta",
  "Jl. Gajah Mada No. 3, Medan",
  "Jl. Pahlawan No. 5, Semarang",
  "Jl. Sisingamangaraja No. 22, Bali",
  "Jl. Kartini No. 7, Makassar",
  "Jl. Pattimura No. 11, Palembang",
  "Jl. Hasanuddin No. 9, Balikpapan",
];

function randomPhone(): string {
  return "08" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

function randomAddress(): string {
  return addresses[Math.floor(Math.random() * addresses.length)];
}

function randomDateWithinYear(): Date {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

function randomName(): string {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

export const employees: Employee[] = [];

for (let i = 0; i < 100; i++) {
  employees.push({
    id: generateRandomId(),
    name: randomName(),
    phone: randomPhone(),
    address: randomAddress(),
    joinedAt: randomDateWithinYear(),
  });
}

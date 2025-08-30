import { Employee, employees } from "@/data/employees";
import { Product, products } from "@/data/products";
import { generateRandomId } from "@/utils/helpers";

export type Sale = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unit: Product["unit"];
  amount: number;
  createdAt: Date;
  createdBy: Employee;
};

function randomDateWithinYear(): Date {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

export const sales: Sale[] = [];

for (let i = 0; i < 100; i++) {
  const product = products[Math.floor(Math.random() * products.length)];
  const employee = employees[Math.floor(Math.random() * employees.length)];
  const quantity = Math.floor(Math.random() * 20) + 1;

  sales.push({
    id: generateRandomId(),
    productId: product.id,
    name: product.name,
    quantity,
    unit: product.unit,
    amount: quantity * product.price,
    createdAt: randomDateWithinYear(),
    createdBy: employee,
  });
}

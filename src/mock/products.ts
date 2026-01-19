
export interface Product {
    id: string;
    name: string;
    category: string;
    quantity: number;
}

export const products: Product[] = [
    { id: "1", name: "Rice", category: "Grains", quantity: 120 },
    { id: "2", name: "Sugar", category: "Essentials", quantity: 80 },
    { id: "3", name: "Wheat Flour", category: "Grains", quantity: 50 },
    { id: "4", name: "Palm Oil", category: "Oils", quantity: 200 },
    { id: "5", name: "Salt", category: "Essentials", quantity: 150 },
    { id: "6", name: "Milk", category: "Dairy", quantity: 60 },
    { id: "7", name: "Butter", category: "Dairy", quantity: 30 },
    { id: "8", name: "Cheese", category: "Dairy", quantity: 25 },
    { id: "9", name: "Apples", category: "Fruits", quantity: 100 },
    { id: "10", name: "Bananas", category: "Fruits", quantity: 150 },
    { id: "11", name: "Tomatoes", category: "Vegetables", quantity: 90 },
    { id: "12", name: "Potatoes", category: "Vegetables", quantity: 200 },
    { id: "13", name: "Onions", category: "Vegetables", quantity: 180 },
    { id: "14", name: "Chicken", category: "Meat", quantity: 40 },
    { id: "15", name: "Mutton", category: "Meat", quantity: 20 },
];

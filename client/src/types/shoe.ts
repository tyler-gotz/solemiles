export type Shoe = {
    shoeId: string;
    name: string;
    brand: string;
    model: string;
    purchaseDate: string;
}

export type ShoeFormData = Omit<Shoe, 'shoeId'>;
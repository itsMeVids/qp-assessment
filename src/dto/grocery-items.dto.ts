import { OrderItemDTO } from "./order-items.dto";

export class GroceryItemsDto {
    id?: number;
    name: string;
    price: number;
    quantityAvailable: number;
    createdById: number;
    updatedById?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


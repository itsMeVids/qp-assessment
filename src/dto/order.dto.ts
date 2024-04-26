import { OrderItemDTO } from "./order-items.dto";

export class CreateOrderDto {
    id?: number
    totalPrice: number;
    createdById: number;
    selectedItems: OrderItemDTO[];
    createdAt: Date;
    updatedAt: Date;
}




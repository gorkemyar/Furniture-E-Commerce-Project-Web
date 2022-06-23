from datetime import datetime
from pydantic import BaseModel, validator, Extra
from typing import List
from schemas import Product, AddressBase, CreditBase
from models.order import OrderStatusEnum

# Shared properties


class OrderItem(BaseModel):
    id: int
    product: Product
    quantity: int
    order_status: OrderStatusEnum
    price: float

    class Config:
        orm_mode = True


class Order(BaseModel):
    address: AddressBase
    credit: CreditBase
    created_at: datetime
    order_details: List[OrderItem]

    class Config:
        orm_mode = True


class OrderShoppingCart(BaseModel):
    address_id: int
    credit_id: int

    class Config:
        extra = Extra.allow

class OrderList(BaseModel):
    data: List[Order]
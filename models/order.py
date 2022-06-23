from sqlalchemy import Column, Integer, Enum, ForeignKey, DateTime, String, Boolean, Float
from sqlalchemy.orm import relationship
from db.base_class import Base
import enum
import datetime


class OrderStatusEnum(str, enum.Enum):
    PROCESSING = "PROCESSING"
    INTRANSIT = "INTRANSIT"
    DELIVERED = "DELIVERED"
    REFUNDED = "REFUNDED"


class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.now())

    # relations
    user_id = Column(ForeignKey("user.id"))
    user = relationship("User", back_populates="orders")

    address_id = Column(ForeignKey("address.id"))
    address = relationship("Address", back_populates="orders")

    credit_id = Column(ForeignKey("credit.id"))
    credit = relationship("Credit", back_populates="orders")

    order_details = relationship(
        "OrderItem", cascade="all,delete", back_populates="order"
    )


class OrderItem(Base):
    __tablename__ = "orderitem"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.now())

    order_id = Column(ForeignKey("order.id"))
    order = relationship("Order", back_populates="order_details")

    product_id = Column(ForeignKey("product.id"))
    product = relationship("Product", back_populates="ordered_products")

    order_status = Column(Enum(OrderStatusEnum))
    quantity = Column(Integer)
    price= Column(Float)
    refund = relationship("RefundOrder", back_populates="orderitem", uselist=False)


class RefundOrder(Base):
    __tablename__ = "refundorder"

    id = Column(Integer, primary_key=True, index=True)

    reason = Column(String(), nullable=False)
    status = Column(Boolean, default=False)

    orderitem_id = Column(Integer, ForeignKey("orderitem.id"))
    orderitem = relationship("OrderItem", back_populates="refund")
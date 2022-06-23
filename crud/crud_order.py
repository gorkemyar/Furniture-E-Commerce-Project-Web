from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Order, User, OrderItem, RefundOrder, Product
from schemas.order import OrderShoppingCart
import crud, models, schemas
from typing import List
from utilities.gen_invoice import gen_invoice
from utilities.gen_invoice_list import gen_invoice_list
import utilities.sendMail
import datetime, os 

class CRUDOrder(CRUDBase[Order, OrderShoppingCart, OrderShoppingCart]):
    def create_order(
        self, db: Session, current_user: User, order_details: schemas.OrderShoppingCart
    ):
        shopping_cart_items = crud.shopping_cart.get_multi(db=db, user=current_user)

        item_list = schemas.ShoppingCartList(data=shopping_cart_items)
        item_list = item_list.dict()
        gorkem = (
            db.query(models.Address)
            .filter(models.Address.id == order_details.address_id)
            .first()
        )
        item_list["address"] = jsonable_encoder(gorkem)
        path_wkthmltopdf = "/usr/local/bin/wkhtmltopdf"

        # Load the json data file
        usermail = current_user.email
        username = usermail.split("@")[0]

        try:
            return_URL = gen_invoice(item_list, username)

            files = [return_URL.replace("pdf", "pdf")]
            content = "Hello Dear user, \n This is an invoice for your recent purchase. \n Thank you for your business."

            utilities.sendMail.send_mail(
                usermail, "Your Invoice from Voidture Inc.", content, files
            )
        except Exception as e: 
            cmd = "echo {} ".format(str(e))
            os.system(cmd)     

        new_order = models.Order(
            user_id=current_user.id,
            address_id=order_details.address_id,
            credit_id=order_details.credit_id,
        )

        db.add(new_order)
        db.commit()

        for item in shopping_cart_items:
            orderitem = models.OrderItem(
                order_status="PROCESSING",
                order_id=new_order.id,
                product_id=item.product_id,
                quantity=item.quantity,
            )
            db.add(orderitem)
            crud.product.decrease_stock(
                db=db, product_id=item.product_id, quantity=item.quantity
            )

        db.commit()

        crud.shopping_cart.remove_all(db=db, user=current_user)

    def get_multi(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Order]:
        return (
            db.query(Order)
            .filter(Order.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_multi_all(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Order]:
        return db.query(Order).offset(skip).limit(limit).all()

    def get_with_date(
        self, db: Session, *, start: datetime.datetime, end: datetime.datetime, user_id: int
    ):
        return (
            db.query(Order)
            .filter(Order.user_id == user_id)
            .filter(Order.created_at >= start)
            .filter(Order.created_at <= end)
            .all()
        )

    def get_order_item(self, db: Session, id: int):
        return db.query(OrderItem).filter(OrderItem.id == id).first()

    def create_refund_request(self, db: Session, refund: schemas.RefundCreate):
        order_item = self.get_order_item(db, refund.orderitem_id)
        obj_in_data = jsonable_encoder(refund)
        db_obj = models.RefundOrder(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()

    def change_refund_status(self, db: Session, id: int, value: bool):
        order_item = self.get_order_item(db, id)
        refundorder = (
            db.query(RefundOrder).filter(RefundOrder.orderitem_id == id).first()
        )
        refundorder.status = value
        product = db.query(Product).filter(Product.id == order_item.product_id).first()
        product.stock += order_item.quantity
        order_item.order_status = "REFUNDED"
        db.add(product)
        db.add(refundorder)
        db.add(order_item)
        db.commit()

    def get_refund_requests(self, db: Session):
        return db.query(RefundOrder).all()

    def update_order_status(self, db: Session, id: int, order_status: str):
        order = db.query(OrderItem).filter(OrderItem.id == id).first()
        # check if order_status is valid
        order.order_status = order_status
        db.add(order)
        db.commit()
        db.refresh(order)

    def create_invoice_list_of_all_time(
        self,
        db: Session,
        current_user: User,
        start: datetime.datetime, end = datetime.datetime,
    ):
        usermail = current_user.email
        username = usermail.split("@")[0]

        # Create the invoice pdf
        order_list = crud.order.get_with_date(
            db=db, user_id=current_user.id, start=start, end=end
        )

        item_list_schema = schemas.order.OrderList(data=order_list)
        item_list = item_list_schema.dict()

        return_URL = gen_invoice_list(item_list, username)

        files = [return_URL.replace("pdf", "pdf")]
        content = "Following is the invoices generated by all the users and the total revanue gathered."

        utilities.sendMail.send_mail(
            usermail, "Your Invoice from Voidture Inc.", content, files
        )
        return item_list_schema


order = CRUDOrder(Order)

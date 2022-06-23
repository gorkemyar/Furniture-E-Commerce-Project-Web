from typing import Any, Dict, List, Optional, Union

from sqlalchemy.orm import Session

from core.security import get_password_hash, verify_password
from crud.base import CRUDBase
from models.order import RefundOrder
from models.user import User
import schemas
from schemas.order import Order
from schemas.response import Response
from schemas.user import ChangePasswordIn, UserCreate, UserUpdate
from fastapi import status, HTTPException
from utilities.gen_invoice import gen_invoice
import utilities.sendMail


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            full_name=obj_in.full_name,
            user_type= obj_in.user_type
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    # def update(
    #     self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    # ) -> User:
    #     if isinstance(obj_in, dict):
    #         update_data = obj_in
    #     else:
    #         update_data = obj_in.dict(exclude_unset=True)
    #     if update_data["password"]:
    #         hashed_password = get_password_hash(update_data["password"])
    #         del update_data["password"]
    #         update_data["hashed_password"] = hashed_password
    #     return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        return user.is_active
    

    
    def update_password(self, current_user:User, db: Session, change_in: ChangePasswordIn) -> Response:
        if not verify_password(change_in.current_password,current_user.hashed_password):
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": f"The password entered is wrong"},
        )
        #be annoying
        if change_in.current_password==change_in.new_password:
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail={"message": f"New password cannot be your old password"},
            )
        hashed= get_password_hash(change_in.new_password)
        current_user.hashed_password=hashed
        db.add(current_user)
        db.commit()
        return Response(message="Updated password of user successfully.")
    
    def get_addresses(self, db: Session, id: int, skip: int, limit: int) -> List[schemas.AddressBase]:
        user_info = db.query(User).filter(User.id == id).first()
        if not user_info:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail={"message": f"User does not exists"})
        return user_info.address.offset(skip).limit(limit).all()

    def get_credits(self, db: Session, id: int, skip: int, limit: int) -> List[schemas.CreditBase]:
        user_info = db.query(User).filter(User.id == id).first()
        if not user_info:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail={"message": f"User does not exists"})
        return user_info.credit.offset(skip).limit(limit).all()
    
    def send_mail_to_current_user(self, db: Session, user_id:int, subject: str, message: str) -> Response:
        #return_URL = gen_invoice(item_list, current_user.full_name)
        #files = [return_URL.replace("html", "html")]
        current_user=db.query(User).filter(User.id==user_id).first()
        if not current_user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail={"message": f"User does not exists"})
                    #it may be a bad idea to put an exeption here since it would stop the discount in its tracks
        utilities.sendMail.send_mail(current_user.email, subject, message)
        return Response(message="Mail sent successfully.")
    def refund_request_check(self, current_user:User, db: Session):
        user_id=current_user.id
        order_list=[]
        check_if_exists= db.query(Order).filter(Order.user_id == user_id).first()
        
        if not check_if_exists:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail={"message": f"User has no orders"})
        for order_ in check_if_exists:
            order_list.append(order_.order_details.id)
        return db.query(RefundOrder).filter(RefundOrder.orderitem_id in order_list)


user = CRUDUser(User)
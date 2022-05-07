"""ordering_categories_v2

Revision ID: ac649fb7fc29
Revises: ba63ff2efd83
Create Date: 2022-05-07 08:19:03.351740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac649fb7fc29'
down_revision = 'ba63ff2efd83'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('order_id', sa.Integer(), nullable=True))
    op.drop_column('category', 'order')
    op.add_column('subcategory', sa.Column('order_id', sa.Integer(), nullable=True))
    op.drop_column('subcategory', 'order')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('subcategory', sa.Column('order', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('subcategory', 'order_id')
    op.add_column('category', sa.Column('order', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('category', 'order_id')
    # ### end Alembic commands ###

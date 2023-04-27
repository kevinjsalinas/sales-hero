"""added password hash row to user table

Revision ID: 7724f28b6ef7
Revises: c38c6c31fc02
Create Date: 2023-04-27 13:10:56.424804

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7724f28b6ef7'
down_revision = 'c38c6c31fc02'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))

    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###

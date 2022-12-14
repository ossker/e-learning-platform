"""relations updated

Revision ID: 87c0313f0165
Revises: d03378dd82a6
Create Date: 2022-12-10 18:41:05.309581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '87c0313f0165'
down_revision = 'd03378dd82a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('topic',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('course', sa.Column('category_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'course', 'category', ['category_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'course', type_='foreignkey')
    op.drop_column('course', 'category_id')
    op.drop_table('topic')
    # ### end Alembic commands ###

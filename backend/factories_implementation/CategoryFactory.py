from entities.Category import Category


def create_category(data: dict) -> Category:
    name = data.get('name')
    image = data.get('image')
    return Category(
        name=name,
        image=image,
    )

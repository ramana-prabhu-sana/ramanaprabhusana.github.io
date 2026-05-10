from datetime import datetime

product = {
    'P1': {
        'Name': 'Laptop',
        'Price_per_unit': 1500,
        'Current_stock_quantity': 45
    },
    'P2': {
        'Name': 'Mobile',
        'Price_per_unit': 300,
        'Current_stock_quantity': 75
    },
    'P3': {
        'Name': 'Keyboard',
        'Price_per_unit': 100,
        'Current_stock_quantity': 130
    },
    'P4': {
        'Name': 'Headset',
        'Price_per_unit': 50,
        'Current_stock_quantity': 300,
    },
    'P5': {
        'Name': 'Mouse',
        'Price_per_unit': 150,
        'Current_stock_quantity': 200
    }
}

sales_history = []
sale_counter = 1

def view_catalog():
    for key, value in product.items():
        print(key, value)

def make_a_sale():
    global sale_counter
    view_catalog()
    x = input('Please enter the product_id: ')
    if x not in product:
        print("Invalid product ID.")
        return
    y = input('Please enter the quantity: ')

    try:
        quantity = int(y)
        if quantity <= 0:
            print("Quantity should be a positive integer.")
            return
    except:
        print("Invalid input for quantity.")
        return

    if quantity > product[x]['Current_stock_quantity']:
        print(f"Insufficient stock. Current stock: {product[x]['Current_stock_quantity']}")
        return

    product[x]['Current_stock_quantity'] = product[x]['Current_stock_quantity'] - quantity
    view_catalog()

    now = datetime.now()
    date_time = str(now.year) + "-" + str(now.month) + "-" + str(now.day) + "," + str(now.hour) + ":" + str(now.minute) + ":" + str(now.second)

    sales = {
        'Sale_Number': sale_counter,
        'Date_and_Time': date_time,
        'ProductID': x,
        'Quantity_sold': quantity,
        'Total_sale_amount': int(product[x]['Price_per_unit']) * quantity
    }
    sale_counter = sale_counter + 1
    #sales_history_list(sales)
    sales_history.append(sales)

def sales_history_list(sales=None):
    #if sales is not None:
    #   sales_history.append(sales)

    print(sales_history)

while True:
    menu = input("Please select category:\n"
                 "1 to View Catalog\n"
                 "2 to Make a Sale\n"
                 "3 to View Sales History\n"
                 "Enter 'q' to exit\n")
    if menu == '1':
        view_catalog()
    elif menu == '2':
        make_a_sale()
    elif menu == '3':
        sales_history_list()
    elif menu == 'q':
        break
    else:
        print("Invalid selection. Please try again.")

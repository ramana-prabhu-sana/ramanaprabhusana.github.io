#Siddharth Shenoy - shenoy22@purdue.edu
#Ramana Prabhu Sana - rsana@purdue.edu

from datetime import datetime
from collections import Counter

# Initialize the product catalog
product_catalog = {
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

# Initialize the sales history
sales_history = []
sale_counter = 1
total_sales_revenue = 0
highest_revenue = 0


# Function to display the catalog
def view_catalog():
    for key, value in product_catalog.items():
        print(key, value)

# Function to make a sale
def make_sale():
    global sale_counter
    global total_sales_revenue
    global highest_revenue
    view_catalog()
    x = input('Please enter the product_id: ').upper()
    if x not in product_catalog:
        print("Invalid product ID.")
        return
    y = input('Please enter the quantity: ')

    try:
        quantity = int(y)
        if quantity <= 0:
            print("\nERROR:Quantity should be a positive integer.")
            return
    except:
        print("\nERROR:Invalid input for quantity.")
        return

    if quantity > product_catalog[x]['Current_stock_quantity']:
        print(f"Insufficient stock. Current stock: {product_catalog[x]['Current_stock_quantity']}")
        return

    product_catalog[x]['Current_stock_quantity'] = product_catalog[x]['Current_stock_quantity'] - quantity
    view_catalog()

    now = datetime.now()
    date_time = str(now.year) + "-" + str(now.month) + "-" + str(now.day) + "," + str(now.hour) + ":" + str(now.minute) + ":" + str(now.second)

    sales = {
        'Sale_Number': sale_counter,
        'Date_and_Time': date_time,
        'ProductID': x,
        'Name':product_catalog[x]['Name'],
        'Quantity_sold': quantity,
        'Total_sale_amount': float(product_catalog[x]['Price_per_unit']) * quantity
    }
    sale_counter = sale_counter + 1

    #This is to calculate the total sales revenue 
    total_sales_revenue = total_sales_revenue + float(sales['Total_sale_amount'])

    #This is to find the highest revenue product
    if highest_revenue < float(sales['Total_sale_amount']):
        highest_revenue = float(sales['Total_sale_amount'])

        
    #sales_history_list(sales)
    sales_history.append(sales)




# Function to view sales history
def view_sales_history():

    if sale_counter == 1:
        print('NO SALES HISTORY\n')
    else:
        for item in sales_history:
            print(item)
            
#Calculate and display statistics such as total sales revenue, the best-selling product, and the product with the highest revenue.
def view_stats():
    if sale_counter == 1:
        print('\nNO STATS AVAILABLE YET \n')
    else:
        id_counts = Counter(sales["Name"] for sales in sales_history)

# Find the most common product ID
        most_common_id, count = id_counts.most_common(1)[0]
        print(f"\nSTATISTICS:\n")

        print(f"The best selling product is {most_common_id}.")

        print(f"The total sales revenue is", total_sales_revenue)

        print(f"The product with the highest revenue", highest_revenue,'\n')
    

#Implement a feature to update product details, including price and stock quantity.
def update_product_details():
    view_catalog()
    print("\nUpdate product details: ")
    print("1. Add a new product")
    print("2. Update Name of an existing product")
    print("3. Update Price_per_unit")
    print("4. Update Current stock quantity of an existing product")
    print("5. Delete a product")
    print("6. Exit")
    z = input('Please enter your choice: ')
    print("\n")

#This is to add a new product to the product catalog.
    if z == '1':
        i= input('Please enter the new product id: ')
        if i.upper() not in product_catalog:
            name = input('Please enter the name of the product: ')
            price = float(input('Please enter the price per unit: '))
            if price <= 0:
                print('Enter a valid price')
            else:
                qty = float(input( ' Please enter the stock quantity: '))
                if qty < 0:
                    print('Enter a valid quantity')
                else:                  
                    product_catalog[i.upper()] = {'Name': name.upper(),
                                    'Price_per_unit': price,
                                    'Current_stock_quantity': qty}
        else:
            print('Product id already exists')
        update_product_details()
        
# This is to update the name of an existing product in the product catalog.
    elif z == '2':
        i= input('Please enter the product id: ')
        if i.upper() not in product_catalog:
            print(' Enter a valid product id ')
        else:
            new_name = input(' Please enter the new name: ' )
            product_catalog[i.upper()]['Name'] =new_name.upper()
        update_product_details()
        
# This is to update the price of an existing product in the product catalog.
    elif z == '3':
        i= input('Please enter the product id: ')
        if i.upper() not in product_catalog:
            print(' Enter a valid product id ')
        else:
            new_price = float(input(' Please enter the new price per unit: '))
            if new_price <= 0:
                print('Enter a valid price')
            else:
                product_catalog[i.upper()]['Price_per_unit']= new_price
        update_product_details()
        
# This is to update the quantity of an existing product in the product catalog.
    elif z== '4':
        i= input('Please enter the product id: ')
        if i.upper() not in product_catalog:
            print(' Enter a valid product id ')
        else:
            new_qty = int(input( ' Please enter the new stock quantity: '))
            if new_qty <= 0:
                print('Enter a valid quantity')
            else:
                product_catalog[i.upper()]['Current_stock_quantity']= new_qty
        update_product_details()

# This is to delete an existing product in the product catalog.
    elif z== '5':
        i= input('Please enter the product id: ')
        if i.upper() not in product_catalog:
            print(' Enter a valid product id ')
        else:
            del product_catalog[i.upper()]
        update_product_details()

# This is to go back to the previous menu.
    elif z == '6':
        view_catalog()
    else:
        print('\nInvalid Argument:Enter from the given choices\n')
        update_product_details()
    

# Main program 
while True:
    print("\nMain Menu:")
    print("1. View Catalog")
    print("2. Make a Sale")
    print("3. View Sales History")
    print("4. View Stats")
    print("5. Update product details")
    print("6. Exit")
    choice = input("Enter your choice: ")
    print("\n")

    if choice == '1':
        view_catalog()
    elif choice == '2':
        make_sale()
    elif choice == '3':
        view_sales_history()
    elif choice == '4':
        view_stats()

    elif choice == '5':
        update_product_details()
        
    elif choice == '6':
        print("Exiting the program. Goodbye!")
        break
    else:
        print("Invalid choice. Please try again.")

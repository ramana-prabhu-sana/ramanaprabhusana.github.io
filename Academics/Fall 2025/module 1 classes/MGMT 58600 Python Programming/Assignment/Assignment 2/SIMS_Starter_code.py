# -*- coding: utf-8 -*-
"""
Created on Sun Sep 10 06:37:57 2023

@author: csuser
"""

# Initialize the product catalog
product_catalog = {
    'P1': {'Name': 'Product 1', 'Price': 10.99, 'Stock': 100},
    'P2': {'Name': 'Product 2', 'Price': 5.99, 'Stock': 50},
    # Add more products here
}

# Initialize the sales history
sales_history = []

# Function to display the catalog
def view_catalog():
    print("\nProduct Catalog:")
    #Your code to print the entire catalog goes here

# Function to make a sale
def make_sale():
    #show product catalog to the user
    #get user input on which product to sell and how much quantity.
    #your code to make the sale 
    

# Function to view sales history
def view_sales_history():
    #your code to show sales history

# Main program loop
while True:
    print("\nMain Menu:")
    print("1. View Catalog")
    print("2. Make a Sale")
    print("3. View Sales History")
    print("4. Exit")
    choice = input("Enter your choice: ")

    if choice == '1':
        view_catalog()
    elif choice == '2':
        make_sale()
    elif choice == '3':
        view_sales_history()
    elif choice == '4':
        print("Exiting the program. Goodbye!")
        break
    else:
        print("Invalid choice. Please try again.")

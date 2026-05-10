#Ramana Prabhu Sana - rsana@purdue.edu
#Siddharth Shenoy - shenoy22@purdue.edu

import numpy as np

# Part 1: Data Manipulation and Analysis
print("Part 1: Data Manipulation and Analysis:\n")
# 1. Create a 1D array of 100 random integers between 1 and 500 using vectorized operations
arr = np.random.randint(1, 501, 100)
print("Random Matrix:\n",arr,"\n")
# Reshape the array into a 10x10 matrix
matrix = arr.reshape(10, 10)
print("Reshaped Matrix:\n",matrix,"\n")

# 2. Array slicing and indexing
third_col = matrix[:, 2]  # Extract all elements from the third column
submatrix = matrix[1:5, 3:8]  # Extract submatrix rows 2-5, columns 4-8 (0-indexed)

# 3. Filtering Data using boolean indexing
greater_200 = matrix[matrix > 200]  # Find all elements greater than 200
matrix[matrix < 100] = 0  # Replace all elements less than 100 with 0

# 4. Basic Statistical Analysis using ufuncs
mean_val = np.mean(matrix)      #Mean of the entire matrix
median_val = np.median(matrix)  #Median of the entire matrix
std_val = np.std(matrix)        #Standard deviation of the entire matrix
var_val = np.var(matrix)        #Variance of the entire matrix
mean_row = np.mean(matrix, axis=1)      #Mean of each row
mean_col = np.mean(matrix, axis=0)      #Mean of each column

# 5. Sorting
sorted_rows = np.sort(matrix, axis=1)  # Sort each row
sorted_by_col2 = matrix[matrix[:, 1].argsort()]  # Sort matrix by second column

# Part 2: 6.Power Consumption Analysis

# 1. Define daily power consumption data for 4 households (7 days each)
daily_power_usage = np.array([
    [15, 18, 20, 22, 25, 30, 28],
    [35, 38, 40, 45, 50, 48, 42],
    [8, 10, 12, 15, 10, 8, 9],
    [50, 55, 60, 65, 70, 75, 80]
])

# 2. Calculate monthly total power consumption (4 weeks per month)
monthly_total = daily_power_usage.sum(axis=1) * 4  # sum rows then multiply weeks

#Computing power wastage by comparing usage to an efficiency threshold
efficiency_threshold = 200
wastage = monthly_total - efficiency_threshold

# 3. Calculate power bills based on slabs using vectorized np.where
bills = np.where(
    monthly_total < 500,
    monthly_total * 0.12,
    np.where(
        monthly_total <= 1000,
        monthly_total * 0.15,
        monthly_total * 0.20
    )
)
#To ensure we get output with decimals
np.set_printoptions(formatter={'float_kind': '{:.1f}'.format})

# Part 2: 7.Sales Data Analysis

# 1. Sales data for products over multiple months
salesdata = np.array([
    [200, 250, 300, 150],
    [180, 220, 280, 140],
    [220, 270, 310, 170],
    [210, 260, 330, 160],
    [230, 280, 320, 180],
    [190, 240, 300, 150],
    [210, 260, 310, 160],
    [250, 290, 340, 190],
    [220, 270, 310, 170],
    [230, 280, 320, 180],
    [240, 290, 330, 190],
    [260, 300, 340, 200]
])

# 2. Analyze sales with vectorized operations

#Calculate total sales for each product over the year.
total_sales = np.sum(salesdata, axis=0)

#The month with the highest sales for each product.
best_months_number = np.argmax(salesdata, axis=0)
months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']

# Find all months, where each product had their max sales
best_months_all = []
for col in range(salesdata.shape[1]):
    col_sales = salesdata[:, col]
    max_val = col_sales.max()
    best_months = [months[i] for i, val in enumerate(col_sales) if val == max_val]
    best_months_all.append(best_months)

#Calculate average sales per month across all products
avg_sales_month = np.mean(salesdata, axis=1)

#The product with the highest average monthly sales
best_product = np.argmax(avg_sales_month) + 1

# Part 3: Linear Regression Using NumPy

# 1. Independent and dependent variables
x = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
y = np.array([25, 45, 65, 80, 100, 130, 150, 180, 210, 240])
n = len(x)

# 2. Calculate slope (m) and intercept (c) using vectorized operations
m = (n * np.sum(x * y) - np.sum(x) * np.sum(y)) / (n * np.sum(x**2) - (np.sum(x))**2)
c = (np.sum(y) - m * np.sum(x)) / n

# 3. Predicted y for a new x(120) input
y_pred = m * 120 + c

# 4. Mean squared error calculation
mse = np.mean((y - (m * x + c))**2)

# Output Results
print("Third Column:\n", third_col,"\n")
print("Submatrix:\n", submatrix,"\n")
print("Values Greater than 200:\n", greater_200,"\n")
print("Matrix after replacing < 100 with 0:\n", matrix,"\n")
print(f"Statistics: Mean={mean_val:.2f}, Median={median_val:.2f}, StdDev={std_val:.2f}, Variance={var_val:.2f}\n")
print("Mean by Row:\n", mean_row,"\n")
print("Mean by Column:\n", mean_col,"\n")
print("Rows Sorted:\n", sorted_rows,"\n")
print("Matrix Sorted by 2nd Column:\n", sorted_by_col2,"\n")
print("Part 2: Business Analytics Use Cases:\n")
print("6.Power Consumption Analysis for Smart Grid Optimization:\n")
print("Monthly Power Consumption based on daily usage for each household:", monthly_total,"\n")
print("Power Wastage:", wastage,"\n")
print("Power Bills:", bills,"\n")
print("7.Sales Data Analysis:\n")
print("Total Sales for Product 1, Product 2, Product 3 and Product 4 respectively::", total_sales,"\n")
print("Best Sales Months for Product 1, Product 2, Product 3 and Product 4 respectively:", best_months_all,"\n")
print("Average sales per month across all products:", avg_sales_month,"\n")
print("Best Product Overall: Product Number ", best_product,"\n")
print("Part 3: Linear Regression Using Numpy:\n")
print(f"Linear Regression: Slope={m:.3f}, Intercept={c:.3f}\n")
print("Predicted Sales for Budget = 120:", y_pred,"\n")
print(f"Mean Squared Error: {mse:.3f}\n")
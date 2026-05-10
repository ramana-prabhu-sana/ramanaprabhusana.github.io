print("Welcome to calculator (or 'q' to exit)")


def calculator():
    while True:
        print("Please select category:\n"
              "1. Basic Calculator Operations\n"
              "2. Engineering Calculations\n"
              "3. Business Calculations\n"
              "Enter 'q' to exit")

        input_operator = input()  # keep as string for easy comparison
        if input_operator.isdigit():
            if input_operator == "1":
                operator_1()

            elif input_operator == "2":
                operator_2()

            elif input_operator == "3":
                operator_3()

            else:
                print("Invalid category selection. Please select 1, 2, or 3.\n\n")

        elif input_operator == "q":
            operator_4()
            break  # just in case operator_4 does not exit

        else:
            print("Please input a valid number, not negatives, letters or symbols\n\n")


# Function for basic mathematical calculations
def operator_1():
    while True:  # Added for looping in this menu
        print("Please input the mathematical operator:\n"
              "1.Addition (+)\n"
              "2.Subtraction (-)\n"
              "3.Multiplication (*)\n"
              "4.Division (/)\n"
              "5.Modulus (mod) – Remainder of division\n"
              "6.Exponentiation (^) – Raise a number to a power")
        input_mathematical_operation = input()
        if int(input_mathematical_operation) < 7:
            print("Please input the 1st number:")
            input_n1 = input()
            print("Please input the 2nd number:")
            input_n2 = input()

            try:
                num1 = float(input_n1)
                num2 = float(input_n2)
                #if num1 < 0 or num2 < 0:
                #    print("Please input positive numerical values.")
                #    continue  # Added to retry same menu

                if input_mathematical_operation == "1":
                    final = num1 + num2
                    print("The answer is: " + str(num1) + " + " + str(num2) + " = " + str(final))

                elif input_mathematical_operation == "2":
                    final = num1 - num2
                    print("The answer is: " + str(num1) + " - " + str(num2) + " = " + str(final))

                elif input_mathematical_operation == "3":
                    final = num1 * num2
                    print("The answer is: " + str(num1) + " * " + str(num2) + " = " + str(final))

                elif input_mathematical_operation == "4":
                    if num2 == 0:
                        print("Division by zero is not allowed.")
                        continue  # Added to retry same menu
                    else:
                        final = num1 / num2
                        print("The answer is: " + str(num1) + " / " + str(num2) + " = " + str(final))

                elif input_mathematical_operation == "5":
                    if num2 == 0:
                        print("Modulus by zero is not allowed.")
                        continue  # Added to retry same menu
                    else:
                        final = num1 % num2
                        print("The remainder of division is: " + str(num1) + " % " + str(num2) + " = " + str(int(final)))

                elif input_mathematical_operation == "6":
                    final = num1 ** num2
                    print("The answer is: " + str(num1) + "^" + str(num2) + " = " + str(final))
                else:
                    print("Invalid mathematical operation selection.")
                    continue  # Added to retry same menu

            except ValueError:
                print("Please input numerical values.")
                continue  # Added to retry same menu

        else:
            print("Please input a valid operator.\n\n")
            continue  # Added to retry same menu
        break  # Exit loop after successful operation


# function to choose either geometric calculations or metric conversion
def operator_2():
    while True:  # Added for looping
        print("Please confirm the category:\n"
              "1. Geometric calculations\n"
              "2. Metric conversions")

        input_category_2 = input()

        if input_category_2 == "1":
            operator_2_1()

        elif input_category_2 == "2":
            operator_2_2()

        else:
            print("Please input a valid operator.\n\n")
            continue  # Added to retry same menu
        break  # Exit loop after a valid selection


# function for area and volume of shapes:
def operator_2_1():
    while True:  # Added for looping
        print("Please confirm the parameter to calculate\n"
              "1. Area of Triangle\n"
              "2. Area of Rectangle\n"
              "3. Area of Circle\n"
              "4. Area or Volume of Cube\n"
              "5. Area or Volume of Cylinder\n"
              "6. Area or Volume of Cone")

        input_parameter_geometry = input()  # to choose what to calculate

        if input_parameter_geometry == "1":
            print("Thank you for choosing triangle. Please input the base.")
            input_base = input()
            print("Please input the height of the triangle:")
            input_height = input()
            try:
                base = float(input_base)
                height = float(input_height)
                if base > 0 and height > 0:
                    area = (1 / 2) * base * height
                    print("The area of the triangle is: " + str(area))
                else:
                    print("Please input valid positive values")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry

        elif input_parameter_geometry == "2":
            print("Thank you for choosing rectangle. Please input the length.")
            input_length = input()
            print("Please input the breadth of the triangle:")
            input_breadth = input()
            try:
                length = float(input_length)
                breadth = float(input_breadth)
                if length > 0 and breadth > 0:
                    area = length * breadth
                    print("The area of the rectangle is: " + str(area))
                else:
                    print("Please input valid positive values")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry

        elif input_parameter_geometry == "3":
            print("Thank you for choosing circle. Please input the radius.")
            input_radius = input()
            try:
                radius = float(input_radius)
                if radius > 0:
                    area = (22 / 7) * (radius ** 2)
                    print("The area of the circle is: " + str(area))
                else:
                    print("Please input a valid positive value")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry

        elif input_parameter_geometry == "4":

            print("Thank you for choosing cube. Please confirm if you want or surface area of the cube\n"
                  "Press 1 for surface area\n"
                  "Press 2 for volume")
            cube_specific = input()

            print("Please input the length.")
            input_length = input()

            try:
                length = float(input_length)
                if length > 0:
                    if cube_specific == "1":
                        area = 6 * (length ** 2)
                        print("The surface area of the cube is: " + str(area))

                    elif cube_specific == "2":
                        volume = length ** 3
                        print("The volume of the cube is: " + str(volume))
                    else:
                        print("Invalid selection for cube operation.")
                        continue  # Added for retry
                else:
                    print("Please input valid positive values")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry

        elif input_parameter_geometry == "5":
            print("Thank you for choosing cylinder. Please confirm if you want or area of the cylinder\n"
                  "Press 1 for surface area\n"
                  "Press 2 for volume")
            cylinder_specific = input()
            print("Please confirm on the radius.")
            input_radius = input()
            print("Please confirm on the height")
            input_height = input()

            try:
                radius = float(input_radius)
                height = float(input_height)
                if radius > 0 and height > 0:
                    if cylinder_specific == "1":
                        area = 2 * (22 / 7) * radius * (radius + height)
                        print("The surface area of the cylinder is: " + str(area))

                    elif cylinder_specific == "2":
                        volume = (22 / 7) * ((radius ** 2) * height)
                        print("The volume of the cylinder is: " + str(volume))
                    else:
                        print("Invalid selection for cylinder operation.")
                        continue  # Added for retry
                else:
                    print("Please input valid positive values")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry

        elif input_parameter_geometry == "6":

            print("Thank you for choosing cone. Please confirm if you want surface area or volume of the cone.\n"
                  "Press 1 for surface area\n"
                  "Press 2 for volume")
            cone_specific = input()

            print("Please confirm on the radius.")
            input_radius = input()
            print("Please confirm on the height")
            input_height = input()

            try:
                radius = float(input_radius)
                height = float(input_height)
                if radius > 0 and height > 0:
                    if cone_specific == "1":
                        area = (22 / 7) * radius * (radius + ((radius ** 2 + height ** 2) ** 0.5))
                        print("The surface area of the cone is: " + str(area))
                    elif cone_specific == "2":
                        volume = (22 / 7) * ((radius ** 2) * height) * (1 / 3)
                        print("The volume of the cone is: " + str(volume))
                    else:
                        print("Invalid selection for cone operation.")
                        continue  # Added for retry
                else:
                    print("Please input valid positive values")
                    continue  # Added for retry
            except ValueError:
                print("Please input valid numerical values")
                continue  # Added for retry
        else:
            print("Please input a valid operator.\n\n")
            continue  # Added for retry
        break  # Exit after successful operation


# function for metric conversion
def operator_2_2():
    while True:  # Added for looping
        print("1. meters to feet\n"
              "2. kilograms to pounds\n"
              "3. feet to meters\n"
              "4. pounds to kilograms")
        input_parameters_metric = input()
        if input_parameters_metric in ["1", "2", "3", "4"]:
            print("Please input the value to convert")
            input_value = input()
            try:
                value = float(input_value)
                if value > 0:
                    if input_parameters_metric == "1":
                        converted_value = value * 3.28084
                        print("The converted value is: " + str(converted_value) + " feet")

                    elif input_parameters_metric == "2":
                        converted_value = value * 2.20462
                        print("The converted value is: " + str(converted_value) + " pounds")

                    elif input_parameters_metric == "3":
                        converted_value = value / 3.28084
                        print("The converted value is: " + str(converted_value) + " meters")

                    elif input_parameters_metric == "4":
                        converted_value = value / 2.20462
                        print("The converted value is: " + str(converted_value) + " kilograms")
                    break  # exit after successful conversion
                else:
                    print("Please input a positive value to convert")
                    continue  # retry in same menu
            except ValueError:
                print("Please input a valid numerical value")
                continue  # retry in same menu
        else:
            print("Invalid selection for metric conversion")
            continue  # retry


# function to calculate compound interest
def operator_3():
    while True:  # Added for looping
        print("Please confirm the parameter:\n"
              "1. Compound interest calculation\n"
              "2. break-even point for a business")
        input_parameter_business = input()
        if input_parameter_business == "1":
            print("Thank you for choosing compound interest. Please input the principal.")
            input_principal = input()
            print("Please input annual interest rate in percentage.")
            input_annual_rate = input()
            print("Please input the number of periods")
            input_period = input()

            try:
                principal = float(input_principal)
                annual_rate = float(input_annual_rate)
                period = float(input_period)
                if principal >= 0 and annual_rate >= 0 and period >= 0:
                    compound_interest = (principal * ((1 + (annual_rate / 100)) ** period)) - principal
                    print("The compound interest is: " + str(compound_interest))
                else:
                    print("Please input non-negative values for principal, rate, and period")
                    continue  # retry in same menu
            except ValueError:
                print("Please input valid numerical values")
                continue  # retry in same menu
            break  # exit loop after success

        elif input_parameter_business == "2":
            print("Thank you for choosing break-even point for a business. Please input the fixed costs.")
            input_fixed_costs = input()
            print("Please input variable costs.")
            input_variable_costs = input()
            print("Please input the selling price")
            input_selling_price = input()
            try:
                fixed_costs = float(input_fixed_costs)
                variable_costs = float(input_variable_costs)
                selling_price = float(input_selling_price)
                if fixed_costs >= 0 and variable_costs >= 0 and selling_price > variable_costs:
                    break_even_point = fixed_costs / (selling_price - variable_costs)
                    print("The break-even point is: " + str(break_even_point))
                else:
                    print("Please ensure fixed costs and variable costs are non-negative and selling price is greater than variable costs")
                    continue  # retry in same menu
            except ValueError:
                print("Please input valid numerical values")
                continue  # retry in same menu
            break  # exit loop after success

        else:
            print("Please input valid number")
            continue  # retry


# Exiting the calculator
def operator_4():
    print("Exiting the calculator")
    exit()


calculator()

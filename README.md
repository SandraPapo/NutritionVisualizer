# Nutrition Data Visualizer

This React application is designed to visualize nutritional data exported from MyFitnessPal. Users can upload a CSV file to see a graphical representation of their daily calorie and protein intake. Additionally, by clicking on a point on the chart, users can view a list of meals consumed on that specific day, complete with protein and calorie counts.

## Features

- Upload and process CSV files exported from MyFitnessPal.
- Chart daily calorie and protein intake using a line chart.
- Interact with chart points to see detailed meal information.

## Live Demo

You can try out a live version of the app at [nutritionvisualizer.netlify.app/](https://nutritionvisualizer.netlify.app/).

## Technologies Used

- React
- Chart.js
- PapaParse
- chartjs-plugin-datalabels

## Project Setup

Clone the repository and install the dependencies to get started:

```
git clone https://github.com/SandraPapo/NutritionVisualizer.git
cd nutrition-data-visualizer
npm install
```

Run the project locally with:
```npm start```


## Usage

1. Click "Choose File" and select a CSV file in the format provided by MyFitnessPal.
2. The application will render a line chart displaying total daily calories and protein intake.
3. Click a point on the chart to display a detailed list of meals for that day below the chart.

## Expected CSV File Format

The CSV file should have at least the following columns:

- Date (YYYY-MM-DD format)
- Meal (name of the meal)
- Calories (numeric value)
- Protein (g) (numeric value)

Here is an example of the CSV format expected by the application:

```
Date,Meal,Calories,Protein (g)
2024-03-16,Breakfast,359,24.4
2024-03-16,Lunch,500,30
2024-03-16,Dinner,700,50
..
```

## Contributing

Feel free to fork the repository, make changes, and submit pull requests with your updates.

## License

This project is open-sourced under the [MIT License](LICENSE).
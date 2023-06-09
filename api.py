from flask import Flask, render_template, request
import matplotlib
from sklearn.model_selection import train_test_split
from werkzeug.utils import secure_filename
import os
import pandas as pd
import seaborn as sns
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from datetime import datetime

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = ''
@app.route('/')
def home():
    print("hello")
    return 'Hello, World!'

@app.route('/upload', methods=['POST','GET'])
def upload():

    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    name = request.form.get('name')
    sd = int(request.form.get('sd'))
    sm = int(request.form.get('sm'))
    sy = int(request.form.get('sy'))
    ed = int( request.form.get('ed'))
    em = int(request.form.get('em'))
    ey = int(request.form.get('ey')  )  

    print(sd,sm,sy)
    print(ed,em,ey)
    print(name)
    
    

    data = pd.read_csv(filename)
    
    
    data['Date'] = data['Date'].apply(lambda x: datetime.strptime(x, '%b-%y'))
    
    data['day'] = data['Date'].dt.day
    data['month'] = data['Date'].dt.month
    data['year'] = data['Date'].dt.year
    Pred =data
    data=data.drop(columns=['Time','Month','Year','Date'])
    
    x = np.array(data.drop(columns=['Sales']))
    y = np.array(data["Sales"])
    xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.8, random_state=42)
    model = LinearRegression()
    model.fit(xtrain, ytrain)
    ypred = model.predict(x)

        
    data["Predicted Sales"] = ypred
    Pred["Predicted Sales"] = ypred
    Pred.to_csv('Prediction.csv', index=False)

    

    start_date = datetime(sy, sm, sd)
    end_date = datetime(ey, em, ed)

    # Generate dates between start and end dates
    dates = pd.date_range(start=start_date, end=end_date, freq='D')

        # Create DataFrame with day of week, month, and year columns
    od= pd.DataFrame({'day': dates.day,
                        'month': dates.month,
                        'year': dates.year})

    # Generate random values for each row
    # Preview DataFrame
    od
    
    features = np.array(od)
    # Create empty array to store predicted sales
    predictions = []

    # Iterate over each row in features array
    for feature in range(len(features)):
        # Predict sales for current row using model
        prediction = model.predict(features[feature].reshape(1, -1))[0]
        # Append prediction to array of predictions
        predictions.append(prediction)

    # Convert predictions array to numpy array and round to nearest integer
    

    # Print predictions

    od['pred']=pd.DataFrame(predictions)
    od['dates']=dates
    
    od.to_csv('my_data.csv', index=False)

    
    plt.plot(data['year'],data['Sales'])
    plt.plot(data['year'],data['Predicted Sales'])
    plt.ylabel('predictions')
    plt.xlabel('years')
    plt.title('Test N Train Data')
    plt.savefig('../FRS/app/src/assets/PredictionsLine.jpg')
    plt.close()
    
    plt.bar(data['year'],data['Sales'])
    plt.bar(data['year'],data['Predicted Sales'])
    plt.ylabel('predictions')
    plt.xlabel('years')
    plt.title('Test N Train Data')
    plt.savefig('../FRS/app/src/assets/PredictionsBar.jpg')
    plt.close()

    plt.scatter(data['year'],data['Sales'])
    plt.scatter(data['year'],data['Predicted Sales'])
    plt.ylabel('predictions')
    plt.xlabel('years')
    plt.title('Test N Train Data')
    plt.savefig('../FRS/app/src/assets/PredictionsScatter.jpg')
    plt.close()
    
    plt.plot(od[name],od['pred'])
    plt.ylabel('predictions')
    plt.xlabel(name)
    plt.title('Forecast')
    plt.savefig('../FRS/app/src/assets/ForecastLine.jpg')
    plt.close()

    plt.bar(od[name],od['pred'])
    plt.ylabel('predictions')
    plt.xlabel(name)
    plt.title('Forecast')
    plt.savefig("../FRS/app/src/assets/ForecastBar.jpg")
    plt.close()
    
    plt.scatter(od[name],od['pred'])
    plt.ylabel('predictions')
    plt.xlabel(name)
    plt.title('Forecast over time')
    plt.savefig("../FRS/app/src/assets/ForecastScatter.jpg")
    plt.close()
    
    plt.hist(od[name], bins=10, edgecolor='black')

    # Add labels and title
    plt.xlabel('Predictions')
    plt.ylabel('Frequency')
    plt.title('Distribution of Sales')
    plt.savefig("../FRS/app/src/assets/ForecastHist.jpg")
    # Display the histogram
    plt.close()

    plt.fill_between(od[name], od['pred'], alpha=0.5)

    # Add labels and title
    plt.xlabel(name)
    plt.ylabel('Sales')
    plt.title('Predictions over Time')
    plt.savefig("../FRS/app/src/assets/ForecastArea.jpg")
    #   Display the area plot
    plt.show()
    plt.close()
    
    
    return "success"


if __name__ == '__main__':
    app.run()

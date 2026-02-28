from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Safely Load or Train the AI Model
print("Loading Model...")
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"⚠️ Error loading model.pkl: {e}")
    print("Retraining model dynamically on the server...")
    try:
        from sklearn.svm import SVC
        from sklearn.preprocessing import StandardScaler
        from sklearn.pipeline import make_pipeline
        df = pd.read_csv('insurance_fraud_data_preprocessed.csv')
        X = df[['annual_income', 'age_of_driver', 'policy deductible']]
        y = df['fraud reported']
        model = make_pipeline(StandardScaler(), SVC(probability=True, random_state=42))
        model.fit(X, y)
        with open('model.pkl', 'wb') as f:
            pickle.dump(model, f)
        print("✅ Model retrained and saved successfully!")
    except Exception as e2:
        print(f"❌ Error retraining model: {e2}")
        model = None

@app.route('/', methods=['GET', 'POST'])
def index():
    return jsonify({
        "status": "online",
        "message": "Fraud Detection ML API is running.",
        "model_loaded": model is not None
    })
@app.route('/api/predict', methods=['POST'])
def api_predict():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500
        
    try:
        data = request.json
        income = float(data.get('annual_income', 0))
        age = float(data.get('age_of_driver', 0))
        deductible = float(data.get('policy_deductible', 0))
        
        input_data = pd.DataFrame([[income, age, deductible]], 
                                  columns=['annual_income', 'age_of_driver', 'policy deductible'])
        
        pred = model.predict(input_data)[0]
        prob = model.predict_proba(input_data)[0]
        fraud_prob = round(prob[1] * 100, 2)
        safe_prob = round(prob[0] * 100, 2)
        
        result = 'fraud' if pred == 1 else 'safe'
        confidence = fraud_prob if pred == 1 else safe_prob
        
        return jsonify({
            "result": result,
            "confidence": confidence,
            "fraud_prob": fraud_prob,
            "safe_prob": safe_prob
        })
    except Exception as e:
        print(f"❌ Processing Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
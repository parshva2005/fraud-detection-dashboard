from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Safely Load the AI Model
print("Loading Model...")
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model.pkl: {e}")
    model = None

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = None
    probability = None
    prob_safe = None
    risk_tier = None
    red_flags = []
    
    if request.method == 'POST':
        try:
            # Safely get form data (defaults to 0 if missing)
            income = float(request.form.get('annual_income', 0))
            age = float(request.form.get('age_of_driver', 0))
            deductible = float(request.form.get('policy_deductible', 0))
            
            input_data = pd.DataFrame([[income, age, deductible]], 
                                      columns=['annual_income', 'age_of_driver', 'policy deductible'])
            
            if model:
                pred = model.predict(input_data)[0]
                prob = model.predict_proba(input_data)[0]
                fraud_prob = round(prob[1] * 100, 2)
                safe_prob = round(prob[0] * 100, 2)
                
                # Determine Risk Tier
                if fraud_prob >= 80:
                    risk_tier = "CRITICAL RISK"
                elif fraud_prob >= 50:
                    risk_tier = "HIGH RISK"
                elif fraud_prob >= 20:
                    risk_tier = "MODERATE RISK"
                else:
                    risk_tier = "LOW RISK"

                # Generate Red Flags
                if age < 25 and deductible >= 1000:
                    red_flags.append("Young driver with abnormally high policy deductible.")
                if income < 35000 and deductible >= 1000:
                    red_flags.append("Deductible is unusually high relative to reported annual income.")
                
                # Final Output
                if pred == 1:
                    prediction = "Fraudulent Claim"
                    probability = fraud_prob
                    prob_safe = safe_prob
                else:
                    prediction = "Safe Claim"
                    probability = safe_prob
                    prob_safe = fraud_prob
            else:
                prediction = "Error: model.pkl not found. Please train model first."

        except Exception as e:
            print(f"❌ Processing Error: {e}")
            prediction = "Error processing request. Please check your inputs."

    return render_template('index.html', 
                           prediction=prediction, 
                           probability=probability,
                           prob_safe=prob_safe,
                           risk_tier=risk_tier,
                           red_flags=red_flags)
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
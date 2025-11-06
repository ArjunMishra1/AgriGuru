# AgriGuru – Crop Recommendation System

AgriGuru is an intelligent crop recommendation system that assists farmers in making informed crop selection decisions.  
The system uses a **Machine Learning model (Random Forest)** trained on soil and environmental parameters to recommend the most suitable crop to grow.

---

## **Features**

- Predicts best crop based on:
  - **N** (Nitrogen)
  - **P** (Phosphorus)
  - **K** (Potassium)
  - **Temperature**
  - **Humidity**
  - **Soil pH**
  - **Rainfall**
- User-friendly **React frontend** for interaction.
- Secure and modular **Flask/Python backend**.
- Well-trained Random Forest model with high accuracy.
- Integrated chatbot which gives specialized agriculture related outputs.
- SMS integrated for live updates to the farmer.
- Scalable for future enhancements (fertilizer recommendations, pest alerts, etc.)

---

## **Machine Learning Model**

- **Algorithm Used:** Random Forest Classifier  
- Multiple ML models were tested, but Random Forest gave the most stable accuracy.
- Data preprocessing involved scaling and normalization.
- Trained model files stored in:  
  /models/model.pkl
  /models/minmaxscaler.pkl
  /models/standscaler.pkl


Input data is collected using a **sensor kit** deployed in the field to capture **real-time soil and environmental parameters**.

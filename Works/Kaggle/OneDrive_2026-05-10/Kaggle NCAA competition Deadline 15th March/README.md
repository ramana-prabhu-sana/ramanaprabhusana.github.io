# Notebooks

- **notebook_v1.ipynb** — Version 1: model-only (Ridge/RF) predictions. Output: `Output/submission_v1.csv`.

**Workflow:** Run **notebook_v1**, then submit `Output/submission_v1.csv` to Kaggle (rename to `submission.csv` when uploading if the competition requires it).  
**Best possible score is 0.** A v2 notebook can be added later to try to improve the score toward 0.

---

## Google Drive: folder layout

Upload the **whole project folder** to Google Drive so that one folder contains:

```
YourFolderName/          ← Set DRIVE_PROJECT_FOLDER to this name in the notebook
  notebooks/
    notebook_v1.ipynb
  final-four-analytics-challenge-26/
    NCAA_Seed_Training_Set2.0.csv
    NCAA_Seed_Test_Set2.0.csv
    submission_template2.0.csv
  Output/                  (created automatically when you run the notebook)
```

In Colab, in the first code cell set `DRIVE_PROJECT_FOLDER = "YourFolderName"` to match the folder name as it appears under My Drive.

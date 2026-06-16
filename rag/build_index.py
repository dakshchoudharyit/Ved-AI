from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

# Read knowledge base
with open(
    "data/med_notes.txt",
    "r",
    encoding="utf-8"
) as f:
    text = f.read()

# Split into chunks
chunks = text.split("\n\n")

print(f"Chunks: {len(chunks)}")

# Embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

embeddings = model.encode(chunks)

# Create FAISS index
dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(
    dimension
)

index.add(
    np.array(embeddings)
)

# Save index
faiss.write_index(
    index,
    "rag/medical_index.faiss"
)

# Save chunks
with open(
    "rag/chunks.pkl",
    "wb"
) as f:
    pickle.dump(
        chunks,
        f
    )

print("Index created!")
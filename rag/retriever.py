from sentence_transformers import SentenceTransformer
import faiss
import pickle
import numpy as np

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

index = faiss.read_index(
    "rag/medical_index.faiss"
)

with open(
    "rag/chunks.pkl",
    "rb"
) as f:
    chunks = pickle.load(f)


def retrieve(query, k=2):

    query_embedding = model.encode(
        [query]
    )

    distances, indices = index.search(
        np.array(query_embedding),
        k
    )

    results = []

    for idx in indices[0]:
        results.append(
            chunks[idx]
        )

    return "\n\n".join(results)
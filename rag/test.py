from retriever import retrieve

query = "I feel thirsty all the time"

context = retrieve(query)

print(context)
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)


def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Content-Disposition"] = "inline"
    return response


def analyse_books(books):
    sorted_books = sorted(
        books,
        key=lambda book: int(book.get("isbn") or 0),
        reverse=True,
    )

    top_books = sorted_books[:5]
    featured_book = top_books[0] if top_books else None

    return {
        "count": len(books),
        "summary": f"Total number of books: {len(books)}",
        "salesInsight": {
            "totalBooks": len(books),
            "featuredBook": featured_book,
            "topBooks": top_books,
            "recommendation": (
                "The library has enough records to generate a useful book sales summary."
                if len(books) >= 3
                else "More Firestore book records should be added to improve the sales summary."
            ),
        },
    }


@app.route("/", defaults={"path": ""}, methods=["GET", "POST", "OPTIONS"])
@app.route("/<path:path>", methods=["GET", "POST", "OPTIONS"])
def book_function(path):
    if request.method == "OPTIONS":
        response = make_response("", 204)
        return add_cors_headers(response)

    default_books = [
        {"name": "Default Book A", "isbn": 1001},
        {"name": "Default Book B", "isbn": 2002},
        {"name": "Default Book C", "isbn": 3003},
    ]

    books = default_books

    if request.method == "POST":
        payload = request.get_json(silent=True) or {}

        if isinstance(payload.get("books"), list):
            books = payload["books"]

        response = jsonify(analyse_books(books))
        return add_cors_headers(response)

    result = analyse_books(books)

    html = f"""
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>FIT5032 Lab9 Cloud Function</title>
        <style>
          body {{
            font-family: Arial, sans-serif;
            margin: 40px;
            background: #f4f7fb;
            color: #1f2937;
          }}
          .card {{
            max-width: 760px;
            background: white;
            padding: 28px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
          }}
          h1 {{
            color: #0d6efd;
          }}
          pre {{
            background: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
          }}
        </style>
      </head>
      <body>
        <div class="card">
          <p><strong>FIT5032 Lab 9</strong></p>
          <h1>Cloud Function Running Successfully</h1>
          <p>{result["summary"]}</p>
          <p>This Alibaba Cloud Function is ready to process book data from the Vue application.</p>
          <pre>{result}</pre>
        </div>
      </body>
    </html>
    """

    response = make_response(html, 200)
    response.headers["Content-Type"] = "text/html; charset=utf-8"
    return add_cors_headers(response)



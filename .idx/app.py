from flask import Flask, render_template, request, redirect, session
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "your_secret_key")

@app.route("/")
def home():
    return render_template("index.html")

    @app.route("/chatbot")
    def chatbot():
        return render_template("chatbot.html")

        @app.route("/explore")
        def explore():
            return render_template("explore.html")

            @app.route("/profile")
            def profile():
                return render_template("profile.html")

                @app.route("/terms")
                def terms():
                    return render_template("terms.html")

                    @app.route("/about")
                    def about():
                        return render_template("about.html")

                        @app.route("/login", methods=["GET", "POST"])
                        def login():
                            if request.method == "POST":
                                    email = request.form["email"]
                                            session["email"] = email
                                                    return redirect("/profile")
                                                        return render_template("login.html")

                                                        @app.route("/signup", methods=["GET", "POST"])
                                                        def signup():
                                                            if request.method == "POST":
                                                                    # Save signup details (can be added later with Firebase Auth)
                                                                            return redirect("/login")
                                                                                return render_template("signup.html")

                                                                                @app.route("/logout")
                                                                                def logout():
                                                                                    session.pop("email", None)
                                                                                        return redirect("/")

                                                                                        @app.route("/uc")
                                                                                        def uc_form():
                                                                                            return render_template("ucform.html")

                                                                                            @app.errorhandler(404)
                                                                                            def page_not_found(e):
                                                                                                return render_template("404.html"), 404

                                                                                                if __name__ == "__main__":
                                                                                                    app.run(debug=True)
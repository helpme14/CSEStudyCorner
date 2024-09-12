import LightCornerImage from "../../assets/Light-corner.png";

const EmailTemplate = () => {
  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        color: "#333333",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
        border: "1px solid #ddd", // Optional: Adds a border to see the container edge
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <a href="#">
          <img
            src={LightCornerImage}
            alt="Study Corner Logo"
            style={{ width: "auto", height: "40px" }}
          />
        </a>
      </header>
      <main>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#333333", margin: "0" }}>
          Hi Olivia,
        </h2>

        <p style={{ marginTop: "10px", fontSize: "16px", color: "#666666" }}>
          This is your verification code:
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            flexWrap: "wrap", // Allows for responsive layout of OTP digits
          }}
        >
          {[6, 2, 8, 9, 9, 9].map((digit, index) => (
            <p
              key={index}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#007bff",
                border: "2px solid #007bff",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 5px",
              }}
            >
              {digit}
            </p>
          ))}
        </div>

        <p style={{ marginTop: "20px", fontSize: "16px", color: "#666666" }}>
          This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:
        </p>

        <button
          style={{
            display: "block",
            width: "100%",
            maxWidth: "200px",
            padding: "10px 20px",
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Verify email
        </button>

        <p style={{ marginTop: "20px", fontSize: "16px", color: "#666666" }}>
          Thanks, <br />
          Study Corner Team
        </p>
      </main>

      <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "14px",
          color: "#666666",
        }}
      >
        <p>
          This email was sent to{" "}
          <a
            href="#"
            style={{ color: "#007bff", textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            contact@studycorner.com
          </a>
          . If you'd rather not receive this kind of email, you can{" "}
          <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
            unsubscribe
          </a>{" "}
          or{" "}
          <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>
            manage your email preferences
          </a>
          .
        </p>

        <p style={{ marginTop: "10px" }}>
          © {new Date().getFullYear()} Study Corner. All Rights Reserved.
        </p>
      </footer>
    </section>
  );
};

export default EmailTemplate;

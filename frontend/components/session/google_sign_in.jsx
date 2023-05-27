import React, { useState, useEffect } from "react";

function GoogleSignIn() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "YOUR_GOOGLE_CLIENT_ID",
      callback: signInCallback,
      cancel_on_tap_outside: false,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

}

export default GoogleSignIn;